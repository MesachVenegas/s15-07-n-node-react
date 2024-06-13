import Image from "next/image";

import Badge from "@/components/ui/badge-icon";
import BillForm from "../../_components/bill-form";
import { FetchDefaultCategories } from "@/services/category";

export default async function CreateBill({
	searchParams,
}: {
	searchParams: { cat: string; tgt: string; bId: string; bName: string };
}) {
	const categories = (await FetchDefaultCategories()).data;

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
			<div className="flex flex-col flex-grow justify-start items-center w-full py-6">
				<BillForm searchParams={searchParams} categories={categories} />
			</div>
		</main>
	);
}