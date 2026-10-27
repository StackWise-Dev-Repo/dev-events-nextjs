"use server";
import connectDB from "@/database";
import Event from "@/database/event.modal";
import cloudinary from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function createNewEvent(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const file = formData.get("src") as File;
  const type = formData.get("type") as string;
  const venue = formData.get("venue") as string;
  const date = formData.get("date") as string;
  const tagsRaw = formData.get("tags") as string;

  if (!title || !description || !venue || !date || !type) {
    return { success: false, message: "Please fill in all required fields." };
  }

  if (!file || file.size === 0) {
    return { success: false, message: "No file uploaded." };
  }

  try {
    console.log("_______ running client __________");

    // 1. Connect DB - Yahan pehle connect karo, baad me nahi
    await connectDB();
    console.log("_________ reach to server + DB Connected __________");

    // 2. Upload to Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "dev-events", resource_type: "image" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      uploadStream.end(buffer);
    });

    if (!result?.secure_url) {
      return { success: false, message: "Cloudinary upload failed." };
    }

    // 3. Tags parse
    const tags = tagsRaw
      ? tagsRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    // 4. DIRECT DB CREATE - fetch ki zarurat nahi!
    const newEvent = await Event.create({
      title,
      description,
      src: result.secure_url,
      type,
      venue,
      date: new Date(date),
      tags,
    });

    console.log("server response", newEvent);

    revalidatePath("/events"); // events page ko refresh kar do

    return { success: true, message: "Event created successfully!" };
  } catch (error: any) {
    console.log("____ DROPPED IN CATCH ____", error);
    console.log("Full Error:", JSON.stringify(error, null, 2));

    if (error.code === 11000) {
      return {
        success: false,
        message: "Event with this title already exists.",
      };
    }
    // Validation error ka asal message dikhao
    if (error.name === "ValidationError") {
      return {
        success: false,
        message: Object.values(error.errors)
          .map((e: any) => e.message)
          .join(", "),
      };
    }
    return {
      success: false,
      message: error.message || "Failed to create event.",
    };
  }
}
