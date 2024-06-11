import Image from 'next/image';

import { goal } from '@/lib/constants';
import { PlanProps } from '@/types/goals';
import Badge from "@/components/ui/badge-icon";
import EntriesForm from '@/app/first-steps/_components/entries-form';

export default async function Entries({ searchParams }: { searchParams: PlanProps }) {
  const plan = searchParams?.plan;

  return (
		<main className="flex flex-col justify-center items-center w-full min-h-screen gap-10 p-10 bg-gradient">
			<h1 className="title-1 text-center">
				Establece tu sueldo u otro ingreso
			</h1>
			<Badge variant="success" size="lg">
				<Image
					src="/assets/box_download.svg"
					width={32}
					height={32}
					alt="box download icon"
				/>
			</Badge>
			<h2 className="capitalize text-lg font-semibold">
				{goal[plan]}
			</h2>
			<EntriesForm plan={plan} />
		</main>
	);
}
