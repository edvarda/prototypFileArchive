import "./App.css";
import { React, useEffect, useState } from "react";
import Archive from "./Archive";
import UploadForm from "./UploadForm";

const App = () => {
  const [data, setData] = useState();
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const handleDelete = (filename) => {
    fetch("http://localhost:3001/" + filename, {
      method: "DELETE",
    })
      .then((res) => res.json()) // or res.json()
      .then((res) => console.log(res));
  };

  const handleUpload = (formEntry) => {
    const formData = new FormData();
    formData.append("file", formEntry.file[0]);
    formData.append("filename", formEntry.filename);
    formData.append("uploader", formEntry.uploader);
    formData.append("description", formEntry.description);

    fetch("http://localhost:3001/upload", {
      method: "POST",
      body: formData,
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="AppContainer">
      <div className="Archive">
        {!data ? (
          "Loading archive..."
        ) : (
          <Archive handleDelete={handleDelete} files={data} />
        )}
      </div>
      <div className="UploadForm">
        {!showUploadForm ? (
          <button
            onClick={() => {
              setShowUploadForm(true);
            }}
          >
            Upload file
          </button>
        ) : (
          <UploadForm
            handleUpload={handleUpload}
            setShowUploadForm={setShowUploadForm}
          />
        )}
      </div>
    </div>
  );
};

export default App;
