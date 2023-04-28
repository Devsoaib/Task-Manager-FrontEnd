import React, { Suspense, lazy } from "react";
import LazyLoader from "../components/MasterLayout/LazyLoader";
import MasterLayout from "../components/MasterLayout/MasterLayout";
const DashBoard = lazy(() => import("../components/DashBoard/DashBoard"));

function Dashboard() {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <DashBoard></DashBoard>
        </Suspense>
      </MasterLayout>
    </>
  );
}

export default Dashboard;
