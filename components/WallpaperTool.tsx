import React, { useState } from 'react';
import { WallpaperConfig } from '../types';
import { generateWallpaper } from '../services/geminiService';
import { SparklesIcon, DownloadIcon, RefreshIcon } from './ui/Icons';

interface WallpaperToolProps {
  onGenerated: (url: string) => void;
  onError: (msg: string) => void;
}

const WallpaperTool: React.FC<WallpaperToolProps> = ({ onGenerated, onError }) => {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<WallpaperConfig>({
    prompt: '',
    aspectRatio: '16:9',
    style: 'Cyberpunk'
  });

  const handleGenerate = async () => {
    if (!config.prompt) return;
    setLoading(true);
    try {
      const url = await generateWallpaper(config);
      onGenerated(url);
    } catch (e) {
      onError(e instanceof Error ? e.message : "Failed to generate wallpaper");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-cyber-panel border border-cyber-dark rounded-lg p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
        <h2 className="text-xl font-cyber text-cyber-primary mb-4 tracking-wider flex items-center gap-2">
           <span className="text-2xl">►</span> SYSTEM_INPUT
        </h2>
        
        {/* Prompt Input */}
        <div className="mb-6 group">
          <label className="block text-xs font-mono text-gray-400 mb-1 group-focus-within:text-cyber-primary transition-colors">
            > ENTER_PROMPT
          </label>
          <textarea
            value={config.prompt}
            onChange={(e) => setConfig({ ...config, prompt: e.target.value })}
            placeholder="e.g. A futuristic server room guarded by a digital dragon..."
            className="w-full bg-cyber-black border border-gray-800 rounded p-3 text-gray-200 font-mono focus:border-cyber-primary focus:outline-none focus:ring-1 focus:ring-cyber-primary min-h-[100px] placeholder-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Style Selection */}
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">
              > SELECT_STYLE
            </label>
            <div className="relative">
              <select
                value={config.style}
                onChange={(e) => setConfig({ ...config, style: e.target.value as any })}
                className="w-full bg-cyber-black border border-gray-800 rounded p-3 text-gray-200 font-mono focus:border-cyber-primary focus:outline-none appearance-none cursor-pointer"
              >
                <option value="Cyberpunk">Cyberpunk</option>
                <option value="Realism">Realism</option>
                <option value="Digital Art">Digital Art</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Glitch">Glitch</option>
              </select>
              <div className="absolute right-3 top-3 pointer-events-none text-cyber-primary">▼</div>
            </div>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-xs font-mono text-gray-400 mb-1">
              > ASPECT_RATIO
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: '16:9', val: '16:9' },
                { label: '9:16', val: '9:16' },
                { label: '1:1', val: '1:1' },
              ].map((ratio) => (
                <button
                  key={ratio.val}
                  onClick={() => setConfig({ ...config, aspectRatio: ratio.val as any })}
                  className={`p-2 text-xs font-mono border rounded transition-all ${
                    config.aspectRatio === ratio.val
                      ? 'border-cyber-primary bg-cyber-primary/10 text-cyber-primary shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                      : 'border-gray-800 text-gray-500 hover:border-gray-600'
                  }`}
                >
                  {ratio.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleGenerate}
          disabled={loading || !config.prompt}
          className={`w-full py-4 rounded font-cyber font-bold text-lg tracking-widest uppercase transition-all relative overflow-hidden group ${
            loading || !config.prompt
              ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
              : 'bg-cyber-primary text-black hover:bg-white hover:shadow-[0_0_20px_rgba(0,243,255,0.6)]'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <RefreshIcon className="animate-spin" /> PROCESSING...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <SparklesIcon /> GENERATE_WALLPAPER
            </span>
          )}
          {/* Button Glitch Effect Overlay */}
          {!loading && config.prompt && (
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
          )}
        </button>
      </div>
    </div>
  );
};

export default WallpaperTool;