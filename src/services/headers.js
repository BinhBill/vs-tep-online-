const accessToken = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user &&  user.accessToken)  {
      return {
        Authorization: `Bearer ${user.accessToken}`      
      } 
    }
    return {  
    }
}    
const accessTokenBearer = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user &&  user.accessToken)  {
    return `Bearer ${user.accessToken}`     
    
  }
  return {  
  }
}  

  const refreshToken = () => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.refreshToken)  {
      return user.refreshToken
    }
    return ""
  }
  
  const firstName = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.firstName){
      return user.firstName
    }  
    return ""  
  }
  const lastName = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.lastName){
      return user.lastName
    }  
    return ""  
  }
  const email = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if(user && user.email){
      return user.email
    }  
    return ""  
  }
  export {
	  accessToken,
    accessTokenBearer,
    refreshToken,
    firstName,
    lastName,
    email
}  
  