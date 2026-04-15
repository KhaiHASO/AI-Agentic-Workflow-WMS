import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ReportsLayer from "../components/ReportsLayer";

const ReportsPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Báo Cáo Phân Tích & KPIs Kho" />
        <ReportsLayer />
      </MasterLayout>
    </>
  );
};

export default ReportsPage;
