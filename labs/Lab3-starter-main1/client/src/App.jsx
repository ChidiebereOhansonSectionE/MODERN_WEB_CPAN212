import { useState } from "react";
import "./App.css"; // Import the CSS file

const App = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);
  const [displayImages, setDisplayImages] = useState([]);
  const [displayDogImage, setDisplayDogImage] = useState(null);
  const [message, setMessage] = useState("");

  const fetchDogImage = async () => {
    try {
      const response = await fetch(`https://dog.ceo/api/breeds/image/random`);
      const data = await response.json();
      setDisplayDogImage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const submitDogImage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(displayDogImage);
      const data = await response.blob();
      const formData = new FormData();
      formData.append("file", data, "dogo.jpg");

      const uploadFile = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });

      const responseData = await uploadFile.json();
      setMessage(responseData.message);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMultipleImages = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/multiple`);
      const data = await response.json();
      // Now fetch the actual images
      const filesPromises = data.map(async (filename) => {
        const fetchFile = await fetch(
          `http://localhost:8000/fetch/file/${filename}`
        );
        const fileBlob = await fetchFile.blob();
        const imageUrl = URL.createObjectURL(fileBlob);
        return imageUrl;
      });
      const imageUrls = await Promise.all(filesPromises);
      setDisplayImages(imageUrls);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSingleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSingleFile(e.target.files[0]);
    }
  };

  const fetchSingleFile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/fetch/single`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setDisplayImage(imageUrl);
    } catch (error) {
      console.error("Error fetching single file:", error);
    }
  };

  const handleSubmitSingleFile = async (e) => {
    e.preventDefault();
    if (!singleFile) {
      setMessage("Please select a file before uploading.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", singleFile);
      const response = await fetch(`http://localhost:8000/save/single`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Image upload failed");
      }
      setMessage("File uploaded successfully!");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="header">Modern Web Technologies Lab</h1>
      {message && <p className="message">{message}</p>}

      <div className="section">
        <h2>Fetch Single Random Image</h2>
        <button className="button" onClick={fetchSingleFile}>
          Fetch Single File
        </button>
        {displayImage && (
          <div className="image-container">
            <img src={displayImage} alt="Display" />
          </div>
        )}
      </div>

      <div className="section">
        <h2>Upload Single File</h2>
        <form onSubmit={handleSubmitSingleFile} className="upload-form">
          <input type="file" onChange={handleSingleFileChange} />
          <button className="button" type="submit">
            Upload Single File
          </button>
        </form>
      </div>

      <div className="section">
        <h2>Fetch Multiple Images</h2>
        <button className="button" onClick={fetchMultipleImages}>
          Fetch Multiple Images
        </button>
        {displayImages.length > 0 ? (
          <div className="image-container">
            {displayImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Image ${index}`} />
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center" }}>No images to display yet</p>
        )}
      </div>

      <div className="section">
        <h2>Random Dog Image</h2>
        <button className="button" onClick={fetchDogImage}>
          Get the Dogo
        </button>
        {displayDogImage && (
          <div className="image-container" style={{ flexDirection: "column" }}>
            <img src={displayDogImage} alt="Random Dog" style={{ width: "300px" }} />
            <button className="button" onClick={submitDogImage}>
              Submit to Server
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;