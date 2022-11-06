import { getXataClient } from "../../src/xata";
import cookie from "cookie"; // import cookie
import { v2 } from "cloudinary"; // import cloudinary

// CONFIGURE CLOUDINARY
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const xata = getXataClient();

const handler = async (req, res) => {
  var cookies = cookie.parse(req.headers.cookie || "");
  const isAuthenticated = cookies.token; // check if user is authenticated
  if (!isAuthenticated) {
    res.status(401).end();
    return;
  }

  const { img, userId } = JSON.parse(req.body);
  const result = await v2.uploader.upload(img, { // UPLOAD IMAGE TO CLOUDINARY
    categorization: "google_tagging", // USE GOOGLE AUTO TAGGING AI
    auto_tagging: 0.6,
  });

  await xata.db.images.create({ // INSERT IMAGE INTO DATABASE
    img_url: result.secure_url,
    user: userId, // user uploading image
    tags: result.tags,
  });
  res.status(200).json(result);
};
export default handler;

// CONFIG TO ALLOW IMAGES UPTO 10mb
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};
