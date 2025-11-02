import { Link } from "@tanstack/react-router";

export interface URLCellProps {
	value?: string;
	href?: string;
}

const UrlCell = (props: URLCellProps) => {
	return <Link to={props.href}>{props.value}</Link>;
};

export default UrlCell;
