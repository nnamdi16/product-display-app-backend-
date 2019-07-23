const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const stringGen = require("otp-generator");

require("dotenv").config();

let s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  endpoint: process.env.DO_ENDPOINT
});

function upload(folder) {
  // Change bucket props to your file storage space name
  return multer({
    storage: multerS3({
      s3,
      bucket: process.env.DO_BUCKET,
      acl: "public-read", // access control
      key(req, file, cb) {
        req.s3 = s3; // add s3 to request body for error handling
        let stringVal = stringGen
          .generate(Math.ceil(Math.random() * 30), { specialChars: false })
          .toString();
        let imageName = `${folder}-${Math.random() *
          10000}-${stringVal}-${Date.now()}.png`; // create file name if avatar never exist
        cb(null, `${folder}/${imageName}`); // store image in avatar folder on DO space
      },
      toFormat: { type: "png" }, // format to convert image to
      resize: [
        { suffix: "xlg", width: 1200, height: 1200 },
        { suffix: "lg", width: 800, height: 800 },
        { suffix: "md", width: 500, height: 500 },
        { suffix: "sm", width: 300, height: 300 },
        { suffix: "xs", width: 100 },
        { suffix: "original" }
      ]
    }),
    // filter input files, must be jpg, jpeg, or png else rejection is done
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(png|jpg|jpeg)$/i)) {
        return cb(new Error("File must be jpg, jpeg or png"));
      }
      cb(undefined, true);
    },
    limits: {
      fileSize: 10000000 // file size to be uploaded must be less than 10mb
    }
  });
}

module.exports = upload;
