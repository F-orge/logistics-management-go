import {
	useLocation,
	useNavigate,
	useParams,
	useSearch,
} from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { QRCode } from "../kibo-ui/qr-code";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { Item } from "../ui/item";

const QrDialog = () => {
	const location = useLocation();
	const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
	const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
	const [isCopied, setIsCopied] = useState(false);

	// Determine if dialog should be open
	const isOpen = searchQuery.action === "share";

	// Construct share link from current location
	const shareLink = `${window.location.origin}${location.pathname}?action=view&id=${searchQuery.id}`;

	// Handle copy to clipboard
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareLink);
			setIsCopied(true);
			toast.success("Link copied to clipboard!");

			// Reset icon after 2 seconds
			setTimeout(() => {
				setIsCopied(false);
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
			toast.error("Failed to copy link");
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {
				navigate({
					search: (prev) => ({ ...prev, action: undefined, id: undefined }),
				});
			}}
		>
			<DialogContent className="max-w-1/4" showCloseButton>
				<DialogHeader>
					<DialogTitle>Share QR Code</DialogTitle>
					<DialogDescription>
						Scan or share this QR code with others
					</DialogDescription>
				</DialogHeader>

				<div className="flex justify-center">
					<Item className="h-64 w-64">
						<QRCode data={shareLink} />
					</Item>
				</div>
				<DialogFooter>
					<InputGroup>
						<InputGroupInput
							readOnly
							value={shareLink}
							className="flex-1"
							onClick={(e) => {
								const target = e.target as HTMLInputElement;
								target.select();
							}}
						/>
						<InputGroupAddon align="inline-end">
							<InputGroupButton
								size="icon-sm"
								variant="ghost"
								onClick={handleCopy}
								title={isCopied ? "Copied!" : "Copy to clipboard"}
							>
								{isCopied ? (
									<Check className="size-4" />
								) : (
									<Copy className="size-4" />
								)}
							</InputGroupButton>
						</InputGroupAddon>
					</InputGroup>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default QrDialog;
