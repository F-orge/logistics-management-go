import { CrmEvents } from "./crm";
import { BillingEvents } from "./billing";
import { DmsEvents } from "./dms";
import { TmsEvents } from "./tms";
import { WmsEvents } from "./wms";
import { PubSub } from "graphql-subscriptions";

export type Events = CrmEvents &
  BillingEvents &
  DmsEvents &
  TmsEvents &
  WmsEvents;

export const pubsubFactory = () => new PubSub<Events>();
