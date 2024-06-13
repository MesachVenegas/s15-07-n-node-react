"use client";

import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomLink from "@/components/ui/link";
import Badge from "@/components/ui/badge-icon";
import { colors, icons } from "@/lib/constants";
import { Iconkeys, VariantKeys } from "@/types";
import { CategoryProps } from "@/types/category";
import DrawerCategories from "./drawer-categories";
import { BillCategoryStateProps } from "@/types/bills";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function BillSettings({
	categories,
	searchParams,
}: {
	categories: CategoryProps[] | null;
	searchParams?: { g?: string };
}) {
	const goalId = searchParams?.g;
  const session = useSession().data?.user;
	const setCategories = useSelector((state: any) => state.BillOfCategory);

	return (
		<div className="flex flex-col flex-grow justify-start items-center w-full">
			<div className="flex flex-col justify-start items-center gap-4 w-full">
				{setCategories &&
					setCategories.map((item: BillCategoryStateProps) => {
						const icon = icons[item.icon as Iconkeys];
						const color = colors[item.variant as VariantKeys];

						return (
								<div className="card bg-white" key={item.id}>
									<Badge variant={color} size="md">
										<FontAwesomeIcon icon={icon} className="w-full h-full" />
									</Badge>
									<p className="capitalize">{item.category}</p>
								</div>
						);
            })}
            {setCategories.length > 0 && (
              <div className="flex flex-col items-center gap-8 w-full">
                <DrawerCategories
                  categories={categories}
                  target={goalId as string}
                  btnClass="bg-primary/20 text-primary"
                />
                <CustomLink href={`/first-steps/bills/add?t=${session?.id}`} variant="button" size="btnWide" className="bg-primary justify-between capitalize text-white max-w-sm">
                  continuar
                  <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
                </CustomLink>
              </div>
            )}
			</div>
		</div>
	);
}
