import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { image, otherData } = req.body;
    let updatedData = otherData;

    if (image) {
      if (image.startsWith("data:image")) {
        try {
          const uploadResonse = await cloudinary.uploader.upload(image);
          updatedData.image = uploadResonse.secure_url;
        } catch (error) {
          console.log("Erro uploading image", error);
          return res.status(400).json({
            success: false,
            message: "Error uploaading image, Profile update aborted",
          });
        }
      }
    }
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.log("Error in updateProfile ", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
