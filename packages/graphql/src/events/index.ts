import { PubSub } from "graphql-subscriptions";
import { CrmEvents } from "./crm";
import { BillingEvents } from "./billing";
import { DmsEvents } from "./dms";
import { TmsEvents } from "./tms";
import { WmsEvents } from "./wms";

export type Events = CrmEvents &
  BillingEvents &
  DmsEvents &
  TmsEvents &
  WmsEvents;

export const pubsub = new PubSub<Events>();

export * from "./crm";
