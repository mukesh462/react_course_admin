import React, { useEffect, useState } from "react"
import { FilePond, registerPlugin } from "react-filepond"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"

// Register the plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType)

export default function FileUpload({ files, setFiles, many = false }) {
  const [pondFiles, setPondFiles] = useState([])

  useEffect(() => {
    // Convert files to FilePond format when component mounts or files prop changes
    const convertedFiles = Array.isArray(files) ? files : [files]
    const newPondFiles = convertedFiles.map(file => {
      if (file instanceof File) {
        return {
          source: file,
          options: { type: 'local' }
        }
      } else if (typeof file === 'string') {
        return {
          source: file,
          options: { type: 'local' }
        }
      } else if (file && file.source) {
        return file
      }
      return null
    }).filter(Boolean)
    setPondFiles(newPondFiles)
  }, [files])

  const handleUpdateFiles = (fileItems) => {
    // Extract the actual files from the fileItems
    const updatedFiles = fileItems.map((fileItem) => {
      if (fileItem.file instanceof File) {
        return fileItem.file
      } else if (fileItem.source) {
        return fileItem.source
      }
      return null
    }).filter(Boolean)
    
    if (many) {
      setFiles(updatedFiles)
    } else {
      setFiles(updatedFiles.length > 0 ? updatedFiles[0] : null)
    }
  }

  return (
    <div>
      <FilePond
        files={pondFiles}
        allowMultiple={many}
        onupdatefiles={handleUpdateFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        server={{
          load: (source, load) => {
            const imageUrl = source.startsWith(process.env.REACT_APP_IMAGE) 
      ? source 
      : `${process.env.REACT_APP_IMAGE}${source}`;
            fetch(imageUrl)
              .then((res) => res.blob())
              .then((blob) => {
                load(blob);
              })
              .catch((error) => {
                console.error("Error loading image:", error);
                load(null);
              });
          },
        }}
        acceptedFileTypes={['image/*']}
      />
    </div>
  )
}