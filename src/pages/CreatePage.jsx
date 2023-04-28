import React, { Suspense, lazy } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Create = lazy(() => import("../components/Create/Create"));

function CreatePage() {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Create></Create>
        </Suspense>
      </MasterLayout>
    </>
  );
}

export default CreatePage;
