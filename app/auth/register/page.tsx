import type { Metadata } from 'next';



import CustomLink from '@/components/ui/link';
import RegisterForm from '@/app/auth/_components/register-form';

export const metadata: Metadata = {
  title: "Crear una cuenta",
  description: "Registro de usuarios",
};

export default function RegisterPage() {
  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen gap-10 p-10 bg-gradient">
      <h1 className='text-xl'>Vamos a crearte una cuenta</h1>
      <RegisterForm />
      <div className='flex gap-2 text-xs'>
        ¿Ya tienes una cuenta?
        <CustomLink href="/auth/login" className="text-primary" >Inicia sesión</CustomLink>
      </div>
    </main >
  );
}
