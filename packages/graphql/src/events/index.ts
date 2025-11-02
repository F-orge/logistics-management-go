import { PubSub } from "graphql-subscriptions";
import type { BillingEvents } from "./billing";
import type { CrmEvents } from "./crm";
import type { DmsEvents } from "./dms";
import type { TmsEvents } from "./tms";
import type { WmsEvents } from "./wms";

export type Events = CrmEvents &
	BillingEvents &
	DmsEvents &
	TmsEvents &
	WmsEvents;

export const pubsubFactory = () => new PubSub<Events>();
