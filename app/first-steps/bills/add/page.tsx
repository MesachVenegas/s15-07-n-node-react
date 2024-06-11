import Badge from "@/components/ui/badge-icon";
import Image from "next/image";

export default function AddBill(){

  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full gap-10 bg-gradient p-10">
      <h1 className="title-1 text-center">Ingresa tus gastos constantes</h1>
      <Badge variant="error" size="lg">
        <Image src="/assets/box_download.svg" alt="box " width={32} height={32} />
      </Badge>
    </main>
  )
}