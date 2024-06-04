import Image from "next/image";

import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge-icon";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import CustomLink from "@/components/ui/link";
import LoginForm from "../_components/login-form";

export default function LoginPage() {
	return (
		<main className="flex flex-col justify-center items-center min-h-screen gap-10 p-10 bg-gradient">
			<Badge variant="success" size="lg">
				<FontAwesomeIcon icon={faCircleUser} className="w-full h-full" />
			</Badge>
			<h1 className="title-1">Iniciar Sesion</h1>
			<div className="flex flex-col flex-grow justify-center items-center gap-6 w-full h-full">
				{/* Formulario de login */}
				<LoginForm />
				{/* Separador */}
				<div className="flex w-full max-w-sm items-center justify-center gap-6">
					<hr className="w-full bg-slate-400 h-[2px]" />
					o
					<hr className="w-full bg-slate-400 h-[2px]" />
				</div>
				{/* Proveedores de autentificación de terceros*/}
				<div className="flex gap-6">
					<Button variant="outline" size="icon">
						<Image
							src="/assets/google.svg"
							width={18}
							height={18}
							alt="Google Icon"
						/>
					</Button>
					<Button variant="black" size="icon">
						<FontAwesomeIcon icon={faGithub} className="w-full h-full" />
					</Button>
					<Button variant="info" size="icon">
						<FontAwesomeIcon icon={faLinkedin} className="w-full h-full" />
					</Button>
				</div>
				<p className="flex gap-6 text-sm">
					¿Olvidaste tu contraseña?
					<CustomLink href="#" className="text-primary">
						Recuperar
					</CustomLink>
				</p>
			</div>
		</main>
	);
}
