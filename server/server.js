const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

const mocklist = [
  {
    filename: "testFileName",
    uploader: "uploader",
    description: "decr",
    filetype: "xml",
    date: Date.now(),
  },
  {
    filename: "pdfName",
    uploader: "uploader2",
    description: "decription",
    filetype: "pdf",
    date: Date.now(),
  },
];

app.get("/", (req, res) => {
  res.json(mocklist);
});

app.get("/testFileName", (req, res) => {
  res.download("uploads/mock.txt");
});

app.delete("/testFileName", (req, res) => {
  res.json({ message: "deleted file" });
});

app.post("/upload", (req, res) => {
  res.json({ message: "uploaded file" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
