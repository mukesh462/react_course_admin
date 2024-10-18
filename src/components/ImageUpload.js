import React, { useState, useEffect } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Register the image preview plugin
registerPlugin(FilePondPluginImagePreview);

const ImageUpload = (files,setFiles) => {


  // Function to fetch an image from a URL and create a File object
  const fetchImageAsFile = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], 'initial-image.jpg', { type: 'image/jpeg' });
    setFiles([file]); // Set the fetched file as the initial file
  };

  useEffect(() => {
    // Fetch the initial image when the component mounts
    // fetchImageAsFile('https://example.com/path/to/image.jpg'); // Replace with your image URL
  }, []);

  // This function will handle the file selection
  const handleFileChange = (fileItems) => {
    const fileObjects = fileItems.map(fileItem => fileItem.file);
    setFiles(fileObjects);
    console.log('Selected files:', fileObjects);
  };

  return (
    <div>
      <FilePond
        files={files}
        allowMultiple={false} // Allow only a single file
        onupdatefiles={handleFileChange} // Update files on selection
        acceptedFileTypes={['image/*']} // Accept only image files
        labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
      />

    </div>
  );
};

export default ImageUpload;
