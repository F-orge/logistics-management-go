export interface StringCellProps {
  value?: string;
}

const StringCell = (props: StringCellProps) => {
  return <div>{props.value || "-"}</div>;
};

export default StringCell;
