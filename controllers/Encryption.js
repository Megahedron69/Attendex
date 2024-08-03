import crypto from "crypto";
import zlib from "zlib";

// const constants = [
//   "2ac854cf-1f91-4487-ad0c-273fc94e05f4",
//   "07e8071d-1219-8c34-8279-4e9d3d466000",
// ];

export const encryptDat = (arrConsts) => {
  const data = constants.join(",");
  const compressed = zlib.deflateSync(data);
  const key = crypto.randomBytes(16);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);

  let encrypted = cipher.update(compressed, "binary", "base64");
  encrypted += cipher.final("base64");
  console.log(
    `Base64 encoded data size: ${Buffer.from(encrypted, "base64").length} bytes`
  );
  return { encrypted, key, iv };
};

export const decryptDat = (encrypted, key, iv) => {
  const decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  let decrypted = decipher.update(encrypted, "base64", "binary");
  decrypted += decipher.final("binary");
  const decompressed = zlib.inflateSync(Buffer.from(decrypted, "binary"));
  const dataArray = decompressed.toString().split(",");
  return dataArray;
};
