import type React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../dialog";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../table";

export interface ObjectCellProps {
	value?: Record<string, unknown>;
	title?: React.ReactNode;
	description?: React.ReactNode;
}

const ObjectCell = (props: ObjectCellProps) => {
	return (
		<Dialog>
			<DialogTrigger>Open Record</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{props.title}</DialogTitle>
					<DialogDescription>{props.description}</DialogDescription>
				</DialogHeader>
				<Table>
					<TableHeader>
						<TableHead>Property</TableHead>
						<TableHead>Value</TableHead>
					</TableHeader>
					<TableBody>
						{Object.entries(props.value || {}).map(([key, value]) => (
							<TableRow key={key}>
								<TableCell>{key}</TableCell>
								<TableCell>{JSON.stringify(value)}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};

export default ObjectCell;
