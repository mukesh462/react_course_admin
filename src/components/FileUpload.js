import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const FileUpload = ({files,setFiles}) => {
  return (
    <div>
      <FilePond
        files={files}
        allowMultiple={false}
        onupdatefiles={setFiles}
        acceptedFileTypes={['image/*', 'application/pdf', 'application/msword']}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        // server="/upload"
        server={false}
      />
    </div>
  );
};

export default FileUpload;
