import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import SalesOrdersLayer from "../components/SalesOrdersLayer";

const SalesOrdersPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Đơn Hàng Xuất (Sales Orders)" />
        <SalesOrdersLayer />
      </MasterLayout>
    </>
  );
};

export default SalesOrdersPage;
