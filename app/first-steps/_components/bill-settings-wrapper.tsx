"use client";

import { useSelector } from "react-redux";

import BillSettings from "./bill-settings";
import CustomLink from "@/components/ui/link";
import { CategoryProps } from "@/types/category";
import DrawerCategories from "./drawer-categories";

export default function BillSettingsWrapper({
	categories,
	goalId,
}: {
	categories: CategoryProps[] | null;
	goalId?: string;
}) {
	const setCategories = useSelector((state: any) => state.BillOfCategory);

	return (
		<>
			<div className="flex items-start justify-center w-full">
				{setCategories.length === 0 && (
					<DrawerCategories categories={categories} target={goalId as string} />
				)}
			</div>
			<div className="flex flex-grow flex-col gap-2 justify-start items-center w-full">
				{/* Set bill settings of the user */}
				<BillSettings categories={categories} />
				{/* Skip this step */}
				<CustomLink
					href={`/first-steps/bills/add?p=${goalId}`}
					className="text-gray-600 text-sm hover:no-underline justify-self-end">
					Saltar este paso
				</CustomLink>
			</div>
		</>
	);
}
