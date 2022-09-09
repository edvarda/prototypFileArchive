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
// I don't think we need this?
// app.use(express.urlencoded({ extended: true }));

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

app.delete("/:fileId", (req, res) => {
  try {
    res.json({ message: "deleted file" });
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
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
