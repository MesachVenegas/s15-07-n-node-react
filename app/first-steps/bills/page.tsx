import Image from 'next/image';

import Badge from "@/components/ui/badge-icon";
import { FetchDefaultCategories } from '@/services/category';
import BillSettingsWrapper from '../_components/bill-settings-wrapper';

export default async function BillsPage({ searchParams }: { searchParams: { g?: string, step?: string } }) {
	const goalId = searchParams?.g;
	const step = searchParams?.step;
	const categories = (await FetchDefaultCategories()).data;

  return (
		<main className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient gap-10 p-10">
			<h1 className="title-1 text-center">Ingresa tus gastos constantes</h1>
			<Badge variant="error" size="lg">
				<Image
					src="/assets/box_download.svg"
					width={32}
					height={32}
					alt="bill icon"
				/>
			</Badge>
			<p className='capitalize font-semibold text-lg'>Elige las Categorías</p>
			{/* Drawer categories */}
			<BillSettingsWrapper categories={categories} goalId={goalId} />
		</main>
	);
}
