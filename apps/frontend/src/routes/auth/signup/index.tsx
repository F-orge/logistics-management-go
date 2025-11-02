import { fieldConfig } from "@autoform/zod";
import { AutoForm } from "@packages/ui/components/ui/autoform/index";
import { Button } from "@packages/ui/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldGroup,
} from "@packages/ui/components/ui/field";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";
import { authClient } from "@/lib/auth";

export const RegisterFormSchema = z
	.object({
		name: z.string().check(
			fieldConfig({
				label: "Full name",
				inputProps: { placeholder: "John doe" },
			}),
		),
		email: z.email().check(
			fieldConfig({
				label: "Email",
				inputProps: { placeholder: "m@example.com" },
				description:
					"We'll use this to contact you. We will not share your email with anyone else.",
			}),
		),
		password: z
			.string()
			.min(8, "Must be at least 8 characters long")
			.check(
				fieldConfig({
					label: "Password",
					inputProps: { placeholder: "**********", type: "password" },
				}),
			),
		confirmPassword: z
			.string()
			.min(8, "Must be at least 8 characters long")
			.check(
				fieldConfig({
					label: "Confirm Password",
					inputProps: { placeholder: "**********", type: "password" },
				}),
			),
	})
	.refine((args) => args.password === args.confirmPassword, {
		error: "Password does not match",
		path: ["confirmPassword"],
	});

export const Route = createFileRoute("/auth/signup/")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();

	return (
		<FieldGroup>
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="text-2xl font-bold">Create your account</h1>
				<p className="text-muted-foreground text-sm text-balance">
					Fill in the form below to create your account
				</p>
			</div>
			<AutoForm
				schema={RegisterFormSchema}
				onSubmit={(value) => {
					toast.promise(
						authClient.signUp.email({
							...value,
							callbackURL: `${window.location.origin}/auth/login`,
						}),
						{
							success: ({ data }) => {
								navigate({
									to: `/auth/verify-email`,
									search: { email: data!.user.email },
								});
								return "Success registration";
							},
							error: "Unable to register",
						},
					);
				}}
			>
				<Field>
					<Button type="submit">Create Account</Button>
				</Field>
			</AutoForm>
			<Field>
				<FieldDescription className="px-6 text-center">
					Already have an account? <Link to="/auth/login">Sign in</Link>
				</FieldDescription>
			</Field>
		</FieldGroup>
	);
}
