import { useForm } from "react-hook-form";

const UploadForm = ({ setShowUploadForm, handleUpload }) => {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(handleUpload)}>
        <label>Select file:</label>
        <input type="file" {...register("file")} />
        <label>Filename:</label>
        <input type="text" {...register("filename")} />
        <label>Uploader name:</label>
        <input type="text" {...register("uploader")} />
        <label>Description:</label>
        <input type="text" {...register("description")} />
        <input type="submit" />
      </form>
      <button onClick={() => setShowUploadForm(false)}>Close Form</button>
    </>
  );
};

export default UploadForm;
