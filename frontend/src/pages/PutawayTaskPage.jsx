import React from "react";
import MasterLayout from "../masterLayout/MasterLayout";
import Breadcrumb from "../components/Breadcrumb";
import PutawayTaskLayer from "../components/PutawayTaskLayer";

const PutawayTaskPage = () => {
  return (
    <>
      <MasterLayout>
        <Breadcrumb title="Nhiệm Vụ Cất Hàng (Putaway)" />
        <PutawayTaskLayer />
      </MasterLayout>
    </>
  );
};

export default PutawayTaskPage;
