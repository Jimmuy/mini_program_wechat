import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Resume from './components/Resume';
import { ViewState } from './types';

function App() {
  const [activeView, setActiveView] = useState<ViewState>('home');

  const handleViewChange = (view: ViewState) => {
    setActiveView(view);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => handleViewChange('gallery')} />
            {/* We show a preview of gallery on home or just keep it simple. Let's keep it simple for SPA feel */}
          </>
        );
      case 'gallery':
        return <Gallery onClose={() => handleViewChange('home')} />;
      case 'resume':
        return <Resume />;
      default:
        return <Hero onExplore={() => handleViewChange('gallery')} />;
    }
  };

  return (
    <Layout activeView={activeView} onChangeView={handleViewChange}>
      <div className="animate-in fade-in duration-500">
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;