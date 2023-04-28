import axios from "axios"
import { ErrorToast, SuccessToast } from "../helpers/FormHelper"
import { getToken, setEmail, setOTP, setToken, setUserDetails } from "../helpers/SessionHelper"
import { SetProfile } from "../redux/state-slice/profileSlice"
import { HideLoader, ShowLoader } from "../redux/state-slice/settingsSlice"
import { SetSummary } from "../redux/state-slice/summarySlice"
import { SetCanceledTask, SetCompletedTask, SetNewTask, SetProgressTask } from "../redux/state-slice/taskSlice"
import store from "../redux/store/store"
const AxiosHeader={headers:{"authorization":getToken()}}

const baseURL = 'http://localhost:5050/api/v1'


export const RegistrationRequest = async (email, firstName, lastName, mobile, password) => {
    
    const URL = `${baseURL}/register`
    const postBody = {email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password}

    return axios.post(URL,postBody).then((res)=>{
        if(res.status===200){
            SuccessToast("Registration Success")
            return true;
        }
        else{
            ErrorToast(res?.error)
            return  false;
        }
    }).catch((err)=>{
        ErrorToast(err.message)
        return false;
    })
}


export const LoginRequest = (email, pass)=> {
    
    store.dispatch(ShowLoader())
    let URL = baseURL+"/login";
    let PostBody ={"email":email,"password":pass}

    return axios.post(URL, PostBody).then((res)=> {
        store.dispatch(HideLoader())
        if(res.status===200){
            console.log("=====>",res);
            setToken(res.data);
            setUserDetails(res.data);
            SuccessToast("Login Success")
            return true;
        }
        else{
            ErrorToast("Invalid Email or Password")
            return  false;
        }
    }).catch((err)=> {
        console.log(err);
        ErrorToast("Invalid Email or Password")
        store.dispatch(HideLoader())
        return false;
    })
}


export function NewTaskRequest(title,description){

    store.dispatch(ShowLoader())

    let URL=baseURL+"/createTask";
    let PostBody={"title":title,"description":description,status:"New"}

    return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("New Task Created")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }

    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    })
}


export function TaskListByStatus(Status){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/listTaskByStatus/"+Status;
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(Status==="New"){
                store.dispatch(SetNewTask(res.data['data']))
            }
            else if(Status==="Completed"){
                store.dispatch(SetCompletedTask(res.data['data']))
            }
            else if(Status==="Canceled"){
                store.dispatch(SetCanceledTask(res.data['data']))
            }
            else if(Status==="Progress"){
               
                store.dispatch(SetProgressTask(res.data['data']))
            }
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        console.log(err);
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}



export function SummaryRequest(){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/taskStatusCount";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetSummary(res.data['data']))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}


export function DeleteRequest(id){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/deleteTask/"+id;
    return axios.delete(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Delete Successful")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        console.log(err)
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

export function UpdateStatusRequest(id,status){
    store.dispatch(ShowLoader())
    let URL=`${baseURL}/updateTaskStatus/${id}/${status}`;
    return axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            SuccessToast("Status Updated")
            return true;
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        console.log(err);
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

export function GetProfileDetails(){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/profileDetails";
    axios.get(URL,AxiosHeader).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            store.dispatch(SetProfile(res.data['data'][0]))
        }
        else{
            ErrorToast("Something Went Wrong")
        }
    }).catch((err)=>{
        console.log(err);
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
    });
}


// export function ProfileUpdateRequest(email,firstName,lastName,mobile,password,photo){

//     store.dispatch(ShowLoader())

//     let URL=baseURL+"/updateProfile";

//     let PostBody={email:email,firstName:firstName,lastName:lastName,mobile:mobile,password:password,photo:photo}
//     let UserDetails={email:email,firstName:firstName,lastName:lastName,mobile:mobile,photo:photo}

//     return axios.post(URL,PostBody,AxiosHeader).then((res)=>{
//         store.dispatch(HideLoader())
//         if(res.status===200){

//             SuccessToast("Profile Update Success")
//             setUserDetails(UserDetails)

//             return true;
//         }
//         else{
//             ErrorToast("Something Went Wrong")
//             return  false;
//         }
//     }).catch((err)=>{
//         console.log(err);
//         ErrorToast("Something Went Wrong")
//         store.dispatch(HideLoader())
//         return false;
//     });
// }


// Recover Password Step 01 Send OTP
export function RecoverVerifyEmailRequest(email){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/RecoverVerifyEmail/"+email;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast("No user found");
                return false;
            }
            else{
                setEmail(email)
                SuccessToast("A 6 Digit verification code has been sent to your email address. ");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong");
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}


// Recover Password Step 02 Verify OTP
export function RecoverVerifyOTPRequest(email,OTP){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/RecoverVerifyOTP/"+email+"/"+OTP;
    return axios.get(URL).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){
            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("Code Verification Success");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}

// Recover Password Step 03 Reset Pass
export function RecoverResetPassRequest(email,OTP,password){
    store.dispatch(ShowLoader())
    let URL=baseURL+"/RecoverResetPass";
    let PostBody={email:email,OTP:OTP,password:password}

    return axios.post(URL,PostBody).then((res)=>{
        store.dispatch(HideLoader())
        if(res.status===200){

            if(res.data['status']==="fail"){
                ErrorToast(res.data['data']);
                return false;
            }
            else{
                setOTP(OTP)
                SuccessToast("NEW PASSWORD CREATED");
                return true;
            }
        }
        else{
            ErrorToast("Something Went Wrong")
            return false;
        }
    }).catch((err)=>{
        ErrorToast("Something Went Wrong")
        store.dispatch(HideLoader())
        return false;
    });
}