import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // upload file on clodinary
    const respoonse = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    // file has been upload successfully
    fs.unlinkSync(localFilePath);

    console.log('🚀 ~ uploadOnCloudinary ~ respoonse:', respoonse.url);

    return respoonse;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove local saved tepm file as upload operatopn got failed!
    return null;
  }
};

export { uploadOnCloudinary };
