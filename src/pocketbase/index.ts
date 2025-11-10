import PocketBase from "pocketbase";
import { TypedPocketBase } from "@/lib/pb.types";

export const pocketbase = new PocketBase() as TypedPocketBase;
