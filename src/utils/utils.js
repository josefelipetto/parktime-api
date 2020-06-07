export const getToken = () => {
  try {
    return JSON.parse(localStorage.getItem('@pktime') || {}).token
  } catch (error) {
    return null
  }
}

export const getAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('@pktime') || {}).auth
  } catch (error) {
    return null
  }
}