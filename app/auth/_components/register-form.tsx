"use client";

import { useTransition, useState } from "react";
import Image from "next/image";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faArrowRight,
	faEye,
	faEyeSlash,
	faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import Badge from "@/components/ui/badge-icon";
import { RegisterSchema } from "@/validations/auth";
import { registerNewuser } from "@/services/authentication";

export default function RegisterForm() {
	const [isLoading, startTransition] = useTransition();
	const [showPass, setShowPass] = useState<boolean>(false);
	const [showConfirm, setShowConfirm] = useState<boolean>(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
	});

	const registerAction: SubmitHandler<z.infer<typeof RegisterSchema>> = (data) => {
		startTransition(() => {
			registerNewuser(data)
				.then(res => console.log(res))
				.catch(err => console.error(err.message));
		});
	};

	return (
		<form
			onSubmit={handleSubmit(registerAction)}
			className="flex flex-col justify-center items-center gap-6 w-full max-w-md">
			<Badge variant="primary" size="lg" className="mb-6 relative">
				<FontAwesomeIcon icon={faCircleUser} className="w-8 h-8" />
				<label className="w-6 h-6 absolute bg-white/50 cursor-pointer rounded-md -bottom-1 -right-2">
					<Image src="/assets/add_a_photo.svg" fill alt="add avatar icon" />
					<input
						type="file"
						className="hidden"
						aria-label="Add avatar"
						title="add avatar"
					/>
				</label>
			</Badge>
			<div className="w-full max-w-xs">
				<Input
					type="text"
					label="Usuario"
					disabled={isLoading}
					error={errors.username?.message}
					placeholder="Nombre de usuario"
					{...register("username", { required: true })}
				/>
				<div className="w-full text-red p-1 text-xs px-2">
					{errors.username && <span>{errors.username.message}</span>}
				</div>
			</div>
			<div className="w-full max-w-xs">
				<Input
					type="email"
					label="Email"
					disabled={isLoading}
					error={errors.email?.message}
					placeholder="Ingresa tu email"
					{...register("email", { required: true })}
				/>
				<div className="w-full text-red p-1 text-xs px-2">
					{errors.email && <span>{errors.email.message}</span>}
				</div>
			</div>
			<div className="w-full max-w-xs">
				<Input
					type={showPass ? "text" : "password"}
					label="Contraseña"
					disabled={isLoading}
					error={errors.password?.message}
					placeholder="*********"
					{...register("password", { required: true })}>
					<FontAwesomeIcon
						icon={showPass ? faEyeSlash : faEye}
						className="w-5 h-5 cursor-pointer"
						onClick={() => setShowPass((prev) => !prev)}
					/>
				</Input>
				<div className="w-full text-red p-1 text-xs px-2">
					{errors.password && <span>{errors.password.message}</span>}
				</div>
			</div>
			<div className="w-full max-w-xs">
				<Input
					type={showConfirm ? "text" : "password"}
					label="Confirmar contraseña"
					disabled={isLoading}
					error={errors.confirm?.message}
					placeholder="*********"
					{...register("confirm", { required: true })}>
					<FontAwesomeIcon
						icon={showConfirm ? faEyeSlash : faEye}
						className="w-5 h-5 cursor-pointer"
						onClick={() => setShowConfirm((prev) => !prev)}
					/>
				</Input>
				<div className="w-full text-red p-1 text-xs px-2">
					{errors.confirm && <span>{errors.confirm.message}</span>}
				</div>
			</div>

			<Button
				type="submit"
				disabled={isLoading}
				size="wide"
				className="justify-between text-white gradient-right-primary max-w-xs">
				Continuar
				<FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
			</Button>
		</form>
	);
}
