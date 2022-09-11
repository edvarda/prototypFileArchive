const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
require("dotenv").config();

// Datastore
mongoose.connect(
  `${process.env.DBCONNECTION}/filearchive`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true, // No idea what this does: check!
  },
  () => {
    console.log("connected to db");
  }
);

const fileSchema = new mongoose.Schema({
  filepath: { type: String, required: true },
  filename: { type: String, required: true },
  uploader: String,
  description: String,
  filetype: String,
  date: { type: Date, default: Date.now },
});
const FileMetadata = mongoose.model("File", fileSchema);

// Initialize
const app = express();

// Middleware setup
const upload = multer({ dest: "uploads/" });

//Here's where I'd pass an options object with allowed origins. Now it's all allowed.
app.use(cors());

//It appears I need to parse the request body to get the Json.
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  try {
    const files = await FileMetadata.find();
    res.status(200).json(files);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.get("/:fileId", async (req, res) => {
  try {
    const file = await FileMetadata.findById(req.params.fileId);
    res.status(200).download(file.filepath, file.filename); // More error handling here?
  } catch (err) {
    res.sendStatus(404);
  }
});

app.delete("/:fileId", async (req, res) => {
  let file;

  try {
    // First see if the record of the file can be found in the db
    file = await FileMetadata.findById(req.params.fileId);
  } catch {
    return res.sendStatus(404);
  }
  try {
    // Then delete the actual file and the record.
    await fs.unlink(file.filepath, (err) => {
      if (err) throw err;
    });
    await FileMetadata.deleteOne({ _id: req.params.fileId });

    // In the real world, this should maybe have some sort of transaction control, because we're messing with coupled data in two different places.
    res.status(200).json({ message: "file deleted" });
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.body);
    console.log(req.file);
    const newFile = new FileMetadata({
      ...req.body,
      filepath: req.file.path,
      filetype: req.file.mimetype,
    });
    let data = await newFile.save();
    res.status(200).json({ message: "file uploaded" });
  } catch (err) {
    fs.unlink(req.file.path, (err) => {}); // Delete file if something went wrong with writing the metadata.
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
