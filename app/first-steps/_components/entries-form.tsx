'use client'

import { ChangeEvent, FormEvent, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Button from '@/components/ui/button';

export default function EntriesForm() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<number | string>(0);

  function handlePadClick(value: string) {
    setValue(prevEntry => {
      if (value === 'backspace') {
        return prevEntry.toString().slice(0, -1) || '0';
      }
      if (value === '.' && prevEntry.toString().includes('.')) {
        return prevEntry;
      }
      return prevEntry === 0 ? value : prevEntry + value;
    });
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>){
    const newValue = e.target.value;
    if(/^\d*$/.test(newValue)){
      setValue(newValue)
    }
  }

  function handleForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(value)
  }

  return (
    <div className="flex flex-col justify-center items-center gap-10 w-full py-10">
      <form className="flex flex-col justify-center items-center gap-6 w-full" onSubmit={handleForm}>
        <div className="flex justify-center items-end max-w-fit mx-auto">
          $
          <input
            type='text'
            inputMode='numeric'
            title='income'
            value={value}
            className="w-[160px] bg-transparent focus-visible:outline-none focus-visible:ring-0 px-1 text-4xl"
            onChange={handleChange}
          />
        </div>
        <Button
          className="justify-between text-white gradient-right-primary">
          Continuar
          <FontAwesomeIcon icon={faArrowRight} className="w- h-5" />
        </Button>
      </form>
      <div className="grid grid-cols-3 w-full max-w-sm font-semibold place-content-center">
        <div role="button" aria-label='pad-1' className="number-pad-item" onClick={() => handlePadClick('1')}>
          1
        </div>
        <div role="button" aria-label='pad-2' className="number-pad-item" onClick={() => handlePadClick('2')}>
          2
        </div>
        <div role="button" aria-label='pad-3' className="number-pad-item" onClick={() => handlePadClick('3')}>
          3
        </div>
        <div role="button" aria-label='pad-4' className="number-pad-item" onClick={() => handlePadClick('4')}>
          4
        </div>
        <div role="button" aria-label='pad-5' className="number-pad-item" onClick={() => handlePadClick('5')}>
          5
        </div>
        <div role="button" aria-label='pad-6' className="number-pad-item" onClick={() => handlePadClick('6')}>
          6
        </div>
        <div role="button" aria-label='pad-7' className="number-pad-item" onClick={() => handlePadClick('7')}>
          7
        </div>
        <div role="button" aria-label='pad-8' className="number-pad-item" onClick={() => handlePadClick('8')}>
          8
        </div>
        <div role="button" aria-label='pad-9' className="number-pad-item" onClick={() => handlePadClick('9')}>
          9
        </div>
        <div role="button" aria-label='pad-dot' className="number-pad-item" onClick={() => handlePadClick('.')}>
          .
        </div>
        <div role="button" aria-label='pad-0' className="number-pad-item" onClick={() => handlePadClick('0')}>
          0
        </div>
        <div role="button" aria-label='pad-backspace' className="number-pad-item" onClick={() => handlePadClick('backspace')}>
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
