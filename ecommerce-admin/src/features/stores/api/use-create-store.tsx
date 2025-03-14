"use client";

import type { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type ResponseSuccess = InferResponseType<
  (typeof client.api.stores)["$post"],
  200
>;
type Response = InferResponseType<(typeof client.api.stores)["$post"]>;
type ResponseError = Extract<Response, { error: string }>;
type Request = InferRequestType<(typeof client.api.stores)["$post"]>["json"];

export default function useCreateStore() {
  const mutation = useMutation<ResponseSuccess, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.stores.$post({ json });

      if (!response.ok) {
        const body = (await response.json()) as ResponseError;

        throw new Error(body.error);
      }

      return response.json();
    },
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: async (data) => {
      const { data: store } = data;
      toast.success("Store created.");

      setTimeout(() => {
        window.location.assign(`/${store.id}`);
      }, 1000);
    },
  });

  return mutation;
}
