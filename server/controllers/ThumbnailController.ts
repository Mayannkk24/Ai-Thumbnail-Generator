import { Request, Response } from "express";
import Thumbnail from "../models/Thumbnail.js";
import path from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import hf from "../configs/ai.js";

/* ===============================
   🎨 STYLE PROMPTS
================================ */
const stylePrompts = {
  "Bold & Graphic":
    "eye-catching thumbnail, bold typography, vibrant colors, expressive facial reaction, dramatic lighting, high contrast, click-worthy composition, professional style",
  "Tech/Futuristic":
    "futuristic thumbnail, sleek modern design, digital UI elements, glowing accents, holographic effects, cyber-tech aesthetic, sharp lighting, high-tech atmosphere",
  Minimalist:
    "minimalist thumbnail, clean layout, simple shapes, limited color palette, plenty of negative space, modern flat design, clear focal point",
  Photorealistic:
    "photorealistic thumbnail, ultra-realistic lighting, natural skin tones, candid moment, DSLR-style photography, lifestyle realism, shallow depth of field",
  Illustrated:
    "illustrated thumbnail, custom digital illustration, stylized characters, bold outlines, vibrant colors, creative cartoon or vector art style",
};

/* ===============================
   🎨 COLOR SCHEMES
================================ */
const colorSchemeDescriptions = {
  vibrant: "vibrant and energetic colors, high saturation, bold contrasts",
  sunset: "warm sunset tones, orange pink and purple hues",
  forest: "natural green tones, earthy colors, calm and organic palette",
  neon: "neon glow effects, electric blues and pinks, cyberpunk lighting",
  purple: "purple-dominant palette, modern stylish mood",
  monochrome: "black and white color scheme, dramatic lighting",
  ocean: "cool blue and teal tones, aquatic palette",
  pastel: "soft pastel colors, calm and friendly aesthetic",
};

/* ===============================
   🚨 SAFETY FILTER
================================ */
const bannedWords = [
  "nude", "porn", "sex", "xxx", "erotic", "naked", "boobs",
  "kill", "murder", "terrorist", "bomb",
  "hate", "racist", "abuse",
  "drug", "cocaine", "heroin",
];

const isUnsafePrompt = (text: string) =>
  bannedWords.some(word => text.toLowerCase().includes(word));

/* ===============================
   🎯 GENERATE THUMBNAIL
================================ */
export const generateThumbnail = async (req: Request, res: Response) => {
  try {
    const { userId } = req.session;

    const {
      title,
      prompt: user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
    } = req.body;

    // Validation
    if (!title || title.length > 200) {
      return res.status(400).json({ message: "Invalid or too long title" });
    }

    if (user_prompt && isUnsafePrompt(user_prompt)) {
      return res.status(400).json({
        message: "Unsafe content detected. Please modify your prompt.",
      });
    }

    // Create DB record
    const thumbnail = await Thumbnail.create({
      userId,
      title,
      prompt_used: user_prompt,
      user_prompt,
      style,
      aspect_ratio,
      color_scheme,
      text_overlay,
      isGenerating: true,
    });

    // Build AI prompt
    let prompt = `Create a family-friendly, professional YouTube thumbnail. `;
    prompt += `Style: ${stylePrompts[style as keyof typeof stylePrompts]}. `;
    prompt += `Title: "${title}". `;

    if (color_scheme) {
      prompt += `Color theme: ${
        colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]
      }. `;
    }

    if (user_prompt) {
      prompt += `Extra details: ${user_prompt}. `;
    }

    prompt += `Aspect ratio ${aspect_ratio}. High quality. Clickable. Clean.`;

    /* ===============================
       🖼️ HUGGING FACE IMAGE GEN
    ================================ */
    const image: unknown = await hf.textToImage({
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
    });

    /* ===============================
       🔁 SAFE IMAGE CONVERSION
    ================================ */
   let buffer: Buffer;

// Blob-like (HF Node response)
if (typeof image === "object" && image !== null && "arrayBuffer" in image) {
  const arrayBuffer = await (image as any).arrayBuffer();
  buffer = Buffer.from(arrayBuffer);

// base64 string
} else if (typeof image === "string") {
  buffer = Buffer.from(image, "base64");

// ArrayBuffer-like (safe check)
} else if (
  typeof image === "object" &&
  image !== null &&
  "byteLength" in image
) {
  buffer = Buffer.from(image as ArrayBuffer);

} else {
  throw new Error("Unsupported image format returned from Hugging Face");
}


    /* ===============================
       💾 SAVE + CLOUDINARY
    ================================ */
    const filename = `thumbnail-${Date.now()}.png`;
    const filepath = path.join("images", filename);

    fs.mkdirSync("images", { recursive: true });
    fs.writeFileSync(filepath, buffer);

    const uploadResult = await cloudinary.uploader.upload(filepath, {
      resource_type: "image",
    });

    thumbnail.image_url = uploadResult.secure_url;
    thumbnail.isGenerating = false;
    await thumbnail.save();

    fs.unlinkSync(filepath);

    return res.json({
      message: "Thumbnail generated successfully",
      thumbnail,
    });

  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};

/* ===============================
   🗑️ DELETE THUMBNAIL
================================ */
export const deleteThumbnail = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.session;

    await Thumbnail.findOneAndDelete({ _id: id, userId });

    res.json({ message: "Thumbnail deleted successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Internal Server Error",
    });
  }
};
