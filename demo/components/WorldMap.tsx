import React, { useState, useEffect } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { motion, animate } from 'framer-motion';
import { Globe, ZoomOut } from 'lucide-react';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
    // International
    { name: "瑞士", coordinates: [8.2275, 46.8182] },
    { name: "德国", coordinates: [10.4515, 51.1657] },
    { name: "意大利", coordinates: [12.5674, 41.8719] },
    { name: "匈牙利", coordinates: [19.5033, 47.1625] },
    { name: "法国", coordinates: [2.3522, 48.8566] },
    { name: "泰国", coordinates: [100.5018, 13.7563] },

    // China (Excluding Yunnan, Heilongjiang, Hainan, Taiwan)
    { name: "北京", coordinates: [116.4074, 39.9042] },
    { name: "上海", coordinates: [121.4737, 31.2304] },
    { name: "天津", coordinates: [117.2009, 39.0842] },
    { name: "重庆", coordinates: [106.5516, 29.5630] },
    { name: "香港", coordinates: [114.1694, 22.3193] },
    { name: "澳门", coordinates: [113.5439, 22.1987] },
    { name: "内蒙古", coordinates: [111.7656, 40.8175] },
    { name: "新疆", coordinates: [87.6168, 43.8256] },
    { name: "西藏", coordinates: [91.1172, 29.6469] },
    { name: "福建", coordinates: [119.2965, 26.0745] },
    { name: "四川", coordinates: [104.0668, 30.5728] }, // Chengdu
    { name: "广东", coordinates: [113.2644, 23.1291] },
    { name: "浙江", coordinates: [120.1551, 30.2741] },
    { name: "江苏", coordinates: [118.7969, 32.0603] },
    { name: "山东", coordinates: [117.0203, 36.6685] },
    { name: "陕西", coordinates: [108.9398, 34.3416] },
    { name: "甘肃", coordinates: [103.8264, 36.0594] },
    { name: "青海", coordinates: [101.7782, 36.6171] },
    { name: "宁夏", coordinates: [106.2309, 38.4872] },
    { name: "广西", coordinates: [108.3275, 22.8155] },
    { name: "贵州", coordinates: [106.6302, 26.6477] },
    { name: "湖南", coordinates: [112.9388, 28.2282] },
    { name: "湖北", coordinates: [114.3054, 30.5928] },
    { name: "河南", coordinates: [113.6253, 34.7466] },
    { name: "河北", coordinates: [114.5149, 38.0428] },
    { name: "山西", coordinates: [112.5624, 37.8735] },
    { name: "安徽", coordinates: [117.2272, 31.8206] },
    { name: "江西", coordinates: [115.8582, 28.6829] },
    { name: "吉林", coordinates: [125.3235, 43.8171] },
    { name: "辽宁", coordinates: [123.4315, 41.8057] },
];

const visitedCountries = [
    "Switzerland", "Germany", "Italy", "Hungary", "France", "Thailand"
];

const chinaGeoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/china/china-provinces.json";

const excludedProvinces = ["Heilongjiang", "Hainan", "Taiwan"];

const WorldMap: React.FC = () => {
    const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1 });

    const handleZoom = (coordinates: [number, number], zoom: number) => {
        // Animate coordinates
        animate(position.coordinates[0], coordinates[0], {
            duration: 1,
            onUpdate: (latest) => setPosition(prev => ({ ...prev, coordinates: [latest, prev.coordinates[1]] }))
        });
        animate(position.coordinates[1], coordinates[1], {
            duration: 1,
            onUpdate: (latest) => setPosition(prev => ({ ...prev, coordinates: [prev.coordinates[0], latest] }))
        });
        // Animate zoom
        animate(position.zoom, zoom, {
            duration: 1,
            onUpdate: (latest) => setPosition(prev => ({ ...prev, zoom: latest }))
        });
    };

    const handleGeographyClick = (geo: any) => {
        if (geo.properties.name === "China") {
            handleZoom([105, 35], 3);
        }
    };

    const handleReset = () => {
        handleZoom([0, 0], 1);
    };

    return (
        <div className="w-full h-[600px] bg-black relative flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-10 text-center z-10 pointer-events-none">
                <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 mb-4">
                    我的脚印
                </h2>
                <p className="text-gray-400 text-lg">用镜头记录世界的每一个角落</p>
            </div>

            {/* Controls */}
            <div className="absolute bottom-10 right-10 z-20 flex flex-col gap-4">
                <button
                    onClick={handleReset}
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/10"
                    title="Reset View"
                >
                    <Globe size={24} />
                </button>
            </div>

            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 140,
                }}
                className="w-full h-full"
            >
                <ZoomableGroup
                    center={position.coordinates as [number, number]}
                    zoom={position.zoom}
                    onMoveEnd={({ coordinates, zoom }) => setPosition({ coordinates: coordinates as [number, number], zoom })}
                >
                    {/* World Map */}
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const isChina = geo.properties.name === "China";
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onClick={() => handleGeographyClick(geo)}
                                        fill="#1a1a1a"
                                        stroke="#333"
                                        strokeWidth={0.5}
                                        style={{
                                            default: { outline: "none", transition: "all 250ms" },
                                            hover: { fill: "#2a2a2a", outline: "none", cursor: isChina ? "zoom-in" : "default" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                );
                            })
                        }
                    </Geographies>

                    {markers.map(({ name, coordinates }) => (
                        <Marker key={name} coordinates={coordinates as [number, number]}>
                            <motion.circle
                                r={4 / position.zoom} // Scale marker size with zoom
                                fill="#00f3ff"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />
                            <motion.circle
                                r={2 / position.zoom}
                                fill="#fff"
                            />
                            {position.zoom > 2 && ( // Only show labels when zoomed in
                                <text
                                    textAnchor="middle"
                                    y={-10 / position.zoom}
                                    style={{ fontFamily: "system-ui", fill: "#fff", fontSize: `${10 / position.zoom}px`, fontWeight: "bold" }}
                                >
                                    {name}
                                </text>
                            )}
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>

            {/* Gradient Overlay for seamless integration */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent to-black opacity-50"></div>
        </div>
    );
};

export default WorldMap;
