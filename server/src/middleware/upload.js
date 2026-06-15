const multer = require("multer");
const path = require("path");

const storage =
  multer.diskStorage({
    destination: (
      req,
      file,
      cb
    ) => {
      cb(null, "uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {
      cb(
        null,
        Date.now() +
          "-" +
          file.originalname
      );
    },
  });

const fileFilter = (req, file, cb) => {
  console.log("Original Name:", file.originalname);
  console.log("Mime Type:", file.mimetype);

  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files allowed"), false);
  }
};

module.exports = multer({
  storage,
  fileFilter,
});
