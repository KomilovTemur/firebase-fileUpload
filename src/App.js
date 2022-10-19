import { storage } from "./firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "./App.css";
import { useState } from "react";

export default function App() {
  const contextEvent = (e) => e.preventDefault();
  const [progress, setProgress] = useState(0);
  const [link, setLink] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setLink(url));
      }
    );
  };

  return (
    <div className="container p-3">
      <div className="title mb-3">
        <h1>Firebase file upload!</h1>
        <h2>How to upload files to firebase ?</h2>
      </div>

      <div className="row">
        <div className="col-md-6 d-flex align-items-center justify-content-center flex-column">
          <form onSubmit={formHandler} className="d-flex">
            <input type="file" className="form-control" />
            <button className="btn btn-success ms-2 d-flex align-items-center">
              Submit <i className="fa-solid fa-cloud-arrow-up ms-2"></i>
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <div className="preview d-flex align-items-center justify-content-center flex-column">
            <h2>Uploaded {progress} % </h2>
            {link ? (
              <img
                onContextMenu={contextEvent}
                alt="Uploaded file"
                src={link}
                className="img-fluid"
              />
            ) : (
              <p>Please Upload image</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
