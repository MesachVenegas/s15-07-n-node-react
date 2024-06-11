"use client";

import Image from "next/image";

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
import Badge from "@/components/ui/badge-icon";

export default function DrawerCategories() {


	return (
		<Drawer>
			<DrawerTrigger className="flex justify-between bg-white rounded-md max-w-56 btn text-semibold text-primary">
				Crear una categoría
				<FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
			</DrawerTrigger>
			<DrawerContent className="h-screen">
				<DrawerHeader>
					<DrawerTitle>Categoría de gastos</DrawerTitle>
				</DrawerHeader>
				<div className="flex flex-col justify-center items-center overflow-y-auto overflow-hidden gap-6 w-full h-full">
					{/* Tarjetas de categorías */}
					<DrawerClose asChild>
						<div className="card">
							<Badge variant="foreground-success" size="md">
								<Image
									src="/assets/home-smile.svg"
									width={36}
									height={36}
									alt="home icon"
								/>
							</Badge>
							<p>Arriendos y dividendos</p>
						</div>
					</DrawerClose>

					<DrawerClose asChild>
						<div className="card">
							<Badge variant="foreground-purple" size="md">
								<Image
									src="/assets/donate-blood.svg"
									width={36}
									height={36}
									alt="home icon"
								/>
							</Badge>
							<p>Servicios básicos</p>
						</div>
					</DrawerClose>

					<DrawerClose asChild>
						<div className="card">
							<Badge variant="foreground-info" size="md">
								<Image
									src="/assets/wallet.svg"
									width={36}
									height={36}
									alt="home icon"
								/>
							</Badge>
							<p>Créditos y seguros</p>
						</div>
					</DrawerClose>

					<DrawerClose asChild>
						<div className="card">
							<Badge variant="foreground-error" size="md">
								<Image
									src="/assets/credit-card.svg"
									width={36}
									height={36}
									alt="home icon"
								/>
							</Badge>
							<p>Tarjetas de crédito</p>
						</div>
					</DrawerClose>

					<DrawerClose asChild>
						<div className="card">
							<Badge variant="foreground-neutral" size="md">
								<Image
									src="/assets/file-blank.svg"
									width={36}
									height={36}
									alt="home icon"
								/>
							</Badge>
							<p>Otro</p>
						</div>
					</DrawerClose>
				</div>
			</DrawerContent>
		</Drawer>
	);
}
