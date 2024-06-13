"use client";

import { useTransition, useState } from "react";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import { CategoryProps } from "@/types/category";
import { registerBillSchema } from '@/validations/billSchema';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/button";
import DrawerCategories from "./drawer-categories";
import { ClipLoader } from "react-spinners";

export default function BillForm({
	searchParams,
  categories,
}: {
	searchParams: { cat: string; tgt: string; bId: string; bName: string };
  categories: CategoryProps[] | null;
}) {
	const billId = searchParams?.bId;
	const categoryId = searchParams?.cat;
	const targetUser = searchParams?.tgt;
	const billName = searchParams?.bName;
	const { push } = useRouter();
	const [value, setValue] = useState<string>("0");
  const [isLoading, startTransition] = useTransition();

	const { register, handleSubmit, formState: { errors }, setValue: setFormValue } = useForm<z.infer<typeof registerBillSchema>>({
		defaultValues: {
			amount: '0',
			name: billName,
			categoryId: categoryId,
		},
	});

  const handleForm: SubmitHandler<z.infer<typeof registerBillSchema>> = (data: any) => {
		startTransition(() => {
			console.log(data);
		})
  };

	function handlePadClick(value: string) {
		setValue((prevValue) => {
			if (value === "backspace") {
				const newValue = prevValue.slice(0, -1) || "0";
				setFormValue("amount", newValue);
				return newValue;
			}
			if (value === "." && prevValue.includes(".")) {
				return prevValue;
			}
			const newValue = prevValue === "0" ? value : prevValue + value;
			setFormValue("amount", newValue);
			return newValue;
		});
	}

	return (
		<div className="flex flex-col justify-center items-center gap-6 w-full h-full">
			<label className="w-full max-w-xs">
				<input
					type="text"
					title="Bill name"
					disabled={isLoading}
					className="p-2 border-2 h-12 capitalize border-gray-300 rounded-md w-full focus-within:outline-none focus-within:border-gray-400 focus-within:ring-1 focus-within:ring-gray-400 transition-colors duration-200 ease-in-out text-gray-500 font-medium"
					{...register("name", { required: true })}
					onChange={(e) => setFormValue("name", e.target.value)}
				/>
			</label>
			{/* Select category */}
			<div className="flex flex-row w-full max-w-md gap-6 overflow-x-auto overflow-hidden p-2">
				{categories?.map((category) => {
					return (
						<div
							key={category.id}
							className={`grid place-content-center font-semibold text-center min-w-[150px] p-2 rounded-full ${
								categoryId === category.id ? "bg-primary" : "bg-primary/20"
							}`}>
							<p className="capitalize text-xs">{category.name}</p>
						</div>
					);
				})}
			</div>
			<form className="flex flex-col justify-start items-center w-full gap-8 p-6">
				<label className="flex gap-1 items-end">
					$
					<input
						type="text"
						inputMode="numeric"
						title="income"
						disabled={isLoading}
						className="w-[160px] bg-transparent focus-visible:outline-none focus-visible:ring-0 px-1 text-4xl"
						{...register("amount", { required: true })}
					/>
				</label>
				<Button
					size="wide"
					className="justify-between max-w-xs gradient-right-primary text-white font-semibold">
					Agregar gasto
					{!isLoading && (
						<FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
					)}
					<ClipLoader color="#fff" size={16} loading={isLoading} />
				</Button>
				<div className="grid grid-cols-3 w-full bg-white max-w-sm font-semibold place-content-center">
					<div
						role="button"
						aria-label="pad-1"
						className="number-pad-item"
						onClick={() => handlePadClick("1")}>
						1
					</div>
					<div
						role="button"
						aria-label="pad-2"
						className="number-pad-item"
						onClick={() => handlePadClick("2")}>
						2
					</div>
					<div
						role="button"
						aria-label="pad-3"
						className="number-pad-item"
						onClick={() => handlePadClick("3")}>
						3
					</div>
					<div
						role="button"
						aria-label="pad-4"
						className="number-pad-item"
						onClick={() => handlePadClick("4")}>
						4
					</div>
					<div
						role="button"
						aria-label="pad-5"
						className="number-pad-item"
						onClick={() => handlePadClick("5")}>
						5
					</div>
					<div
						role="button"
						aria-label="pad-6"
						className="number-pad-item"
						onClick={() => handlePadClick("6")}>
						6
					</div>
					<div
						role="button"
						aria-label="pad-7"
						className="number-pad-item"
						onClick={() => handlePadClick("7")}>
						7
					</div>
					<div
						role="button"
						aria-label="pad-8"
						className="number-pad-item"
						onClick={() => handlePadClick("8")}>
						8
					</div>
					<div
						role="button"
						aria-label="pad-9"
						className="number-pad-item"
						onClick={() => handlePadClick("9")}>
						9
					</div>
					<div
						role="button"
						aria-label="pad-dot"
						className="number-pad-item"
						onClick={() => handlePadClick(".")}>
						.
					</div>
					<div
						role="button"
						aria-label="pad-0"
						className="number-pad-item"
						onClick={() => handlePadClick("0")}>
						0
					</div>
					<div
						role="button"
						aria-label="pad-backspace"
						className="number-pad-item"
						onClick={() => handlePadClick("backspace")}>
						<FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
					</div>
				</div>
			</form>
			<DrawerCategories categories={categories} target={targetUser} />
		</div>
	);
}
