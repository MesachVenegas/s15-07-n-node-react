import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Primeros pasos",
  description: "Configuración inicial para ajustar tus preferencias y metas.",
};

export default function FirstStepsLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      {children}
    </>
  )
}
