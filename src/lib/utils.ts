import { zodValidator } from "@tanstack/zod-adapter";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pocketbaseEnumOperators = z.enum([
  "=",
  "!=",
  ">",
  ">=",
  "<",
  "<=",
  "~",
  "!~",
]);

export function searchParams(
  fields: z.ZodEnum,
) {
  return z.object({
    page: z.number().nonnegative().default(1).catch(1),
    perPage: z.number().nonnegative().default(10).catch(10),
    insert: z.boolean().optional(),
    edit: z.boolean().optional(),
    delete: z.boolean().optional(),
    id: z.string().optional(),
    sort: z.array(
      z.object({ field: fields, order: z.enum(["-", "+"]) }),
    ).default([{ field: "created", order: "-" }])
      .optional(),
    filter: z.array(
      z.object({
        field: fields,
        operator: pocketbaseEnumOperators,
        value: z.any(),
      }),
    )
      .optional(),
  });
}

const test = searchParams(z.enum(["name"]));
