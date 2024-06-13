"use client";

import { useState, useEffect } from "react";

import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPen, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/badge-icon";
import { Iconkeys, VariantKeys } from "@/types";
import { colors, icons } from "@/lib/constants";
import { DefaultBillProps } from "@/types/bills";
import { FetchDefaultBills } from "@/services/bill";

export default function DrawerBills({
	categoryId,
	target,
	btnClass,
}: {
	categoryId: string;
	target: string;
	btnClass?: string;
}) {
	const [categories, setCategories] = useState<DefaultBillProps[] | null>(null);

	const createdUrl = (id: string, name: string) => {
		const params = new URLSearchParams({
			cat: categoryId,
			tgt: target,
			bId: id,
			bName: name,
		});

		return params.toString();
	};


	useEffect(() => {
		FetchDefaultBills(categoryId)
			.then((res) => {
				setCategories(res.data);
			})
			.catch((err) => console.error(err.message));
	}, [categoryId]);

	return (
		<Drawer>
			<DrawerTrigger
				className={cn(
					"flex justify-between bg-white rounded-md max-w-56 btn text-sm text-semibold text-primary mt-4",
					btnClass
				)}>
				Agregar un gasto
				<FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
			</DrawerTrigger>
			<DrawerContent className="h-screen">
				<DrawerHeader className="flex justify-center items-center w-full min-h-20">
					<DrawerTitle className="text-center">Añadir un gasto</DrawerTitle>
				</DrawerHeader>
				<div className="flex flex-col justify-center items-center overflow-y-auto overflow-hidden gap-4 w-full h-full max-h-[80vh]">
					<DrawerClose key="custom" asChild>
						<Link
							href={`/first-steps/bills/create?${createdUrl("", "custom")}`}
							className="card">
							<Badge variant="foreground-neutral" size="md">
								<FontAwesomeIcon icon={faFile} className="w-full h-full" />
							</Badge>
							<div className="flex justify-between w-full">
								<p className="capitalize">Personalizado</p>
								<FontAwesomeIcon icon={faPen} className="w-5 h-5" />
							</div>
						</Link>
					</DrawerClose>

					{/* Tarjetas de categorías */}
					{categories?.map((category) => {
						const Icon = icons[category.icon as Iconkeys];
						const Variant = colors[category.color as VariantKeys];

						return (
							<DrawerClose key={category.id} asChild>
								<Link
									className="card"
									href={`/first-steps/bills/create?${createdUrl(category.id, category.name)}`}>
									<Badge variant={Variant} size="md">
										<FontAwesomeIcon icon={Icon} className="w-full h-full" />
									</Badge>
									<p className="capitalize">{category.name}</p>
								</Link>
							</DrawerClose>
						);
					})}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
