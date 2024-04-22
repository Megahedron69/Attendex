import { createWorker } from "tesseract.js";
import path from "path";

export const extractText = async (fileName) => {
  try {
    const iPath = path.join(process.cwd(), `idCards/${fileName}`);
    const worker = await createWorker("eng", 1);
    const {
      data: { text },
    } = await worker.recognize(iPath);
    await worker.terminate();
    return text;
  } catch (err) {
    console.log("error in ocr:" + err);
  }
};
