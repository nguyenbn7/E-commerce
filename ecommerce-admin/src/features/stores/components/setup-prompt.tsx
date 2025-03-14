"use client";

import { useEffect } from "react";
import { useStoreModal } from "../hooks/use-store-modal";

export default function SetupPrompt() {
  const open = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) open();
  }, [isOpen, open]);

  return null;
}
