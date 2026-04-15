import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import PickTaskLayer from "../components/PickTaskLayer";

const PickTaskPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Nhiệm Vụ Lấy Hàng (Picking)" />
        <PickTaskLayer />
      </MasterLayout>
    </>
  );
};

export default PickTaskPage;
