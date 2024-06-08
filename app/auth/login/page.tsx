import Image from "next/image";

import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "@/components/ui/button";
import CustomLink from "@/components/ui/link";
import Badge from "@/components/ui/badge-icon";
import { ProviderAuth } from "@/services/authentication";
import LoginForm from "@/app/auth/_components/login-form";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function LoginPage() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen gap-10 p-10 bg-logo bg-no-repeat bg-center bg[50%]">
			<Badge variant="success" size="lg">
				<FontAwesomeIcon icon={faCircleUser} className="w-full h-full" />
			</Badge>
			<h1 className="title-1">Iniciar Sesion</h1>
			<div className="flex flex-col flex-grow justify-center items-center gap-6 w-full h-full">
				{/* Formulario de login */}
				<LoginForm />
				{/* Separador */}
				<div className="flex w-full max-w-xs items-center justify-center gap-6 font-semibold">
					<hr className="w-full bg-slate-400 h-[2px]" />
					o
					<hr className="w-full bg-slate-400 h-[2px]" />
				</div>
				{/* Proveedores de autentificación de terceros*/}
				<div className="flex justify-center w-full gap-6">
					{/* Autenticación de google */}
					<form action={ async () => {
						'use server';
						await ProviderAuth('google');

					}}>
						<Button variant="outline" size="icon" className="rounded-md" type="submit">
							<Image
								src="/assets/google.svg"
								width={22}
								height={22}
								alt="Google Icon"
							/>
						</Button>
					</form>
					{/* Autenticación de Github */}
					<form action={ async () => {
						'use server';
						await ProviderAuth('github');
					}}>
						<Button variant="black" size="icon" className="rounded-md" type="submit">
							<FontAwesomeIcon icon={faGithub} className="w-full h-full" />
						</Button>
					</form>
					{/* Autenticación de LinkedIn */}
					<form action={ async () => {
						'use server';
						await ProviderAuth('linkedin');
					}}>
						<Button variant="info" size="icon" className="rounded-md" type="submit">
							<FontAwesomeIcon icon={faLinkedin} className="w-full h-full" />
						</Button>
					</form>
				</div>
				<p className="flex gap-2 text-sm">
					¿Olvidaste tu contraseña?
					<CustomLink href="#" className="text-primary">
						Recuperar
					</CustomLink>
				</p>
			</div>
		</main>
	);
}
