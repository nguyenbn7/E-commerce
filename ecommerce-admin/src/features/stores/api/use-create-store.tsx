import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type Response = InferResponseType<(typeof client.api.stores)["$post"]>;
type Request = InferRequestType<(typeof client.api.stores)["$post"]>["json"];

export default function useCreateStore() {
  const mutation = useMutation<Response, Error, Request>({
    mutationFn: async (json) => {
      const response = await client.api.stores.$post({ json });
      return response.json();
    },
    onError: () => {
      toast.error("Something went wrong.");
    },
    onSuccess: () => {
      toast.success("Store created.");
    },
  });

  return mutation;
}
