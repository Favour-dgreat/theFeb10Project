import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CloudinaryAPIKey,
    api_secret: process.env.CloudinaryAPISecret,
});

export default cloudinary;

export const uploadToCloudinary = async (file: File, folder: string) => {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: folder, resource_type: 'auto' },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result); // result contains secure_url
            }
        ).end(buffer);
    });
};
