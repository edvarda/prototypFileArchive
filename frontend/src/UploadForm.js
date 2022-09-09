import { useEffect } from "react";
import { useForm } from "react-hook-form";

const UploadForm = ({ setShowUploadForm, handleUpload }) => {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("reset");
      reset({ file: null });
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <form className="uploadForm" onSubmit={handleSubmit(handleUpload)}>
        <h3>Upload File</h3>
        <div className="formgroup">
          <label>Select file (XML, JPEG or PDF allowed):</label>
          <input
            type="file"
            {...register("file", {
              required: true,
              onChange: (e) => {
                if (e.target.files[0].name)
                  setValue("filename", e.target.files[0].name);
              },
            })}
            accept="application/xml, text/xml, image/jpeg, application/pdf"
          />
        </div>
        {watch("file") && (
          <>
            <div className="formgroup">
              <label>Filename:</label>
              <input
                type="text"
                {...register("filename", { required: true })}
              />
            </div>
            <div className="formgroup">
              <label>Uploader name:</label>
              <input
                type="text"
                {...register("uploader", { required: true })}
              />
            </div>
            <div className="formgroup">
              <label>Description:</label>
              <input type="text" {...register("description")} />
            </div>
            <input
              className="button submit-button"
              type="submit"
              value="Upload file"
            />
          </>
        )}

        <button
          className="button close-form-button"
          onClick={() => setShowUploadForm(false)}
        >
          Close Form
        </button>
      </form>
    </>
  );
};

export default UploadForm;
