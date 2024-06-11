
import Image from 'next/image';



import Badge from "@/components/ui/badge-icon";
import CustomLink from '@/components/ui/link';
import DrawerCategories from '@/app/first-steps/_components/drawer-categories';

export default function BillsPage({ searchParams }: { searchParams: { g?: string } }) {
	const goalId = searchParams?.g;

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
			<div className="flex flex-grow items-start justify-center w-full">
				<DrawerCategories />
			</div>
			<div>
				<CustomLink
					href={`/first-steps/bills/add?p=${goalId}`}
					className="text-gray-600 text-sm hover:no-underline">
					Saltar este paso
				</CustomLink>
			</div>
		</main>
	);
}
