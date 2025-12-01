import React, { useState } from 'react';
import { ACCESS_KEY_NAME, RESUME_DATA } from '../constants';
import { Lock, Unlock, CheckCircle, Star, Code, Terminal } from 'lucide-react';
import { SkillItem } from '../types';

const Resume: React.FC = () => {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState(false);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === ACCESS_KEY_NAME) {
            setIsUnlocked(true);
            setError(false);
        } else {
            setError(true);
            setInputValue('');
        }
    };

    if (!isUnlocked) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center px-4 py-20">
                <div className="w-full max-w-md bg-neon-card/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple"></div>

                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                            <Lock size={32} className="text-neon-blue" />
                        </div>

                        <h2 className="text-2xl font-bold mb-2">访问受限</h2>
                        <p className="text-gray-400 mb-8 text-sm">此区域包含敏感个人信息。请输入姓名以验证身份。</p>
                        <p className="text-xs text-gray-600 mb-4">(提示: 试着输入 "{ACCESS_KEY_NAME}")</p>

                        <form onSubmit={handleUnlock} className="w-full">
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        setError(false);
                                    }}
                                    placeholder="请输入姓名"
                                    className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/20'} rounded-lg px-4 py-3 text-center focus:outline-none focus:border-neon-blue transition-colors text-white placeholder-gray-600`}
                                />
                            </div>
                            {error && <p className="text-red-500 text-xs mb-4 animate-pulse">验证失败，请重试。</p>}

                            <button
                                type="submit"
                                className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-neon-blue hover:text-white transition-all duration-300"
                            >
                                解锁简历
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
                <h2 className="text-4xl font-bold">个人简历</h2>
                <div className="flex items-center gap-2 text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm border border-green-400/20 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                    <Unlock size={14} />
                    <span>已验证</span>
                </div>
            </div>

            {/* Profile Header */}
            <div className="mb-12 border-b border-white/10 pb-12 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-100 fill-mode-backwards">
                <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">{RESUME_DATA.name}</h1>
                <p className="text-xl text-neon-blue mb-6 font-light tracking-wide">{RESUME_DATA.title}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {RESUME_DATA.basicInfo.map((info, idx) => (
                        <div key={idx} className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-neon-blue/30 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] group">
                            <span className="text-gray-500 text-sm block mb-1 group-hover:text-neon-blue transition-colors">{info.label}</span>
                            <span className="text-white font-medium">{info.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Core Advantages */}
            <div className="mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200 fill-mode-backwards">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-neon-purple rounded-full shadow-[0_0_10px_#bc13fe]"></span>
                    核心优势
                </h3>
                <div className="bg-white/5 rounded-xl p-6 border border-white/5 hover:border-neon-purple/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(188,19,254,0.1)]">
                    <ul className="space-y-4">
                        {RESUME_DATA.coreAdvantages.map((adv, idx) => (
                            <li key={idx} className="flex items-start gap-3 group">
                                <CheckCircle size={20} className="text-neon-purple shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
                                <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{adv}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Skills */}
            <div className="mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300 fill-mode-backwards">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]"></span>
                    技能专长
                </h3>
                <div className="grid grid-cols-1 gap-6">
                    {RESUME_DATA.skills.map((skillCategory, idx) => (
                        <div key={idx} className="bg-white/5 p-6 rounded-xl border border-white/5 hover:border-neon-blue/40 hover:bg-white/[0.07] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(0,243,255,0.1)] group">
                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                {skillCategory.isLanguage ? <Code size={18} className="text-neon-blue group-hover:rotate-12 transition-transform duration-300" /> : <Terminal size={18} className="text-neon-blue group-hover:rotate-12 transition-transform duration-300" />}
                                {skillCategory.category}
                            </h4>

                            {Array.isArray(skillCategory.items) ? (
                                <div className="flex flex-wrap gap-3">
                                    {(skillCategory.items as SkillItem[]).map((item, i) => (
                                        <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/5 hover:border-neon-blue/50 hover:text-white hover:bg-neon-blue/10 transition-all duration-300 cursor-default">
                                            {item.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                                    {skillCategory.items as string}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Work Experience */}
            <div className="mb-16 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500 fill-mode-backwards">
                <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                    <span className="w-2 h-8 bg-neon-purple rounded-full shadow-[0_0_10px_#bc13fe]"></span>
                    工作经历
                </h3>
                <div className="space-y-12">
                    {RESUME_DATA.workExperience.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 border-l border-white/10 last:border-0 pb-12 last:pb-0 group">
                            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-neon-blue rounded-full group-hover:scale-150 group-hover:shadow-[0_0_10px_#00f3ff] transition-all duration-300"></div>

                            <div className="mb-4 transform transition-all duration-300 group-hover:translate-x-2">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                                    <h4 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">{exp.role}</h4>
                                    <span className="text-neon-blue font-mono text-sm bg-neon-blue/10 px-2 py-1 rounded border border-neon-blue/20">{exp.time}</span>
                                </div>
                                <div className="text-lg text-neon-purple font-medium mb-2">{exp.company}</div>
                                <p className="text-gray-400 text-sm italic mb-4 border-l-2 border-white/10 pl-3 py-1">{exp.summary}</p>
                            </div>

                            <ul className="space-y-2">
                                {exp.details.map((detail, i) => (
                                    <li key={i} className="text-gray-300 text-sm leading-relaxed flex items-start gap-2 hover:text-white transition-colors">
                                        <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 shrink-0 group-hover:bg-neon-purple transition-colors"></span>
                                        <span>{detail}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            {/* About Me */}
            <div className="animate-in slide-in-from-bottom-8 fade-in duration-700 delay-700 fill-mode-backwards">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <span className="w-2 h-8 bg-neon-blue rounded-full shadow-[0_0_10px_#00f3ff]"></span>
                    自我评价
                </h3>
                <div className="bg-gradient-to-br from-white/5 to-transparent p-6 rounded-xl border border-white/5 hover:border-neon-blue/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,243,255,0.05)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {RESUME_DATA.aboutMe.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 group">
                                <Star size={16} className="text-yellow-500 shrink-0 group-hover:rotate-180 transition-transform duration-500" />
                                <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Resume;