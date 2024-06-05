import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Card({ children, className, ...props }: CardProps) {
	return (
		<div
			className={cn(
				"flex flex-col justify-center items-center w-full h-full min-h-60 bg-white shadow-card rounded-md",
				className
			)}
			{...props}>
			{children}
		</div>
	);
}
