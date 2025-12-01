import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GearSection: React.FC<{
    title: string;
    subtitle: string;
    description: string;
    imageSrc: string;
    align?: 'left' | 'right';
    variant?: 'cover' | 'contain';
}> = ({ title, subtitle, description, imageSrc, align = 'left', variant = 'cover' }) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <section ref={ref} className="min-h-[70vh] md:min-h-screen flex items-center justify-center relative overflow-hidden py-20">
            <div className={`container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 ${align === 'right' ? 'md:flex-row-reverse' : ''}`}>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-1/3 z-10"
                >
                    <h3 className="text-neon-blue font-mono text-sm tracking-widest mb-2">{subtitle}</h3>
                    <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">{title}</h2>
                    <p className="text-gray-400 text-lg leading-relaxed">{description}</p>
                </motion.div>

                {/* Visual Content (Image) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.8 }}
                    className="w-full md:w-2/3 relative z-10"
                >
                    <div className="relative aspect-square md:aspect-video bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 overflow-hidden shadow-2xl shadow-neon-blue/10 group">
                        <div className={`absolute inset-0 flex items-center justify-center ${variant === 'contain' ? 'p-6 md:p-12' : ''}`}>
                            <img
                                src={imageSrc}
                                alt={title}
                                className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${variant === 'contain' ? 'object-contain' : 'object-cover'}`}
                            />
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const GearShowcase: React.FC = () => {
    return (
        <div className="bg-black text-white">
            <div className="py-20 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">出行装备</h2>
                <p className="text-gray-400">工欲善其事，必先利其器</p>
            </div>

            <GearSection
                title="FUJIFILM X-T50"
                subtitle="PHOTOGRAPHY"
                description="4020万像素 X-Trans CMOS 5 HR 传感器，胶片模拟旋钮，轻巧机身下的强大画质。记录生活的每一帧色彩。"
                imageSrc="https://s2.loli.net/2025/11/29/6lpfqI7NLFmA3OZ.png"
                variant="contain"
            />

            <GearSection
                title="MOUNTAIN BIKE"
                subtitle="ADVENTURE"
                description="全避震车架，精密传动系统。征服山林，挑战极限。每一次踩踏都是对自由的渴望。"
                imageSrc="https://s2.loli.net/2025/11/29/miSpVYgrdL7NylM.jpg"
                align="right"
                variant="cover"
            />

            <GearSection
                title="XPENG G6"
                subtitle="MOBILITY"
                description="800V 高压快充，XNGP 全场景智能辅助驾驶。科技改变出行，探索更远的边界。"
                imageSrc="https://s2.loli.net/2025/11/29/eZ84tMi3WamfXjV.jpg"
                variant="cover"
            />

            <GearSection
                title="INSTA360 ACE PRO"
                subtitle="ACTION"
                description="徕卡联合研发，8K 摄影，AI 降噪。记录运动中的每一个精彩瞬间，无惧黑夜。"
                imageSrc="https://s2.loli.net/2025/11/29/3qrpe1mN6Ua4LGn.png"
                align="right"
                variant="contain"
            />

            <GearSection
                title="XIAOMI 15"
                subtitle="MOBILE"
                description="徕卡光学 Summilux 镜头，骁龙 8 至尊版。口袋里的影像旗舰，随时随地捕捉生活灵感。"
                imageSrc="https://s2.loli.net/2025/11/29/YSMI8nLv5xjHwDg.png"
                variant="contain"
            />
        </div>
    );
};

export default GearShowcase;
