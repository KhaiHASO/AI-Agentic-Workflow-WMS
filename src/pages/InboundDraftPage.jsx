import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import InboundDraftLayer from "../components/InboundDraftLayer";

const InboundDraftPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Nháp Nhận Hàng (Dynamic Inbound)" />
        <InboundDraftLayer />
      </MasterLayout>
    </>
  );
};

export default InboundDraftPage;
