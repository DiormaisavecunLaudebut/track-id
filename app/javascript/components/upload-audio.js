import cloudinary from "cloudinary-core";

const cloudName = 'dlodtvkez';
const unsignedUploadPreset = 'z3lte9fj';

const callback = (error, result) => {
  console.log(result, error);
}

cloudinary.v2.uploader.unsigned_upload(file,
  unsignedUploadPreset,
  {resource_type: "video"},
  callback);




