"use client";

import { setupSchema, type SetupSchema } from "../schemas";
import Modal from "@/components/modal";
import { useStoreModal } from "../hooks/use-store-modal";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCreateStore from "../api/use-create-store";
import { Loader } from "lucide-react";

export default function StoreModal() {
  const storeModal = useStoreModal();

  const form = useForm<SetupSchema>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate, isPending } = useCreateStore();

  const onSubmit: SubmitHandler<SetupSchema> = async (values, $event) => {
    mutate(values);
  };

  return (
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="py-2 pb-4">
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="E-commerce"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                type="button"
                variant="outline"
                onClick={storeModal.onClose}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                Continue{" "}
                {isPending && (
                  <Loader
                    size={16}
                    className="animate-spin ml-1 text-primary-foreground"
                  />
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
}
