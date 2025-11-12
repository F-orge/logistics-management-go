/**
 * Email Field Configuration
 */
export interface EmailFieldProps {
	/** Placeholder text for email input */
	placeholder?: string;
	/** Icon size in Tailwind units */
	iconSize?: string;
}

/**
 * URL Field Configuration
 */
export interface URLFieldProps {
	/** Prefix text to display before the input (default: "https://") */
	prefix?: string;
	/** Placeholder text for URL input */
	placeholder?: string;
	/** Additional class names for the input */
	className?: string;
}

/**
 * GeoPoint Field Configuration
 */
export interface GeoPointFieldProps {
	/** Placeholder text for geo point input */
	placeholder?: string;
	/** Icon size in Tailwind units */
	iconSize?: string;
	/** Format hint text */
	formatHint?: string;
}

/**
 * Editor Field Configuration
 */
export interface EditorFieldProps {
	/** Placeholder text for textarea */
	placeholder?: string;
	/** Number of rows for textarea */
	rows?: number;
	/** Minimum height for textarea */
	minHeight?: string;
	/** Whether to allow resizing */
	resizable?: boolean;
}

/**
 * File Field Configuration
 */
export interface FileFieldProps {
	/** Text displayed when no file is selected */
	uploadText?: string;
	/** Secondary text displayed below main text */
	uploadHint?: string;
	/** Icon size for upload indicator */
	iconSize?: string;
	/** Max file size in MB (optional validation hint) */
	maxSize?: number;
	/** Allowed file types filter */
	accept?: string;
	/** Show image preview for image files */
	showImagePreview?: boolean;
	/** Size of image preview thumbnail */
	previewSize?: string;
	/** Additional description text */
	description?: string;
}

/**
 * Boolean Field Configuration
 */
export interface BooleanFieldProps {
	/** Label text to display next to checkbox */
	label?: string;
	/** Additional CSS class names */
	className?: string;
}
