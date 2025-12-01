import React from 'react';
import { ViewState } from '../types';
import { Camera, FileText, Home } from 'lucide-react';
import { HOMEPAGE_DATA } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onChangeView }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-neon-blue selection:text-black">

      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            className="text-xl font-bold tracking-tighter cursor-pointer"
            onClick={() => onChangeView('home')}
          >
            {HOMEPAGE_DATA.name.toUpperCase()}<span className="text-neon-blue">.</span>DEV
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => onChangeView('home')}
              className={`text-sm font-medium transition-colors ${activeView === 'home' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              首页
            </button>
            <button
              onClick={() => onChangeView('gallery')}
              className={`text-sm font-medium transition-colors ${activeView === 'gallery' ? 'text-white' : 'text-gray-500 hover:text-white'}`}
            >
              摄影集
            </button>
            <button
              onClick={() => onChangeView('resume')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeView === 'resume'
                  ? 'bg-neon-purple text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              简历
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex gap-8 shadow-2xl shadow-black">
        <button
          onClick={() => onChangeView('home')}
          className={`flex flex-col items-center gap-1 ${activeView === 'home' ? 'text-neon-blue' : 'text-gray-500'}`}
        >
          <Home size={20} />
        </button>
        <button
          onClick={() => onChangeView('gallery')}
          className={`flex flex-col items-center gap-1 ${activeView === 'gallery' ? 'text-neon-blue' : 'text-gray-500'}`}
        >
          <Camera size={20} />
        </button>
        <button
          onClick={() => onChangeView('resume')}
          className={`flex flex-col items-center gap-1 ${activeView === 'resume' ? 'text-neon-purple' : 'text-gray-500'}`}
        >
          <FileText size={20} />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5 mt-auto">
        <p>&copy; {new Date().getFullYear()} {HOMEPAGE_DATA.name}. All Rights Reserved.</p>
        <p className="mt-2 text-xs opacity-50">Designed with React & Tailwind</p>
      </footer>
    </div>
  );
};

export default Layout;