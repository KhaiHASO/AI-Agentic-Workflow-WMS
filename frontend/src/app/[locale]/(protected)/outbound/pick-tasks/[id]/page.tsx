"use client"

import { useParams } from "next/navigation";
import { PickingWorkbench } from "@/components/features/picking/picking-workbench";

export default function Page() {
  const { id } = useParams();
  
  return <PickingWorkbench taskId={id as string} />;
}
