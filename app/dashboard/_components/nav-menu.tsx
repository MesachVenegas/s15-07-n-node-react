"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '@/components/ui/button';
import { dashboarMenu } from '@/lib/constants';

export default function DashboardMenu(){
  const pathname = usePathname();

  return (
		<nav className="flex flex-col w-full p-2 gap-2">
			{/* Buttons section */}
			<div className="flex justify-between w-full">
				<Button size="icon-sm" variant="foreground-success">
					<FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
				</Button>
				<Button size="icon-lg" variant="warning">
					<FontAwesomeIcon icon={faPlus} className="w-full h-full" />
				</Button>
			</div>
			{/* Menu options */}
			<ul className="grid grid-cols-4 px-4">
				{dashboarMenu.map(({ title, name, href }) => (
					<li
						key={name}
						className={`p-2 text-center border-b-2 ${
							pathname === href
								? "border-black opacity-100"
								: "border-transparent opacity-60"
						}`}>
						<Link href={href} className="capitalize text-sm font-semibold">
							{title}
						</Link>
					</li>
				))}
			</ul>
			<hr className="bg-gray-400 w-full h-[1px] border-none mt-2" />
		</nav>
	);
}