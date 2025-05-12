import { type Component } from "solid-js";

const Divider: Component<{ children: any }> = (props) => {
	return (
		<div class="relative flex items-center">
			<div class="flex-grow border-t border-border"></div>
			<span class="flex-shrink mx-4 text-gray-400">{props.children}</span>
			<div class="flex-grow border-t border-border"></div>
		</div>
	);
};

export default Divider;
