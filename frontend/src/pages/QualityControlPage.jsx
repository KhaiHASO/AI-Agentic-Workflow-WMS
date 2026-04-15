import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import QualityControlLayer from "../components/QualityControlLayer";

const QualityControlPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Kiểm Tra Chất Lượng (QC)" />
        <QualityControlLayer />
      </MasterLayout>
    </>
  );
};

export default QualityControlPage;
