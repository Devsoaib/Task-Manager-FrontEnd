import React, { lazy, Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
const SendOTP = lazy(() => import("../../components/AccountRecover/SendOTP"));
const SendOTPPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <SendOTP></SendOTP>
    </Suspense>
  );
};

export default SendOTPPage;
