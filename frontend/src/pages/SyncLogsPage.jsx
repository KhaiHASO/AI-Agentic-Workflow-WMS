import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SyncLogsLayer from "../components/SyncLogsLayer";

const SyncLogsPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Lịch Sử Đồng Bộ ERP FAST" />
        <SyncLogsLayer />
      </MasterLayout>
    </>
  );
};

export default SyncLogsPage;
