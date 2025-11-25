import PocketBase from "pocketbase";
import { TypedPocketBase } from "@/lib/pb.types";

export const pocketbase = new PocketBase() as TypedPocketBase;

export type { PocketBaseContextType } from "./context";
export {
	PocketBaseProvider,
	useAuth,
	usePocketBase,
	usePocketBaseClient,
} from "./context";

export {
	useCreateRecord,
	useDeleteRecord,
	useFetchRecord,
	useFetchRecords,
	useSubscribeCollection,
	useSubscribeRecord,
	useUpdateRecord,
} from "./hooks";
