
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export async function imageUpload(imageFile, folder) {
    try{
     cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
    let resultUrl = "";
    // await blobToBase64(imageFile).then(base64 => {imageunstripped = base64});
    const imageunstripped = await toBase64(imageFile);
    await cloudinary.uploader.upload(imageunstripped, { folder: folder }, function (error, result) {
        resultUrl = result.secure_url;
    });
    return resultUrl;
}
catch(error){
    console.log(error);
    return ''
}
}

export async function deleteUpload(url, folder) {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
    let filename = url.split("/").pop();
    filename = filename?.substring(0, filename?.lastIndexOf("."));
    await cloudinary.uploader.destroy(
        `${folder ? `${folder}/` : ""}${filename}`,
        function (result) {
        }
    );
}
