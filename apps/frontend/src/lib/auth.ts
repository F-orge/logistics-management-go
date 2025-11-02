import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const _authClient = createAuthClient({
	baseURL: `${window.location.origin}`,
	plugins: [adminClient()],
});

export const authClient: typeof _authClient = _authClient;
export type AuthClient = typeof authClient;
