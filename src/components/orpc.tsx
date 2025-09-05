import type { RouterClient } from "@orpc/server";
import { createContext, useContext } from "react";
import type api from "@/api";

const orpcContext = createContext<RouterClient<typeof api> | undefined>(
  undefined,
);

export const useORPCClient = () => useContext(orpcContext);

export default orpcContext;
