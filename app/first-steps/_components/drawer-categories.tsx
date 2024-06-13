"use client";

import { useDispatch } from "react-redux";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
import { CategoryProps } from "@/types/category";
import { BillCategoryStateProps } from "@/types/bills";
import { addCategory } from "@/context/store/steps/addBillToCategory";

export default function DrawerCategories({
	categories,
	target,
	btnClass,
}: {
	categories: CategoryProps[] | null;
	target: string;
	btnClass?: string;
}) {
	const dispatch = useDispatch();

	const handleAddCategory = (category: CategoryProps) => {
		const data: BillCategoryStateProps = {
			target: target,
			id: category.id,
			category: category.name,
			icon: category.icon,
			variant: category.color,
			bills: [],
		};
		dispatch(addCategory(data));
	};

	return (
		<Drawer>
			<DrawerTrigger
				className={cn(
					"flex justify-between bg-white rounded-md max-w-56 btn text-sm text-semibold text-primary mt-4",
					btnClass
				)}>
				Agregar una categoría
				<FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
			</DrawerTrigger>
			<DrawerContent className="h-screen">
				<DrawerHeader className="w-full">
					<DrawerTitle className="text-center">Categoría de gastos</DrawerTitle>
				</DrawerHeader>
				<div className="flex flex-col justify-center items-center overflow-y-auto overflow-hidden gap-6 w-full h-full">
					{/* Tarjetas de categorías */}
					{categories?.map((category) => {
						const Icon = icons[category.icon as Iconkeys];
						const Variant = colors[category.color as VariantKeys];

						return (
							<DrawerClose key={category.id} asChild>
								<div
									className="card"
									onClick={() => handleAddCategory(category)}>
									<Badge variant={Variant} size="md">
										<FontAwesomeIcon icon={Icon} className="w-full h-full" />
									</Badge>
									<p className="capitalize">{category.name}</p>
								</div>
							</DrawerClose>
						);
					})}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
