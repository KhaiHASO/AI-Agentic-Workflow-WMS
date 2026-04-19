"use client"

import { ShipmentPacking } from "@/components/features/shipment/shipment-packing";
import { useParams } from "next/navigation";

export default function ShipmentPackingPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="space-y-6">
      <ShipmentPacking />
    </div>
  );
}
