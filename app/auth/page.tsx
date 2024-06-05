import Image from 'next/image';
import type { Metadata } from 'next';

import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { signIn } from '@/auth';
import Button from "@/components/ui/button";
import CustomLink from "@/components/ui/link";
import Badge from "@/components/ui/badge-icon";
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export const metadata: Metadata = {
  title: "Inicia tu cuenta",
  description: "Entre a la maravillo plataforma que te ayudara a mantener tu salud financiera y a llegar a fin de mes sin preocupaciones"
}

export default function LoginPage() {
  return (
		<main className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient gap-10 p-10">
			<Badge variant="success" size="lg">
				<FontAwesomeIcon icon={faCircleUser} className="w-8 h-8" />
			</Badge>
			<h1 className="text-xl">Vamos a crearte una cuenta</h1>
			<div className="flex flex-col justify-center items-center gap-6 p-10 w-full h-full">
				{/* Proveedores de autentificación de terceros*/}
				<div className="flex flex-col gap-6">
					<form action={async () => {
						'use server';
						await signIn('google');
					}}>
						<Button className="shadow-none" variant="outline" size="lg">
							<Image
								src="/assets/google.svg"
								width={18}
								height={18}
								alt="Google Icon"
							/>
							Sign in with Google
						</Button>
					</form>
					<form action={async () => {
						'use server';
						await signIn('github');
					}}>
						<Button className="shadow-none" variant="black" size="lg">
							<FontAwesomeIcon icon={faGithub} className="w-5 h-5" />
							Sign in with Github
						</Button>
					</form>
					<form action={async () => {
						'use server';
						await signIn('linkedin');
					}}>
						<Button className="shadow-none" variant="info" size="lg">
							<FontAwesomeIcon icon={faLinkedin} className="w-5 h-5" />
							Login with LinkedIn
						</Button>
					</form>
				</div>
				{/* Separador */}
				<div className="flex w-full max-w-sm items-center justify-center gap-6">
					<hr className="w-full bg-slate-400 h-[2px]" />
					o
					<hr className="w-full bg-slate-400 h-[2px]" />
				</div>
				{/* Botón para inicio de sesión con correo y registro. */}
				<div className="flex flex-col items-center gap-4 w-full max-w-xs">
					<CustomLink
						href="/auth/login"
						variant="button"
						size="btnWide"
						className="bg-blue-600 justify-center text-white shadow-none">
						Inicia sesión
					</CustomLink>
					<p className="flex w-full justify-center gap-4 text-xs">
						¿No tienes una cuenta?
						<CustomLink href="/auth/register" className="">
							Regístrate
						</CustomLink>
					</p>
				</div>
			</div>
		</main>
	);
}
