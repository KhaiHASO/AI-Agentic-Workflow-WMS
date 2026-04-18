"use client"

import { Card, CardContent } from "@/components/ui/card";

interface KpiCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  variant?: "default" | "destructive" | "warning" | "success" | "info";
}

export const KpiCard = ({ title, value, description, icon, variant = "default" }: KpiCardProps) => {
  const variantStyles = {
    default: "text-primary bg-primary/10",
    destructive: "text-destructive bg-destructive/10",
    warning: "text-warning bg-warning/10",
    success: "text-success bg-success/10",
    info: "text-info bg-info/10",
  };

  const textStyles = {
    default: "text-primary",
    destructive: "text-destructive",
    warning: "text-warning",
    success: "text-success",
    info: "text-info",
  };

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardContent className="p-5 flex items-center gap-4">
        {icon && (
          <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl ${variantStyles[variant]}`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <div className="text-xs font-bold text-default-400 uppercase tracking-wider">{title}</div>
          <div className={`text-2xl font-black mt-1 ${textStyles[variant]}`}>{value}</div>
          {description && <div className="text-[10px] text-default-500 mt-0.5">{description}</div>}
        </div>
      </CardContent>
    </Card>
  );
};
