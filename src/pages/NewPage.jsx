import React, { Fragment, Suspense, lazy } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const New = lazy(() => import("../components/New/New"));

function NewPage() {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <New></New>
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
}

export default NewPage;
