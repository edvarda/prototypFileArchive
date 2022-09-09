import { React } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";

const Archive = ({ files, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Filename</td>
          <td>Uploader</td>
          <td>Type</td>
          <td>Description</td>
          <td>Upload date</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.filename + file.date}>
            <td>
              {/** Probably don't just use filename here */}
              <a href={`http://localhost:3001/${file._id}`}>{file.filename}</a>
            </td>
            <td>{file.uploader}</td>
            <td>
              <FileIcon
                extension={file.filetype.split("/")[1]}
                {...defaultStyles[file.filetype.split("/")[1]]}
              />
            </td>
            <td>{file.description}</td>
            <td>{new Date(file.date).toLocaleDateString()}</td>
            <td>
              <button
                className="button delete-button"
                onClick={() => handleDelete(file._id)}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Archive;
