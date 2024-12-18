import { manualLogout, refreshTokens } from "./refreshTokens"

export const apiClient = async(url, options ={}) => {
  let token = localStorage.getItem('access_token')

  const headers = {
    ...(options.body instanceof FormData ? {}: {'Content-Type': 'application/json'}),
    ...(token && {'Authorization': 'Bearer ' + token}),
    Accept: 'application/json'
  }

  try {
    let response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
      headers,
      ...options
    })

        const loginUrl = response.url.includes('/login')
        if (response.status === 401 && !loginUrl) {  
            try {
              await refreshTokens()

              token = localStorage.getItem('access_token')
              headers.Authorization = `Bearer ${token}`

               response = await fetch(`${process.env.REACT_APP_BASE_URL}${url}`, {
                headers,
                ...options
              })
            } catch {
              manualLogout()
            }
        }

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Failed to fetch')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw error
  }
}

