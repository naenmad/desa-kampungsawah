import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	className?: string;
};

type ButtonProps = BaseProps &
	(
		| ({ href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">)
		| ({ href?: never } & ComponentPropsWithoutRef<"button">)
	);

const variantStyles: Record<ButtonVariant, string> = {
	primary: "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20",
	secondary: "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur-md",
	ghost: "bg-transparent text-emerald-600 hover:bg-emerald-50",
};

const sizeStyles: Record<ButtonSize, string> = {
	sm: "px-4 py-2 text-sm",
	md: "px-6 py-3.5 text-sm",
	lg: "px-8 py-4 text-base",
};

function getButtonClasses(variant: ButtonVariant, size: ButtonSize, className?: string) {
	return [
		"inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200",
		variantStyles[variant],
		sizeStyles[size],
		className,
	]
		.filter(Boolean)
		.join(" ");
}

export default function Button(props: ButtonProps) {
	// 1. Ekstrak property styling di sini agar tidak ikut masuk ke restProps
	const { children, variant = "primary", size = "md", className, ...restProps } = props;
	const buttonClasses = getButtonClasses(variant, size, className);

	if ("href" in props) {
		// 2. Sekarang restProps sudah bersih dari className
		const { href, ...linkProps } = restProps as { href: string;[key: string]: any };

		return (
			<Link href={href} className={buttonClasses} {...linkProps}>
				{children}
			</Link>
		);
	}

	// Sama halnya dengan button biasa
	const { type = "button", ...buttonProps } = restProps as ComponentPropsWithoutRef<"button">;

	return (
		<button type={type} className={buttonClasses} {...buttonProps}>
			{children}
		</button>
	);
}