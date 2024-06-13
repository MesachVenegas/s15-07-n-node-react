import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import Badge from '@/components/ui/badge-icon';
import CustomLink from '@/components/ui/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen gap-10">
      <header className="flex items-center justify-center h-1/2 p-10">
        <h1 className="title-1 text-primary">Controla tus finanzas y cumple tus metas</h1>
      </header>
      <div className="welcome-gradient h-1/2 relative">
        <Badge className='absolute -top-16 bg-transparent shadow-none' >
          <Image
            src="/assets/bg-logo.svg"
            fill
            sizes="(max-width: 100%)"
            alt="ET: Tu asistente de otro mundo"
            className='object-contain drop-shadow-2xl'
          />
        </Badge>
        <Image src='/assets/bg-home.svg' width={500} height={400} alt='bg layer' className='absolute -top-[45%] left-0 -z-10' />
        <div className="w-full flex justify-center">
          <CustomLink href="/auth" variant="button" className='text-primary' size="btnWide">
            Comenzar
            <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
          </CustomLink>
        </div>
      </div>
    </main>
  );
}
