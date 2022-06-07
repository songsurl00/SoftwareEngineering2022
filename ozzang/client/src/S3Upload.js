import "./App.css";
import { useState } from "react";
import AWS from "aws-sdk";
import { Row, Col, Button, Input, Alert } from "reactstrap";

function S3Upload() {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ACCESS_KEY = "AKIA55EKUBPTX7UYQL7Y";
  const SECRET_ACCESS_KEY = "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";
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "ozzang-upload-bucket";

  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });

  const FileInputHandler = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  return (
    <div>
      <input type="file" onChange={FileInputHandler} />
    </div>
  );
}

export default S3Upload;
