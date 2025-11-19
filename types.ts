export enum GenMode {
  WALLPAPER = 'WALLPAPER',
  LOGO = 'LOGO'
}

export interface GeneratedImage {
  id: string;
  base64: string;
  prompt: string;
  timestamp: number;
  type: GenMode;
}

export interface WallpaperConfig {
  prompt: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  style: 'Realism' | 'Digital Art' | 'Cyberpunk' | 'Minimalist' | 'Glitch';
}

export interface LogoConfig {
  name: string;
  theme: string;
  style: 'Mascot' | 'Abstract' | 'Emblem' | 'Lettermark';
  primaryColor: string;
}