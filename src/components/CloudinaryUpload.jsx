import { useState } from 'react'

const CloudinaryUpload = ({ onImageUpload }) => {
  const [uploading, setUploading] = useState(false)
  
  const CLOUD_NAME = 'your-cloud-name'
  const UPLOAD_PRESET = 'your-upload-preset'

  const uploadToCloudinary = async (file) => {
    setUploading(true)
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )
      
      const data = await response.json()
      onImageUpload(data.secure_url)
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      uploadToCloudinary(file)
    }
  }

  return (
    <div className="cloudinary-upload">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
        style={{ display: 'none' }}
        id="cloudinary-input"
      />
      <label 
        htmlFor="cloudinary-input" 
        className={`upload-btn ${uploading ? 'uploading' : ''}`}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </label>
    </div>
  )
}

export default CloudinaryUpload