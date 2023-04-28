import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import FullscreenLoader from "./components/MasterLayout/FullScreenLoader";
import { getToken } from "./helpers/SessionHelper";
import CreatePasswordPage from "./pages/AccountRecover/CreatePassPage";
import SendOTPPage from "./pages/AccountRecover/SendOTPPage";
import VerifyOTPPage from "./pages/AccountRecover/VerifyOTPPage";
import CancelledPage from "./pages/CancelledPage";
import CompletedPage from "./pages/CompletedPage";
import CreatePage from "./pages/CreatePage";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import NewPage from "./pages/NewPage";
import Page404 from "./pages/Page404";
import ProfilePage from "./pages/ProfilePage";
import ProgressPage from "./pages/ProgressPage";
import RegistrationPage from "./pages/RegistrationPage";

function App() {

if (getToken()) {
  return (
    <Fragment>
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Dashboard></Dashboard>}></Route>
            <Route path="/create" element={<CreatePage></CreatePage>}></Route>
            <Route path="/new" element={<NewPage></NewPage>}></Route>
            <Route path="/progress" element={<ProgressPage></ProgressPage>}></Route>
                <Route path="/completed" element={<CompletedPage></CompletedPage>}></Route>
                <Route path="/canceled" element={<CancelledPage></CancelledPage>}></Route>
                <Route path="/profile" element={<ProfilePage></ProfilePage>}></Route>


                <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
      />
    </Fragment>
);

}else{

  return (
    <Fragment>
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />}></Route>
              <Route path="/login" element={<LoginPage></LoginPage>}></Route>
              <Route  path="/register" element={<RegistrationPage></RegistrationPage>}></Route>

              <Route path="/sendOTP" element= {<SendOTPPage></SendOTPPage>}></Route>
              <Route path="/VerifyOTP" element= {<VerifyOTPPage></VerifyOTPPage>}></Route>
              <Route path="/createPassword" element= {<CreatePasswordPage></CreatePasswordPage>}></Route>

              <Route path="*" element={<Page404/>}/>
            </Routes>
        </BrowserRouter>
        <FullscreenLoader/>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
      />
    </Fragment>
);


}


}
export default App;
