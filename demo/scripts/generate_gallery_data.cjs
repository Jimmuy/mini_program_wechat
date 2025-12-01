const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const OUTPUT_FILE = path.join(__dirname, '../gallery_data.ts');

// First-person stories for each location
const STORIES = {
    "内蒙古": "那是一次逃离城市的远行。在无尽的草原上，我第一次听懂了风的语言。当夕阳把羊群镀上金边，我意识到，原来生活可以如此辽阔而不羁。",
    "匈牙利": "布达佩斯的夜是金色的。站在多瑙河畔，看着国会大厦的倒影在波光中破碎又重组，仿佛能听到这座双子城千年的叹息。",
    "德国": "严谨与浪漫的矛盾体。在巴伐利亚的黑森林里迷路，在柏林的涂鸦墙前沉思。这里的每一块砖石都刻着历史，每一杯啤酒都盛满热情。",
    "意大利": "上帝把最明媚的阳光留给了亚平宁。在罗马的废墟中触摸永恒，在威尼斯的贡多拉上摇晃入梦。这里是文艺复兴的摇篮，也是我灵感的源泉。",
    "新疆": "大西洋最后一滴眼泪。雪山、沙漠、草原、湖泊，这里满足了我对极致风光的所有幻想。在独库公路上飞驰，感觉伸手就能摸到天。",
    "日常": "生活中的小确幸。摄影不一定非要远行，楼下的流浪猫、窗台的光影、路边的野花，都是平凡日子里闪光的瞬间。",
    "法国": "巴黎是流动的盛宴。在塞纳河畔喝一杯咖啡，看路人行色匆匆。这里的空气里都弥漫着艺术与自由的味道。",
    "泰国": "热带的慵懒与喧嚣。突突车的轰鸣、夜市的香气、寺庙的钟声，构成了我对这个微笑国度最鲜活的记忆。",
    "福建": "山海之间的古早味。在土楼的圆环里仰望天空，在鼓浪屿的巷弄里寻找猫咪。这里有最温柔的海风和最淳朴的民俗。",
    "西藏": "离天堂最近的地方。缺氧但不缺信仰。在布达拉宫的台阶上喘息，在纳木错的湖边落泪。这是一场关于灵魂的洗礼。",
    "香港": "赛博朋克的现实写照。霓虹灯牌与摩天大楼挤压出窒息的美感。在叮叮车的二层看这座水泥森林，既魔幻又真实。"
};

function getExif(filePath) {
    try {
        // Use mdls to get metadata
        const output = execSync(`mdls "${filePath}"`, { encoding: 'utf8' });

        const getValue = (key) => {
            const match = output.match(new RegExp(`${key}\\s*=\\s*(.*)`));
            if (!match) return null;
            let val = match[1].trim();
            // Remove quotes if present
            if (val.startsWith('"') && val.endsWith('"')) {
                val = val.slice(1, -1);
            }
            return val;
        };

        const make = getValue('kMDItemAcquisitionMake');
        const model = getValue('kMDItemAcquisitionModel');
        const aperture = getValue('kMDItemFNumber');
        const iso = getValue('kMDItemISOSpeed');
        const exposure = getValue('kMDItemExposureTimeSeconds');
        const focalLength = getValue('kMDItemFocalLength');

        // Format Shutter Speed (e.g., 0.02 -> 1/50)
        let shutter = exposure;
        if (exposure && parseFloat(exposure) < 1) {
            shutter = `1/${Math.round(1 / parseFloat(exposure))}`;
        }

        return {
            camera: model || make || 'Unknown Camera',
            lens: '', // Lens info is hard to get from mdls reliably without deeper parsing
            aperture: aperture ? `f/${parseFloat(aperture).toFixed(1)}` : '',
            iso: iso ? `ISO ${iso}` : '',
            shutter: shutter ? `${shutter}s` : '',
            focalLength: focalLength ? `${parseFloat(focalLength).toFixed(0)}mm` : ''
        };
    } catch (e) {
        return {};
    }
}

function generateData() {
    const galleries = [];
    let globalId = 1;

    if (!fs.existsSync(IMAGES_DIR)) {
        console.error("Images directory not found!");
        return;
    }

    const locations = fs.readdirSync(IMAGES_DIR).filter(f => fs.statSync(path.join(IMAGES_DIR, f)).isDirectory());

    for (const location of locations) {
        const locationDir = path.join(IMAGES_DIR, location);
        const files = fs.readdirSync(locationDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));

        if (files.length === 0) continue;

        // Random Fujifilm Data for fallback
        const FALLBACK_LENSES = ['XF 35mm f/1.4 R', 'XF 23mm f/2 R WR', 'XF 56mm f/1.2 R'];
        const FALLBACK_APERTURES = ['f/1.4', 'f/2.0', 'f/2.8', 'f/4.0', 'f/5.6'];
        const FALLBACK_ISOS = ['ISO 160', 'ISO 400', 'ISO 800', 'ISO 1600'];
        const FALLBACK_SHUTTERS = ['1/125s', '1/250s', '1/500s', '1/1000s', '1/60s'];

        const photos = files.reverse().map((file, index) => {
            const filePath = path.join(locationDir, file);
            let exif = getExif(filePath);

            const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

            // Force Camera to FUJIFILM as requested
            // If original metadata exists, we keep lens/settings but overwrite camera name
            // If no metadata, we fill with random valid Fuji settings
            if (!exif.camera || exif.camera === 'Unknown Camera' || exif.camera.toLowerCase().includes('xiaomi')) {
                exif = {
                    ...exif,
                    camera: 'FUJIFILM',
                    lens: exif.lens || random(FALLBACK_LENSES),
                    aperture: exif.aperture || random(FALLBACK_APERTURES),
                    iso: exif.iso || random(FALLBACK_ISOS),
                    shutter: exif.shutter || random(FALLBACK_SHUTTERS),
                    focalLength: exif.focalLength || '35mm'
                };
            } else {
                // Even if it has data, simplify camera name if it's Fuji
                if (exif.camera.toLowerCase().includes('fuji') || exif.camera.toLowerCase().includes('x-')) {
                    exif.camera = 'FUJIFILM';
                }
            }

            return {
                id: globalId++,
                url: `/images/${location}/${file}`,
                title: `NO.${index + 1}`, // Sequential title
                category: location,
                location: location,
                exif
            };
        });

        galleries.push({
            location,
            description: STORIES[location] || `我在${location}的旅途记录。`,
            photos
        });
    }

    // Custom Sorting Logic
    const ORDER_TOP = ['福建', '内蒙古', '香港'];
    const ORDER_DOMESTIC = ['成都', '新疆', '西藏']; // Add other Chinese cities here if any
    const ORDER_LAST = ['日常'];

    galleries.sort((a, b) => {
        const locA = a.location;
        const locB = b.location;

        // 1. Top 3 Priority
        const idxA_Top = ORDER_TOP.indexOf(locA);
        const idxB_Top = ORDER_TOP.indexOf(locB);
        if (idxA_Top !== -1 && idxB_Top !== -1) return idxA_Top - idxB_Top;
        if (idxA_Top !== -1) return -1;
        if (idxB_Top !== -1) return 1;

        // 2. Last Priority (Daily)
        const idxA_Last = ORDER_LAST.indexOf(locA);
        const idxB_Last = ORDER_LAST.indexOf(locB);
        if (idxA_Last !== -1 && idxB_Last !== -1) return idxA_Last - idxB_Last;
        if (idxA_Last !== -1) return 1; // Move to bottom
        if (idxB_Last !== -1) return -1;

        // 3. Domestic vs International
        // We define Domestic explicitly. Anything else not in Top/Last/Domestic is assumed International.
        const isDomesticA = ORDER_DOMESTIC.includes(locA);
        const isDomesticB = ORDER_DOMESTIC.includes(locB);

        if (isDomesticA && !isDomesticB) return -1; // Domestic comes before International
        if (!isDomesticA && isDomesticB) return 1;

        // 4. Alphabetical/Default sort within same group
        return locA.localeCompare(locB, 'zh-CN');
    });

    const content = `import { LocationGallery } from './types';

export const GALLERY_DATA: LocationGallery[] = ${JSON.stringify(galleries, null, 2)};
`;

    fs.writeFileSync(OUTPUT_FILE, content);
    console.log(`Generated gallery data with ${galleries.length} locations and ${globalId - 1} photos.`);
}

generateData();
