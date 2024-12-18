import { Button, Upload } from "antd"
import { useDispatch } from "react-redux"
import { uploadProfilePhoto } from "../../services/redux/slices/user/userThunks"
import { useTranslation } from "react-i18next"

function UserPhotoUpload() {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleUpload = (file) => {
    try {
      dispatch(uploadProfilePhoto(file))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Upload beforeUpload={handleUpload} name="profile_photo" showUploadList={false}>
      <Button>{t('user.uploadPhoto')}</Button>
    </Upload>
  )
}

export default UserPhotoUpload
