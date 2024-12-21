import { logoutUser } from "../services/redux/slices/auth/authThunks";

export const refreshTokens = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/refresh`, {
        headers: {
          'Content-Type': 'application/json', Accept: 'application/json'
        },
        method: "POST",
        credentials: "include"
      })
      
      if (!response.ok) {
        throw new Error("Failed to refresh tokens");
    } 
    
      const token = await response.json()
     
      localStorage.setItem('access_token', token.access_token)
    } catch (error) {
      console.error(' Error:', error.message);
      throw error
    }
}
  
export const manualLogout = async () => {
  try {
    await logoutUser()
  } catch (error) {
    console.error('Logout API failed:', error.message);
  }
    localStorage.removeItem('access_token')
    window.location.href = '/login'
}