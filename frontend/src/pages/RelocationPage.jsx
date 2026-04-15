import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import RelocationLayer from "../components/RelocationLayer";

const RelocationPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Điều Chuyển Nội Bộ" />
        <RelocationLayer />
      </MasterLayout>
    </>
  );
};

export default RelocationPage;
