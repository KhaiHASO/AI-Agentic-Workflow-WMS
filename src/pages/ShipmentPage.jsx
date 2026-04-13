import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import ShipmentLayer from "../components/ShipmentLayer";

const ShipmentPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Xác Nhận Giao Hàng (Shipment)" />
        <ShipmentLayer />
      </MasterLayout>
    </>
  );
};

export default ShipmentPage;
