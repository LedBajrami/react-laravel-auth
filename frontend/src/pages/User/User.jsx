import { useEffect } from "react"
import UserPhotoUpload from "./UserPhotoUpload"
import { fetchUser } from "../../services/redux/slices/user/userThunks"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../services/redux/slices/auth/authThunks"
import { Button } from "antd"
import { useTranslation } from "react-i18next"
import profilePicture from "../../assets/images/default_profile_photo.png"
import '../../assets/styles/styles.css'

function User() {
  const { t } = useTranslation();
  const {name, email, profilePhoto} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])


  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <div>
      <h2>User Dashboard</h2>
      <div className='user-info-container'>
      <div style={{width: "50%"}}>
          {profilePhoto ? (
            <img src={`${process.env.REACT_APP_BASE_URL}${profilePhoto}`} className="profile-picture" alt="Profile" />
          ) : (
            <img src={profilePicture} className="profile-picture" alt="No profile picture"/>
            
         )}
       </div>
       <div style={{paddingLeft: "20px"}}>
        <div><strong>{t("user.name")}</strong> {name}</div>
        <div><strong>Email:</strong> {email}</div>
       </div>
      </div>

      <UserPhotoUpload />
      <Button onClick={handleLogout}>{t('login.logout')}</Button>
    </div>
  )
}

export default User