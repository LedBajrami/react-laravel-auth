export const refreshTokens = async () => {
    const refreshToken = localStorage.getItem("refresh_token")
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/refresh`, {
        headers: {
          'Content-Type': 'application/json', Accept: 'application/json'
        },
        method: "POST",
        body: JSON.stringify({refresh_token: refreshToken})
      })
    
      
      if (!response.ok) {
        throw new Error("Failed to refresh tokens");
    } 
    
      
      const tokens = await response.json()
     
      localStorage.setItem('access_token', tokens.data.access_token)
      localStorage.setItem('refresh_token', tokens.data.refresh_token)
    } catch (error) {
      console.error('Error:', error.message);
      throw error
    }
}
  
export const manualLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/login'
}