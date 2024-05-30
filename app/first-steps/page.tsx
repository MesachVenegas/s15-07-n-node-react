'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

import Badge from "@/components/ui/badge-icon";
import Objectives from "./_components/objetives";


export default function FirstSteps() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen w-full gap-10 bg-gradient p-10">
      <h1 className="title-1 text-center">Selecciona tus objetivo</h1>
      <Badge variant="warning" size="lg">
        <FontAwesomeIcon icon={faFlag} className="w-full h-full" />
      </Badge>
      <Objectives />
    </main>
  );
}
