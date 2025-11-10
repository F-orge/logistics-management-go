import React from "react";
import z from "zod";
import { fieldConfigFactory } from "@/components/ui/autoform";

export const CompanySchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .check(
      fieldConfigFactory<"boolean">()({
        fieldType: "boolean",
      })
    ),
});
