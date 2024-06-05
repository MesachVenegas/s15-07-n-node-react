"use client";

import { useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { LoginSchema } from '@/validations/auth';

export default function LoginForm() {
	const [isLoading, startTransition] = useTransition();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	});

	const handleLogin: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
		startTransition(() => {
			console.log(data);
		});
	};

	return (
		<form className="flex flex-col justify-center items-center gap-6" onSubmit={handleSubmit(handleLogin)}>
			<div>
				<Input label="Email" placeholder="Ingresa tu email" {...register("email")} />
			</div>
			<div>
				<Input label="Contraseña" placeholder="************" {...register("password")} />
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
