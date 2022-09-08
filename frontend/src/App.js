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
          <UploadForm setShowUploadForm={setShowUploadForm} />
        )}
      </div>
    </div>
  );
};

export default App;
