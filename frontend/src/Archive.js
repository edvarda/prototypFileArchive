import { React } from "react";

const Archive = ({ files, handleDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <td>Filename</td>
          <td>Uploader</td>
          <td>Type</td>
          <td>Description</td>
          <td>Date</td>
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
            <td>{file.type}</td>
            <td>{file.description}</td>
            <td>{file.date}</td>
            <td>
              <button onClick={() => handleDelete(file.filename)}>X</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Archive;
