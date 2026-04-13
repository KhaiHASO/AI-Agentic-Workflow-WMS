import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import WMSDashboardLayer from "../components/WMSDashboardLayer";

const HomePageOne = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Bảng Điều Khiển Tổng Quan (WMS)" />
        <WMSDashboardLayer />
      </MasterLayout>
    </>
  );
};

export default HomePageOne;
