"use client"

import { useParams } from "next/navigation";
import { CountWorkbench } from "@/components/features/counting/count-workbench";

export default function Page() {
  const { id } = useParams();
  
  return <CountWorkbench sessionId={id as string} />;
}
