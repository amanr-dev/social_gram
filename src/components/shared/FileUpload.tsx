import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadButton } from "@bytescale/upload-widget-react";
import { FileUploaderProps } from "@/types";

const FileUploader = ({ fileUrl, fieldChange }: FileUploaderProps) => {
  const [files, setFiles] = useState([]);
  console.log({ fileUrl, fieldChange });

  // ---------------------------
  // Configuration
  // See: https://www.bytescale.com/docs/upload-widget#configuration
  // ---------------------------
  const options = {
    apiKey: "free", // Get API keys from: www.bytescale.com
    maxFileCount: 1,
    styles: {
      colors: {
        primary: "#377dff",
      },
    },
  };

  // --------------------------
  // Create an upload button...
  // --------------------------

  const MyUploadButton = ({ setFiles }: any) => (
    <div className="w-full flex items-center p-4 border-primary-400 border-dashed border rounded-lg my-2 h-[250px] justify-center">
      <UploadButton options={options} onComplete={setFiles}>
        {({ onClick }) => (
          <button
            className="border border-dashed py-3 px-3 rounded-lg"
            onClick={onClick}
          >
            Upload a file...
          </button>
        )}
      </UploadButton>
    </div>
  );

  // -----------------------------
  // Display the uploaded files...
  // -----------------------------

  const MyUploadedFiles = ({ files }: any) =>
    files.map((file: any) => {
      // Save 'filePath' to your DB, and construct URLs using UrlBuilder:
      const { filePath, accountId } = file;
      // Build an image transformation URL for the uploaded file.
      // Remove 'options' to get the URL to the original file:
      const fileUrl = UrlBuilder.url({
        filePath,
        accountId,
        // options: {
        //   transformation: "preset",
        //   transformationPreset: "thumbnail",
        // },
      });
      return (
        <div key={accountId}>
          <img src={fileUrl} alt="Image" />
          <p key={fileUrl}>
            <a href={fileUrl} target="_blank">
              {fileUrl}
            </a>
          </p>
        </div>
      );
    });

  // ----------------------
  // Run the application...
  // ----------------------

  return (
    <>
      {files.length ? (
        <MyUploadedFiles files={files} />
      ) : (
        <MyUploadButton setFiles={setFiles} />
      )}
      <a
        className="developed_by"
        href="https://www.bytescale.com/docs/upload-widget/react"
        target="_blank"
      >
        Powered by Bytescale
      </a>
    </>
  );
};

export default FileUploader;
