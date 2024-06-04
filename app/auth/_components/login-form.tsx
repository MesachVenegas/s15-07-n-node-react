"use client";

import { useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

export default function LoginForm() {
	const [isLoading, startTransition] = useTransition();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleLogin = () => {
		startTransition(() => {
			console.log("Login");
		});
	};

	return (
		<form className="flex flex-col justify-center items-center gap-6">
			<div>
				<Input label="Email" placeholder="Ingresa tu email" />
			</div>
			<div>
				<Input label="Contraseña" placeholder="************" />
			</div>

			<Button
				size="wide"
				className="gradient-right-primary justify-between font-semibold text-white">
				Continuar
				<FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
			</Button>
		</form>
	);
}
