import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import WarehouseLayoutLayer from "../components/WarehouseLayoutLayer";

const WarehouseLayoutPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Sơ Đồ Vị Trí & Trạng Thái Bin" />
        <WarehouseLayoutLayer />
      </MasterLayout>
    </>
  );
};

export default WarehouseLayoutPage;
