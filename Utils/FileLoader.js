import { promises as fs } from "fs";
export default async function loadImage(filePath) {
  const imageBuffer = await fs.readFile(filePath);
  return imageBuffer;
}
