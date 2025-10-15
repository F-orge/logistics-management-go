import { oc } from "@orpc/contract";
import { RouteRepository } from "@packages/db/repositories/tms";
import { RouteSchema } from "@packages/db/schemas/tms/route";
import { DeleteResult } from "kysely";
import z from "zod";

export const PaginateRouteContract = oc.input(RouteRepository.schemas.paginateOptionSchema).output(RouteSchema.array());

export const RangeRouteContract = oc.input(RouteRepository.schemas.rangeOptionSchema).output(RouteSchema.array());

export const AnyRouteContract = oc.input(z.uuid().array()).output(RouteSchema.array());

export const InsertRouteContract = oc.input(RouteRepository.schemas.InsertSchema).output(RouteSchema);

export const InsertManyRouteContract = oc.input(RouteRepository.schemas.InsertSchema.array()).output(RouteSchema.array());

export const UpdateRouteContract = oc.input(z.object({id: z.uuid(), value: RouteRepository.schemas.UpdateSchema})).output(RouteSchema);

export const RemoveRouteContract = oc.input(z.uuid()).output(z.instanceof(DeleteResult).refine((arg) => arg.numDeletedRows.toString()));
