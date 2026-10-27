// lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

console.log("Checking Cloudinary ENV:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "FOUND" : "NOT FOUND",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "FOUND" : "NOT FOUND",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

export default cloudinary;
