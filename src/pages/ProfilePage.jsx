import React, { Suspense, lazy } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
const Profile = lazy(() => import("../components/Profile/Profile"));

function ProfilePage() {
  return (
    <>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <Profile></Profile>
        </Suspense>
      </MasterLayout>
    </>
  );
}

export default ProfilePage;
