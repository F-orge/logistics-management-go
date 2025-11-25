import type PocketBase from "pocketbase";
import type { AuthRecord } from "pocketbase";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { TypedPocketBase } from "@/lib/pb.types";
import { pocketbase } from "./index";

export interface PocketBaseContextType {
	pb: TypedPocketBase;
	isReady: boolean;
	isAuthenticated: boolean;
	user: AuthRecord | null;
	authToken: string | null;
	logout: () => void;
}

const PocketBaseContext = createContext<PocketBaseContextType | undefined>(
	undefined,
);

export function PocketBaseProvider({ children }: { children: ReactNode }) {
	const [isReady, setIsReady] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<AuthRecord | null>(null);
	const [authToken, setAuthToken] = useState<string | null>(null);

	useEffect(() => {
		// Initialize auth state from stored data
		const storedUser = pocketbase.authStore.model;
		const storedToken = pocketbase.authStore.token;

		if (storedUser && storedToken) {
			setUser(storedUser);
			setAuthToken(storedToken);
			setIsAuthenticated(true);
		}

		// Subscribe to auth changes
		const unsubscribe = pocketbase.authStore.onChange(() => {
			const currentUser = pocketbase.authStore.model;
			const currentToken = pocketbase.authStore.token;

			if (currentUser && currentToken) {
				setUser(currentUser);
				setAuthToken(currentToken);
				setIsAuthenticated(true);
			} else {
				setUser(null);
				setAuthToken(null);
				setIsAuthenticated(false);
			}
		});

		setIsReady(true);

		return () => unsubscribe();
	}, []);

	const logout = () => {
		pocketbase.authStore.clear();
		setUser(null);
		setAuthToken(null);
		setIsAuthenticated(false);
	};

	const value: PocketBaseContextType = {
		pb: pocketbase,
		isReady,
		isAuthenticated,
		user,
		authToken,
		logout,
	};

	return (
		<PocketBaseContext.Provider value={value}>
			{children}
		</PocketBaseContext.Provider>
	);
}

export function usePocketBase() {
	const context = useContext(PocketBaseContext);
	if (context === undefined) {
		throw new Error("usePocketBase must be used within a PocketBaseProvider");
	}
	return context;
}

export function useAuth() {
	const { isAuthenticated, user, authToken, logout } = usePocketBase();
	return { isAuthenticated, user, authToken, logout };
}

export function usePocketBaseClient() {
	const { pb } = usePocketBase();
	return pb;
}
