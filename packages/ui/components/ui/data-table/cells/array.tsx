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

export interface ArrayCellProps {
	values: Record<string, unknown>[];
	title?: React.ReactNode;
	description?: React.ReactNode;
}

const ArrayCell = (props: ArrayCellProps) => {
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
						<TableRow>
							{Object.keys(props.values?.at(0) || {}).map((head) => (
								<TableHead key={head}>{head}</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{props.values?.map((row) => (
							<TableRow key={JSON.stringify(row)}>
								{Object.entries(row).map(([key, value]) => (
									<TableCell key={`${JSON.stringify(row)}-${key}`}>
										{String(value ?? "")}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</DialogContent>
		</Dialog>
	);
};

export default ArrayCell;
