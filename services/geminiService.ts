import { GoogleGenAI } from "@google/genai";
import { WallpaperConfig, LogoConfig, GenMode } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found in environment variables");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWallpaper = async (config: WallpaperConfig): Promise<string> => {
  const ai = getClient();
  
  // Construct a rich prompt based on user input to ensure cyber security theme
  const basePrompt = config.prompt || "Cyber security operations center, dark mood";
  
  let styleModifiers = "";
  switch (config.style) {
    case 'Cyberpunk': styleModifiers = "neon lights, rain, high tech city background, futuristic, purple and cyan lighting"; break;
    case 'Realism': styleModifiers = "photorealistic, 8k, cinematic lighting, unreal engine 5 render, highly detailed server room"; break;
    case 'Digital Art': styleModifiers = "digital painting, concept art, glowing circuits, data streams, matrix code rain"; break;
    case 'Minimalist': styleModifiers = "minimalist, flat design, vector art, simple geometric shapes, dark background, isolated subject"; break;
    case 'Glitch': styleModifiers = "glitch art, datamosh, distorted, vhs noise, chromatic aberration, hacker aesthetic"; break;
  }

  const fullPrompt = `High quality wallpaper, ${basePrompt}. Cyber security theme, technology, secure, protected. ${styleModifiers}. High resolution, sharp focus.`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: config.aspectRatio,
        outputMimeType: 'image/jpeg',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    
    if (!base64ImageBytes) {
      throw new Error("No image data returned from API");
    }

    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error("Wallpaper generation failed:", error);
    throw error;
  }
};

export const generateLogo = async (config: LogoConfig): Promise<string> => {
  const ai = getClient();

  const basePrompt = config.theme || "Cyber security shield";
  const nameInclude = config.name ? `incorporating the text "${config.name}"` : "no text";
  
  let styleModifiers = "";
  switch (config.style) {
    case 'Mascot': styleModifiers = "esports mascot style, bold lines, aggressive, vector illustration"; break;
    case 'Abstract': styleModifiers = "abstract geometric shapes, interconnected nodes, tech network, futuristic logo"; break;
    case 'Emblem': styleModifiers = "emblem style, shield shape, metallic texture, official security badge look"; break;
    case 'Lettermark': styleModifiers = "typography based, stylized letters, tech font, glowing edges"; break;
  }

  const fullPrompt = `Professional cyber security logo, ${basePrompt}. ${styleModifiers}. Primary color: ${config.primaryColor}. On a solid black background. High quality vector style art. ${nameInclude}`;

  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: fullPrompt,
      config: {
        numberOfImages: 1,
        aspectRatio: '1:1', // Logos are usually square
        outputMimeType: 'image/jpeg',
      },
    });

    const base64ImageBytes = response.generatedImages?.[0]?.image?.imageBytes;
    
    if (!base64ImageBytes) {
      throw new Error("No image data returned from API");
    }

    return `data:image/jpeg;base64,${base64ImageBytes}`;

  } catch (error) {
    console.error("Logo generation failed:", error);
    throw error;
  }
};