import axios from "axios"
import crypto from "crypto";
import { ClientPageRoot } from "next/dist/client/components/client-page";
const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;

const getPublicIdFromUrl = (url: string) => {
  const match = url.match(regex);
  return match ? match[1] : null;
};



const generateSHA1 = (data: any) => {
  const hash = crypto.createHash("sha1");
  hash.update(data);
  return hash.digest("hex");
}

const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};

async function deleteImage(publicId: string) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const timestamp = new Date().getTime();
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_SECRET
  const signature = generateSHA1(generateSignature(publicId, apiSecret!));
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`;

  try {
    const response = await axios.post(url, {
      public_id: publicId,
      signature: signature,
      api_key: apiKey,
      timestamp: timestamp,
    });

    return response.status === 200


    // console.error(response);

  } catch (error) {

    console.error(error);
    return false
  }
}
export { getPublicIdFromUrl, deleteImage }
