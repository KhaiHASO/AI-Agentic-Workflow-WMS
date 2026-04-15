import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import OnHandLayer from "../components/OnHandLayer";

const InventoryPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Quản Lý Tồn Kho (Inventory)" />
        <OnHandLayer />
      </MasterLayout>
    </>
  );
};

export default InventoryPage;
