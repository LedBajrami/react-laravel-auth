import { useEffect } from "react"
import UserPhotoUpload from "./UserPhotoUpload"
import { fetchUser } from "../../services/redux/slices/user/userThunks"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../services/redux/slices/auth/authThunks"
import { Button } from "antd"

function User() {
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
      <div className='user-info-container' style={{display: "flex", justifyContent: "start", alignItems: "center", marginBlock: "20px"}}>
      <div style={{width: "55%"}}>
          {profilePhoto ? (
            <img src={`${process.env.REACT_APP_BASE_URL}${profilePhoto}`} alt="Profile" style={{ width: '100%', borderRadius: "50%", aspectRatio: "1" }} />
          ) : (
            <p>No profile photo uploaded.</p>
         )}
       </div>
       <div style={{paddingLeft: "20px"}}>
        <div><strong>Name:</strong> {name}</div>
        <div><strong>Email:</strong> {email}</div>
       </div>
      </div>

      <UserPhotoUpload />
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default User