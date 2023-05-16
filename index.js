const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-"  );
  },
});

const upload = multer({ storage: storage });


app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

app.post("/upload", upload.single("image"), (req, res) => {
  // req.file contains information about the uploaded file
  console.log(req.file);
  res.redirect("/")
});
app.get("/img", (req, res) => {
    const directoryPath = "uploads/";

    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        console.log("Error getting directory information:", err);
      } else {
        res.send(files)
      }
    });
})
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
