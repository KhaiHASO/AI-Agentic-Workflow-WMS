import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import HandlingUnitLayer from "../components/HandlingUnitLayer";

const HandlingUnitPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Quản Lý Pallet (HU)" />
        <HandlingUnitLayer />
      </MasterLayout>
    </>
  );
};

export default HandlingUnitPage;
