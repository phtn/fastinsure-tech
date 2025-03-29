import { z } from "zod";

const ExampleValue = z.object({
  id: z.string(),
  name: z.string().min(2).max(100),
});

export const BaseData = z.object({
  key: z.string().min(10).max(42),
  path: z.literal("$"),
  ttl: z.number().min(0).max(172800).optional(),
});

export const ExampleResource = BaseData.merge(z.object({
  value: ExampleValue
}));
export type ExampleValueType = z.infer<typeof ExampleResource>;

export const ActivationValue = z.object({
  code: z.string().min(6).max(6),
  super: z.string().min(2).max(255),
  group: z.string().min(2).max(100),
  expiry: z.number().min(0).max(172800),
});
export const ActivationSetResource = BaseData.merge(z.object({
  value: ActivationValue
}));
export type ActivationSet = z.infer<typeof ActivationSetResource>;

export const ActivationGetResource = BaseData.merge(z.object({}));
export type ActivationGet = z.infer<typeof ActivationGetResource>;

export const ActivationDelResource = z.string().min(1);
export type ActivationDel = z.infer<typeof ActivationDelResource>;
