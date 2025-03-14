import { z } from "zod";

export const settingsSchema = z.object({
  name: z.string().min(1, "Required"),
});

export type SettingsSchema = z.infer<typeof settingsSchema>;
