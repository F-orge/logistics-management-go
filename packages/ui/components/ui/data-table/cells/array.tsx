import React from "react";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../table";

export interface ArrayCellProps {
  values: Record<string, any>[];
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
            {props.values?.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.entries(row).map(([key, value]) => (
                  <TableCell key={`${rowIndex}-${key}`}>
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
