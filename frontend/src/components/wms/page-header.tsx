"use client"

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  backButton?: boolean;
  actions?: {
    label: string;
    icon?: string;
    onClick: () => void;
    color?: "primary" | "secondary" | "success" | "info" | "warning" | "destructive";
    variant?: "default" | "outline" | "soft" | "ghost";
  }[];
}

export const PageHeader = ({ title, subtitle, backButton, actions }: PageHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        {backButton && (
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full h-10 w-10">
            <Icon icon="heroicons:arrow-left" className="h-5 w-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-default-900">{title}</h1>
          {subtitle && <p className="text-sm text-default-500 font-medium">{subtitle}</p>}
        </div>
      </div>

      {actions && (
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => (
            <Button 
              key={index}
              color={action.color || "primary"} 
              variant={action.variant || "default"}
              onClick={action.onClick}
              className="flex items-center gap-2 font-bold px-5"
            >
              {action.icon && <Icon icon={action.icon} className="h-5 w-5" />}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
