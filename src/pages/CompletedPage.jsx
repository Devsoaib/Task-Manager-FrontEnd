import React, { Suspense, lazy } from "react";
import LazyLoader from "../components/MasterLayout/LazyLoader";
import MasterLayout from "../components/MasterLayout/MasterLayout";
const Completed = lazy(() => import("../components/Completed/Completed"));

function CompletedPage() {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Completed></Completed>
        </Suspense>
      </MasterLayout>
    </>
  );
}

export default CompletedPage;
