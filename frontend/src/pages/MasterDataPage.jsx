import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import MasterDataLayer from "../components/MasterDataLayer";

const MasterDataPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Danh Mục Hàng Hóa & Đối Tác" />
        <MasterDataLayer />
      </MasterLayout>
    </>
  );
};

export default MasterDataPage;
