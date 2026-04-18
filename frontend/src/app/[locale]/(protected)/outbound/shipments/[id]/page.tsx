"use client"

import { useParams } from "next/navigation";
import { ShipmentPacking } from "@/components/features/shipment/shipment-packing";

export default function Page() {
  const { id } = useParams();
  
  return <ShipmentPacking shipmentId={id as string} />;
}
