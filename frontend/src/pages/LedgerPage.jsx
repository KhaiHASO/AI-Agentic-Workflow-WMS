import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import LedgerLayer from "../components/LedgerLayer";

const LedgerPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Sổ Cái (Inventory Ledger)" />
        <LedgerLayer />
      </MasterLayout>
    </>
  );
};

export default LedgerPage;
