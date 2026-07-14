import type { ReactNode } from "react";

type CardProps = {
	children: ReactNode;
	className?: string;
};

export default function Card({ children, className }: CardProps) {
	return (
		<div className={[
			"rounded-2xl border border-gray-200/60 bg-white shadow-sm",
			className,
		].filter(Boolean).join(" ")}>
			{children}
		</div>
	);
}
