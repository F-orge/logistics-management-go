import z from "zod";

export const Coordinates = z.object({ lon: z.number(), lat: z.number() });
