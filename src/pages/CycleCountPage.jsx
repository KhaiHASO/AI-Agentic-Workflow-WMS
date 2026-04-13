import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import CycleCountLayer from "../components/CycleCountLayer";

const CycleCountPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Kiểm Kê Định Kỳ (Cycle Count)" />
        <CycleCountLayer />
      </MasterLayout>
    </>
  );
};

export default CycleCountPage;
