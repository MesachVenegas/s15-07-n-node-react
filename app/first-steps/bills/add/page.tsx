'use client';

import Image from "next/image";

import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Badge from "@/components/ui/badge-icon";
import { Iconkeys, VariantKeys } from "@/types";
import { colors, icons } from "@/lib/constants";
import { BillCategoryStateProps } from "@/types/bills";
import DrawerBills from "../../_components/drawer-bills";
import DrawerCategories from "../../_components/drawer-categories";
import CustomLink from "@/components/ui/link";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function AddBill({ searchParams }: { searchParams: { t?: string, c?: string } }) {
  const userTarget = searchParams?.t;
  const categories = useSelector((state: any) => state.BillOfCategory);

  return (
		<main className="flex flex-col justify-center items-center min-h-screen w-full gap-10 bg-gradient p-10">
			<h1 className="title-1 text-center">Ingresa tus gastos constantes</h1>
			<Badge variant="error" size="lg">
				<Image
					src="/assets/box_download.svg"
					alt="box "
					width={32}
					height={32}
				/>
			</Badge>
			<p className="font-semibold text-lg">Personaliza tus gastos</p>
			<div className="flex flex-col flex-grow justify-start items-center gap-4 w-full h-full">
				{categories &&
					categories.map((item: BillCategoryStateProps) => {
						const icon = icons[item.icon as Iconkeys];
						const color = colors[item.variant as VariantKeys];

						return (
							<div
								key={item.id}
								className="flex flex-col items-center gap-2 w-full">
								{/* Cards */}
								<div className="card bg-white">
									<Badge variant={color} size="md">
										<FontAwesomeIcon icon={icon} className="w-full h-full" />
									</Badge>
									<p className="capitalize">{item.category}</p>
								</div>
								{/* Add new  bill to category */}
								<DrawerBills
									btnClass="bg-primary/20 text-primary"
									target={userTarget}
									categoryId={item.id}
								/>
							</div>
						);
					})}
				<div className="flex flex-col items-center gap-8 w-full mt-12">
					<DrawerCategories
						categories={categories}
						target=""
						btnClass="max-w-[250px] h-12 items-center"
					/>
					<CustomLink
						href={`/dashboard`}
						variant="button"
						size="btnWide"
						className="bg-primary justify-between capitalize text-white max-w-xs">
						continuar
						<FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
					</CustomLink>
				</div>
			</div>
		</main>
	);
}