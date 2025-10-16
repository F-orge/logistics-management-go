import { format } from "date-fns";

export interface DateCellProps {
  value?: Date;
  format: string;
}

const DateCell = (props: DateCellProps) => {
  return <div>{props.value ? format(props.value, "PPP") : "-"}</div>;
};

export default DateCell;
