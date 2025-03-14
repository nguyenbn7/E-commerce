"use client";

import Heading from "@/components/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { settingsSchema, SettingsSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface SettingsFormProps {
  initialData: Store;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [open, setOpen] = useState(false);
  
  const form = useForm<SettingsSchema>({
    resolver: zodResolver(settingsSchema),
    defaultValues: initialData,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />

        <Button variant="destructive" size="sm" onClick={() => {}}>
          <Trash size={16} />
        </Button>
      </div>

      <Separator />
    </>
  );
}
