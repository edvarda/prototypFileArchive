import { useForm } from "react-hook-form";

const UploadForm = ({ setShowUploadForm }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Select file:</label>
        <input type="file" {...register("file")} />
        <label>Uploader name:</label>
        <input type="text" {...register("uploaderName")} />
        <label>Filename:</label>
        <input type="text" {...register("fileName")} />
        <label>Description:</label>
        <input type="text" {...register("description")} />
        <input type="submit" />
      </form>
      <button onClick={() => setShowUploadForm(false)}>Close Form</button>
    </>
  );
};

export default UploadForm;
