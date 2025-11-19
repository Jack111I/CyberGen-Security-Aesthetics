import React, { useState } from 'react';
import { LogoConfig } from '../types';
import { generateLogo } from '../services/geminiService';
import { ShieldIcon, RefreshIcon } from './ui/Icons';

interface LogoToolProps {
  onGenerated: (url: string) => void;
  onError: (msg: string) => void;
}

const LogoTool: React.FC<LogoToolProps> = ({ onGenerated, onError }) => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<LogoConfig>({
    name: '',
    theme: '',
    style: 'Emblem',
    primaryColor: '#00ff41'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const url = await generateLogo(config);
      onGenerated(url);
    } catch (e) {
      onError(e instanceof Error ? e.message : "Failed to generate logo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-cyber-panel border border-cyber-dark rounded-lg p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h2 className="text-xl font-cyber text-cyber-neon mb-4 tracking-wider flex items-center gap-2">
           <span className="text-2xl">►</span> IDENTITY_FORGE
        </h2>
        
        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                > ORGANIZATION_NAME (OPTIONAL)
              </label>
              <input
                type="text"
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                placeholder="CorpSec"
                className="w-full bg-cyber-black border border-gray-800 rounded p-3 text-gray-200 font-mono focus:border-cyber-neon focus:outline-none focus:ring-1 focus:ring-cyber-neon placeholder-gray-700"
              />
            </div>
             <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                > PRIMARY_COLOR
              </label>
              <div className="flex gap-2 mt-2">
                 {[
                   {c: '#00ff41', name: 'Green'}, 
                   {c: '#00f3ff', name: 'Cyan'}, 
                   {c: '#ff003c', name: 'Red'}, 
                   {c: '#fcd34d', name: 'Gold'}, 
                   {c: '#ffffff', name: 'White'}
                 ].map((col) => (
                    <button
                      key={col.c}
                      onClick={() => setConfig({...config, primaryColor: col.c})}
                      className={`w-8 h-8 rounded border-2 transition-transform hover:scale-110 ${config.primaryColor === col.c ? 'border-white scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: col.c }}
                      title={col.name}
                    />
                 ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                > VISUAL_THEME
              </label>
              <input
                type="text"
                value={config.theme}
                onChange={(e) => setConfig({ ...config, theme: e.target.value })}
                placeholder="e.g. Shield with lion, Lock, Eye"
                className="w-full bg-cyber-black border border-gray-800 rounded p-3 text-gray-200 font-mono focus:border-cyber-neon focus:outline-none focus:ring-1 focus:ring-cyber-neon placeholder-gray-700"
              />
            </div>
            <div>
              <label className="block text-xs font-mono text-gray-400 mb-1">
                > LOGO_STYLE
              </label>
              <div className="relative">
                <select
                  value={config.style}
                  onChange={(e) => setConfig({ ...config, style: e.target.value as any })}
                  className="w-full bg-cyber-black border border-gray-800 rounded p-3 text-gray-200 font-mono focus:border-cyber-neon focus:outline-none appearance-none cursor-pointer"
                >
                  <option value="Emblem">Emblem / Badge</option>
                  <option value="Mascot">Esports Mascot</option>
                  <option value="Abstract">Tech Abstract</option>
                  <option value="Lettermark">Lettermark</option>
                </select>
                 <div className="absolute right-3 top-3 pointer-events-none text-cyber-neon">▼</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !config.theme}
          className={`w-full py-4 rounded font-cyber font-bold text-lg tracking-widest uppercase transition-all relative overflow-hidden group ${
            loading || !config.theme
              ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
              : 'bg-cyber-neon text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,255,65,0.6)]'
          }`}
        >
           {loading ? (
            <span className="flex items-center justify-center gap-2">
              <RefreshIcon className="animate-spin" /> COMPILING...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <ShieldIcon /> FORGE_LOGO
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default LogoTool;