export const apiClient = async (url, options = {}) => {
  
    const token = localStorage.getItem('access_token')
  
    const headers = {
      ...(options.body instanceof FormData?  {}: {'Content-Type': 'application/json'}),
      'Accept': 'application/json',
      ...(token && {'Authorization': 'Bearer ' + token}) 
    }
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
        headers,
        ...options
      })
    
      const data = await response.json()
  
      if (!response.ok) {
        throw new Error(data.message || 'Request failed')
      }
  
      return data
  
    } catch (error) {
      console.error(error)
      throw error
    }
  }