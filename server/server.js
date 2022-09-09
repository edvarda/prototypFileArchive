const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");

// Datastore
mongoose.connect(
  "mongodb://localhost:27017/filearchive",
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
const PORT = process.env.PORT || 3001; // Do something here.
const app = express();

// Middleware setup
const upload = multer({ dest: "uploads/" });

//Here's where I'd pass an options object with allowed origins. Now it's all allowed.
app.use(cors());

//It appears I need to parse the request body to get the Json.
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  res.json(await FileMetadata.find());
});

app.get("/:fileId", async (req, res) => {
  try {
    const file = await FileMetadata.findById(req.params.fileId);
    res.download(file.filepath, file.filename); // Error handling here?
  } catch (err) {
    res.json({ message: "file not found" });
  }
});

app.delete("/:fileId", async (req, res) => {
  try {
    // First see if the record of the file can be found in the db
    const file = await FileMetadata.findById(req.params.fileId);
  } catch {
    return res.status(500).json({ message: "file not found" });
  }
  try {
    // Then delete the actual file and the record.
    await fs.unlink(file.filepath);
    await FileMetadata.deleteOne({ _id: req.params.fileId });

    // In the real world, this should maybe have some sort of transaction control, because we're messing with coupled data in two different places.
    res.json({ message: "file deleted" });
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.file);
    const newFile = new FileMetadata({
      ...req.body,
      filepath: req.file.path,
    });
    let data = await newFile.save();
    res.json({ message: "file uploaded" });
  } catch (err) {
    FileSystem.delete(req.file.path); // TODO Do thing to delete the file.
    res.json({ message: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
