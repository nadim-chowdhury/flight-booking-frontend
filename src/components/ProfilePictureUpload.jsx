"use client";

import { useState } from "react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useMutation } from "@apollo/client";
import { UPLOAD_PROFILE_PICTURE } from "../graphql/query";

export default function ProfilePictureUpload() {
  const [files, setFiles] = useState([]);
  const [uploadProfilePicture] = useMutation(UPLOAD_PROFILE_PICTURE);

  const handleDrop = async (acceptedFiles) => {
    setFiles(acceptedFiles);
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      await uploadProfilePicture({ variables: { file: acceptedFiles[0] } });
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <Dropzone onDrop={handleDrop} accept={IMAGE_MIME_TYPE} multiple={false}>
      {(status) => (
        <div>
          <p>Drag images here or click to select files</p>
        </div>
      )}
    </Dropzone>
  );
}
