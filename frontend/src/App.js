import "./App.css";
import { React, useEffect, useState } from "react";
import Archive from "./Archive";
import UploadForm from "./UploadForm";

const App = () => {
  const [data, setData] = useState();
  const [shouldRefetch, setShouldRefetch] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setShouldRefetch(false);
      });
  }, [shouldRefetch]);

  const handleDelete = (fileId) => {
    if (window.confirm("Do you really want to delete this file?")) {
      fetch("http://localhost:3001/" + fileId, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setShouldRefetch(true);
        });
    }
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
    })
      .then((res) => {
        console.log(res);
        setShouldRefetch(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="AppContainer">
      <h1>File Archive</h1>
      <div className="archive">
        {!data ? (
          "Loading archive..."
        ) : (
          <Archive handleDelete={handleDelete} files={data} />
        )}
      </div>
      <div className="uploadFormContainer">
        {!showUploadForm ? (
          <button
            className="button open-form-button"
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
