const { createClient } = require("@supabase/supabase-js");
const { consumers } = require("nodemailer/lib/xoauth2");
const { v4: uuidv4 } = require("uuid");

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);


const base64ToBuffer = (base64String) => {
  const base64Data = base64String.split(",")[1]; // Remove the data URL prefix if present
  return Buffer.from(base64Data, "base64");
};
const uploadPhoto = async (base64String) => {
  try {
    // Convert Base64 to Buffer
    const photoBuffer = base64ToBuffer(base64String);

    // Generate a random filename with .png extension
    const randomFileName = `${uuidv4()}.png`;

    // Upload to Supabase bucket
    const { data, error } = await supabase.storage
      .from("mindflow-pfp")
      .upload(randomFileName, photoBuffer, {
        contentType: "image/png", // Ensures the file is treated as a PNG
        upsert: false, // Prevent overwriting existing files
      });

    if (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }

    // Retrieve the public URL of the uploaded file
    // const { publicUrl } = supabase.storage.from("mindflow-pfp").getPublicUrl(data.fullPath);

      
    // if(publicUrl){
    //   console.log("Public URL:", publicUrl);
    // }

    const publicUrl = `https://bfqfnxtcoojjtrewtvsz.supabase.co/storage/v1/object/public/mindflow-pfp/${randomFileName}`;

      

    return publicUrl;
  } catch (error) {
    console.error("Error uploading photo:", error.message);
    throw error;
  }
};

module.exports = { uploadPhoto };
