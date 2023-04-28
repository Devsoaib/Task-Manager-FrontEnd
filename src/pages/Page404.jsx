import React, { Suspense, lazy } from "react";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const NotFound = lazy(() => import("../components/NotFound/NotFound"));

function Page404() {
  return (
    <div>
      <Suspense fallback={<LazyLoader />}>
        <NotFound></NotFound>
      </Suspense>
    </div>
  );
}

export default Page404;
