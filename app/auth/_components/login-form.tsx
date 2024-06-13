"use client";

import { useTransition, useState } from "react";

import { z } from "zod";
import {
	faArrowRight,
	faEye,
	faEyeSlash,
	} from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { LoginSchema } from "@/validations/auth";
import { Authenticate } from "@/services/authentication";

export default function LoginForm() {
	const [isLoading, startTransition] = useTransition();
	const [showPass, setShowPass] = useState<boolean>(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin: SubmitHandler<z.infer<typeof LoginSchema>> = (data) => {
		startTransition(() => {
			Authenticate(data).catch((err) => console.error(err.message));
		});
	};

	return (
		<form
			className="flex flex-col justify-center items-center gap-6 w-full max-w-md"
			onSubmit={handleSubmit(handleLogin)}>
			<div className="w-full max-w-xs">
				<Input
					type="email"
					label="Email"
					disabled={isLoading}
					error={errors.email?.message}
					placeholder="Ingresa tu email"
					{...register("email")}
				/>
				<div className="w-full text-red p-1 text-xs px-2">
					{errors.email && (
						<p className="text-red-500">{errors.email.message}</p>
					)}
				</div>
			</div>

			<div className="w-full max-w-xs">
				<Input
					type={showPass ? "text" : "password"}
					disabled={isLoading}
					error={errors.password?.message}
					label="Contraseña"
					placeholder="************"
					{...register("password")}>
					<FontAwesomeIcon
						icon={showPass ? faEyeSlash : faEye}
						className="w-5 h-5 cursor-pointer"
						onClick={() => setShowPass((prev) => !prev)}
					/>
				</Input>
				<div className="w-full text-red p-1 text-xs px-2">
					{errors.password && (
						<p className="text-red-500">{errors.password.message}</p>
					)}
				</div>
			</div>

			<Button
				size="wide"
				disabled={isLoading}
				className="gradient-right-primary justify-between font-semibold text-white max-w-xs">
				Continuar
				{!isLoading && (
					<FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
				)}
				<ClipLoader color="white" loading={isLoading} size={16} />
			</Button>
		</form>
	);
}
