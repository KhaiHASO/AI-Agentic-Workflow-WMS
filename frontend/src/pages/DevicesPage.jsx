import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import DevicesLayer from "../components/DevicesLayer";

const DevicesPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Quản Lý Thiết Bị Scanner & Mobile" />
        <DevicesLayer />
      </MasterLayout>
    </>
  );
};

export default DevicesPage;
