import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ReturnsLayer from "../components/ReturnsLayer";

const ReturnsPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Quản Lý Hàng Trả (Reverse Logistics)" />
        <ReturnsLayer />
      </MasterLayout>
    </>
  );
};

export default ReturnsPage;
