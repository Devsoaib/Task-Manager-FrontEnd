import React, { Suspense, lazy } from "react";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Login = lazy(() => import("../components/Login/Login"));

function LoginPage() {
  return (
    <>
      <Suspense fallback={<LazyLoader />}>
        <Login></Login>
      </Suspense>
    </>
  );
}

export default LoginPage;
