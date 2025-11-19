import React, { useState } from 'react';
import { GenMode } from './types';
import WallpaperTool from './components/WallpaperTool';
import LogoTool from './components/LogoTool';
import { ImageICon, ShieldIcon, DownloadIcon, CpuIcon } from './components/ui/Icons';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GenMode>(GenMode.WALLPAPER);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerated = (url: string) => {
    setResultImage(url);
    setError(null);
  };

  const handleError = (msg: string) => {
    setError(msg);
    setResultImage(null);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `cybergen_${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-cyber-black text-gray-200 selection:bg-cyber-primary selection:text-black relative overflow-x-hidden">
      
      {/* Background Grid Animation */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ 
        backgroundImage: `linear-gradient(to right, #111827 1px, transparent 1px), linear-gradient(to bottom, #111827 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        opacity: 0.2
      }}></div>
      
      {/* Scanline Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800 bg-cyber-dark/90 backdrop-blur-sm sticky top-0">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CpuIcon className="text-cyber-primary w-8 h-8" />
            <h1 className="font-cyber text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyber-primary to-cyber-neon">
              CYBERGEN
            </h1>
          </div>
          <div className="text-xs font-mono text-gray-500 hidden sm:block">
            V.1.0.4 // SECURE_CONNECTION_ESTABLISHED
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-900/50 p-1 rounded-lg border border-gray-800 backdrop-blur">
            <button
              onClick={() => { setActiveTab(GenMode.WALLPAPER); setResultImage(null); setError(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded font-mono text-sm transition-all ${
                activeTab === GenMode.WALLPAPER
                  ? 'bg-cyber-primary/20 text-cyber-primary shadow-[0_0_15px_rgba(0,243,255,0.2)] border border-cyber-primary/50'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <ImageICon className="w-4 h-4" /> WALLPAPER
            </button>
            <button
              onClick={() => { setActiveTab(GenMode.LOGO); setResultImage(null); setError(null); }}
              className={`flex items-center gap-2 px-6 py-3 rounded font-mono text-sm transition-all ${
                activeTab === GenMode.LOGO
                  ? 'bg-cyber-neon/20 text-cyber-neon shadow-[0_0_15px_rgba(0,255,65,0.2)] border border-cyber-neon/50'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <ShieldIcon className="w-4 h-4" /> LOGO_MAKER
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-2xl mx-auto mb-6 bg-red-900/20 border border-red-500/50 text-red-400 p-4 rounded font-mono text-sm flex items-start gap-3">
             <span className="text-xl">⚠</span>
             <div>
               <p className="font-bold">SYSTEM_ERROR</p>
               <p>{error}</p>
             </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left: Generator Tools */}
          <div>
            {activeTab === GenMode.WALLPAPER ? (
              <WallpaperTool onGenerated={handleGenerated} onError={handleError} />
            ) : (
              <LogoTool onGenerated={handleGenerated} onError={handleError} />
            )}

            <div className="mt-6 text-xs font-mono text-gray-600 text-center">
              POWERED_BY_GOOGLE_IMAGEN_3
            </div>
          </div>

          {/* Right: Result Display */}
          <div className="bg-cyber-panel border border-gray-800 rounded-lg p-1 min-h-[400px] flex flex-col items-center justify-center relative shadow-2xl overflow-hidden group">
             {/* Decorative corners */}
             <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-primary/50"></div>
             <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyber-primary/50"></div>
             <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyber-primary/50"></div>
             <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-primary/50"></div>

             {resultImage ? (
               <div className="relative w-full h-full">
                 <img 
                   src={resultImage} 
                   alt="Generated Result" 
                   className="w-full h-auto rounded object-contain max-h-[600px] animate-fade-in"
                 />
                 <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={handleDownload}
                     className="bg-white text-black font-bold py-2 px-6 rounded-full flex items-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                   >
                     <DownloadIcon className="w-4 h-4" /> DOWNLOAD_ASSET
                   </button>
                 </div>
               </div>
             ) : (
               <div className="text-center p-10 opacity-50">
                 <div className="w-24 h-24 border-2 border-dashed border-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                    {activeTab === GenMode.WALLPAPER ? <ImageICon className="w-10 h-10 text-gray-700" /> : <ShieldIcon className="w-10 h-10 text-gray-700" />}
                 </div>
                 <p className="font-mono text-gray-500 text-sm">AWAITING_DATA_STREAM...</p>
               </div>
             )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;