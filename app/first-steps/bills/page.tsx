
import Image from 'next/image';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import Badge from "@/components/ui/badge-icon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function BillsPage() {

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient gap-10 p-10">
      <h1 className="title-1 text-center">Ingresa tus gastos constantes</h1>
      <Badge variant="error" size="lg">
        <Image
          src="/assets/box_download.svg"
          width={32}
          height={32}
          alt="bill icon"
        />
      </Badge>
      <div className="flex flex-grow items-start justify-center w-full">
        <Drawer>
          <DrawerTrigger className="flex justify-between max-w-56 btn text-semibold text-primary">
            Crear una categoría
            <FontAwesomeIcon icon={faPlus} className="w-5 h-5" />
          </DrawerTrigger>
          <DrawerContent className="h-screen">
            <DrawerHeader>
              <DrawerTitle>Categoría de gastos</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-col justify-center items-center overflow-y-auto overflow-hidden gap-6 w-full h-full">
              <div className="card">
                <Badge variant="foreground-success" size="md">
                  <Image
                    src="/assets/home-smile.svg"
                    width={36}
                    height={36}
                    alt="home icon"
                  />
                </Badge>
                <p>Arriendos y dividendos</p>
              </div>
              <div className="card">
                <Badge variant="foreground-purple" size="md">
                  <Image
                    src="/assets/donate-blood.svg"
                    width={36}
                    height={36}
                    alt="home icon"
                  />
                </Badge>
                <p>Servicios básicos</p>
              </div>
              <div className="card">
                <Badge variant="foreground-info" size="md">
                  <Image src='/assets/wallet.svg' width={36} height={36} alt='home icon' />
                </Badge>
                <p>Créditos y seguros</p>
              </div>
              <div className="card">
                <Badge variant="foreground-error" size="md">
                  <Image
                    src="/assets/credit-card.svg"
                    width={36}
                    height={36}
                    alt="home icon"
                  />
                </Badge>
                <p>Tarjetas de crédito</p>
              </div>
              <div className="card">
                <Badge variant="foreground-neutral" size="md">
                  <Image src='/assets/file-blank.svg' width={36} height={36} alt='home icon' />
                </Badge>
                <p>Otro</p>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </main>
  );
}
