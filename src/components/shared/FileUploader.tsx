import { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { Button } from "../ui/button";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string | any;
  rounded?: boolean;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(convertFileToUrl(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".gif"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`flex flex-center flex-col bg-dark-1 rounded-xl cursor-pointer ${
        isDragActive
          ? "border-primary-400 border-dotted border-2 bg-dark-2"
          : ""
      }`}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {fileUrl ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <img src={fileUrl} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box ">
          <img
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file upload"
          />

          <h3 className="base-medium text-light-2 mb-2 mt-6">
            Drag image here
          </h3>
          <p className="text-light-4 small-regular mb-6">
            SVG, PNG, JPG and GIFs
          </p>

          <Button type="button" className="shad-button_dark_4">
            Click to select Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
