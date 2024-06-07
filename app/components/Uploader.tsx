import React from 'react'

export default function Uploader() {
  aync function upload() {
    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'YOUR_UPLOAD_PRESET_NAME');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload',
          formData
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
  }
  return (

    <div>Uploader</div>
  )
}

