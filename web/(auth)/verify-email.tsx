import { Loader2 } from "lucide-solid";
import { ClientResponseError } from "pocketbase";
import { onMount, type Component } from "solid-js";
import { pb } from "~/lib/pocketbase";

const VerifyEmailPage: Component<{}> = (props) => {
	onMount(async () => {
		try {
			const userRecord = await pb
				.collection("users")
				.getOne(pb.authStore.record?.id || "");

			if (userRecord.verified) {
				window.location.href = "/"; // Use window.location.href for proper redirection
				return;
			}

			const lastRequested = localStorage.getItem("verificationRequestedAt");
			const now = Date.now();

			if (!lastRequested || now - Number.parseInt(lastRequested) >= 30000) {
				await pb.collection("users").requestVerification(userRecord.email);
				localStorage.setItem("verificationRequestedAt", now.toString());
			}
		} catch (e) {
			if (e instanceof ClientResponseError) {
				window.location.href = "/signin"; // Use window.location.href for proper redirection
				return;
			}
			throw e;
		}
	});

	return (
		<div class="h-full flex flex-col items-center justify-center">
			<div class="flex flex-col gap-5 w-1/2 items-center">
				<h1 class="text-3xl pb-1">Verifying your email...</h1>
				<span class="text-muted-foreground text-sm">
					Please wait while we verify your email address.
				</span>
				<span class="text-muted-foreground text-sm">
					If you have already verified, please reload the page manually.
				</span>
				<Loader2 class="animate-spin" />
			</div>
		</div>
	);
};

export default VerifyEmailPage;
