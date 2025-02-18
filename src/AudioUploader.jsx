import React, { useState } from 'react';
import axios from 'axios';

const AudioUploader = () => {
    const [file, setFile] = useState(null);
    const [transcription, setTranscription] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            console.error("No file selected.");
            return;
        }

        const formData = new FormData();
        formData.append('audioFile', file);

        try {
            const response = await axios.post('http://localhost:8080/api/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setTranscription(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error while transcribing audio: ", error);
        }
    };

    return (
        <div className="audio-uploader-container">
            {/* Centered Title */}
            <h1 className="title">Audio To Text Transcriber</h1>

            {/* Profile Picture (DP) Section */}
            <div className="profile-section">
                <img src="../src/images/logo.jpg" alt="Profile" className="profile-pic" />
            </div>

            {/* File Upload & Transcription Section */}
            <div className="content-section">
                <div className="file-input-container">
                    <input type="file" accept="audio/*" onChange={handleFileChange} className="file-input" />
                </div>

                <button className="upload-button" onClick={handleUpload}>Upload And Transcribe</button>

                <div className="transcript-result">
                    <h2 className="result-title">Transcript Result</h2>
                    <p className="result-text">{transcription || "Transcript will appear here..."}</p>
                </div>
            </div>
        </div>
    );
};

export default AudioUploader;
