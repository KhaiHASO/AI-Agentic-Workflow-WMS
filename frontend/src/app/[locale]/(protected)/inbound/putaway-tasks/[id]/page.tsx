"use client"

import { useParams } from "next/navigation";
import { PutawayWorkbench } from "@/components/features/putaway/putaway-workbench";

export default function Page() {
  const { id } = useParams();
  
  return <PutawayWorkbench taskId={id as string} />;
}
