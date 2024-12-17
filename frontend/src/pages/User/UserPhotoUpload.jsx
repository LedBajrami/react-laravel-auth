import { Button, Upload } from "antd"
import { useDispatch } from "react-redux"
import { uploadProfilePhoto } from "../../services/redux/slices/user/userThunks"

function UserPhotoUpload() {
  const dispatch = useDispatch()

  const handleUpload = (file) => {
    try {
      dispatch(uploadProfilePhoto(file))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Upload beforeUpload={handleUpload} name="profile_photo" showUploadList={false}>
      <Button>Upload Profile Photo</Button>
    </Upload>
  )
}

export default UserPhotoUpload
