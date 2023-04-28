import React, { Suspense, lazy } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Canceled = lazy(() => import("../components/Canceled/Canceled"));

function CancelledPage() {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Canceled></Canceled>
        </Suspense>
      </MasterLayout>
    </>
  );
}

export default CancelledPage;
