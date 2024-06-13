import Badge from "@/components/ui/badge-icon";
import Image from "next/image";

export default function CreateBill() {
  return (
		<main className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient gap-10 p-10">
			<h1 className="title-1 text-center">Establece tu gasto</h1>
			<Badge variant="error" size="lg">
				<Image
					src="/assets/box_download.svg"
					alt="box "
					width={32}
					height={32}
				/>
			</Badge>
		</main>
	);
}