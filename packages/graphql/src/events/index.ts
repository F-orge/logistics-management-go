import { PubSub } from "graphql-subscriptions";
import { CrmEvents } from "./crm";

type Events = CrmEvents;

export const pubsub = new PubSub<Events>();

export * from "./crm";
