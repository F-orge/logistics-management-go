export interface NumberCellProps {
	value?: number;
}

const NumberCell = (props: NumberCellProps) => {
	return <div>{props.value || "-"}</div>;
};

export default NumberCell;
