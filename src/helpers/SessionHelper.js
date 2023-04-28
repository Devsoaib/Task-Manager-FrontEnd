

class SessionHelper {
    setToken(token){
        localStorage.setItem("token",token)
    }
    getToken(){
        return localStorage.getItem("token")
    }

    setUserDetails(userDetails){
        localStorage.setItem("userDetails",JSON.stringify(userDetails))
    }
    getUserDetails(){
        return JSON.parse(localStorage.getItem("userDetails"))
    }

    setEmail(Email){
        localStorage.setItem("Email",Email)
    }
    getEmail(){
        return localStorage.getItem("Email")
    }

    setOTP(OTP){
        localStorage.setItem("OTP",OTP)
    }
    getOTP(){
        return localStorage.getItem("OTP")
    }

    clearSession(){
        localStorage.clear()
        window.location.href = "/login"
    }
}

export const {setToken, getToken, setUserDetails, getUserDetails, clearSession,setEmail,setOTP, getEmail, getOTP } = new SessionHelper()