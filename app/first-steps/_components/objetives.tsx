'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple, faFile, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

import Badge from "@/components/ui/badge-icon";



export default function Objectives() {
  const pathname = usePathname();

  const createQueryParams = (query:string, value:string) => {
		const params = new URLSearchParams();
		params.append(query, value);

    return params.toString();
	};

  return (
    <div className="flex flex-col gap-6 justify-start font-semibold text-slate-500 items-center">
      <Link
        href={pathname + '/entries' + '?' + createQueryParams('plan', 'control de mis gastos')}
        className="card bg-white">
        <Badge variant="foreground-error" size="md">
          <FontAwesomeIcon icon={faChartSimple} className="w-full h-full" />
        </Badge>
        <p>Control de mis gastos</p>
      </Link>
      <Link
        href={pathname + '/entries' + '?' + createQueryParams('plan', 'juntar para comprar')}
        className="card bg-white">
        <Badge variant="foreground-success" size="md" className="relative">
          <Image
            src="/assets/coin.svg"
            alt="coin icon"
            width={36}
            height={36}
          />
        </Badge>
        <p>Juntar para comprar</p>
      </Link>
      <Link
        href={pathname + '/entries' + '?' + createQueryParams('plan', 'ahorrar para invertir')}
        className="card bg-white">
        <Badge variant="foreground-purple" size="md">
          <Image
            src="/assets/flower.svg"
            alt="coin icon"
            width={36}
            height={36}
          />
        </Badge>
        <p>Ahorrar para invertir</p>
      </Link>
      <Link
        href={pathname + '/entries' + '?' + createQueryParams('plan', 'ahorrar para imprevistos')}
        className="card bg-white">
        <Badge variant="foreground-warning" size="md">
          <FontAwesomeIcon
            icon={faTriangleExclamation}
            className="w-full h-full"
          />
        </Badge>
        <p>Ahorrar para imprevistos</p>
      </Link>
      <Link href={pathname + '/entries' + '?' + createQueryParams('plan', 'otro')} className="card bg-white">
        <Badge variant="foreground-neutral" size="md">
          <FontAwesomeIcon icon={faFile} className="w-full h-full" />
        </Badge>
        <p>Otro</p>
      </Link>
    </div>
  )
}
