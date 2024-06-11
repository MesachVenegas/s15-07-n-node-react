'use client'

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { getSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { PlanProps } from '@/types/goals';
import Button from '@/components/ui/button';
import { crateGoalSchema } from '@/validations/goal';
import { createGoal } from '@/services/goal';
import { ClipLoader } from 'react-spinners';

export default function EntriesForm({ plan }: PlanProps ) {
  const [isLoading, startTransition] = useTransition();
  const [value, setValue] = useState<string>('0');
  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, setValue: setFormValue } = useForm<z.infer<typeof crateGoalSchema>>({
    resolver: zodResolver(crateGoalSchema),
    defaultValues: {
      revenue: '0',
    }
  });

  function handlePadClick(value: string) {
    setValue(prevValue => {
      if (value === 'backspace') {
        const newValue = prevValue.slice(0, -1) || '0';
        setFormValue('revenue', newValue);
        return newValue;
      }
      if (value === '.' && prevValue.includes('.')) {
        return prevValue;
      }
      const newValue = prevValue === '0' ? value : prevValue + value;
      setFormValue('revenue', newValue);
      return newValue;
    });
  }

  const handleForm: SubmitHandler<z.infer<typeof crateGoalSchema>> = (data) => {
    startTransition( async () => {
      // get a current session data
      const session = await getSession();
      // get a current user id
      const userId = session?.user?.id;
      if(!userId) throw new Error("Don't exist session user");

      if(userId){
        // Create a goal registered in the database and redirect to the next step on saved.
        createGoal(data, userId, plan)
          .then( res => router.push(`/first-steps/bills?g=${res.data.id}`) )
          .catch(err => console.error(err.message))
      }
    })
  }

  return (
		<div className="flex flex-col justify-center items-center gap-10 w-full py-10">
			<form
				className="flex flex-col justify-center items-center gap-6 w-full"
				onSubmit={handleSubmit(handleForm)}>
				<div className="flex flex-col gap-2 justify-center items-end max-w-fit mx-auto">
					<label className="flex gap-1 items-end">
						$
						<input
							type="text"
							inputMode="numeric"
							title="income"
							disabled={isLoading}
							className="w-[160px] bg-transparent focus-visible:outline-none focus-visible:ring-0 px-1 text-4xl"
							{...register("revenue", { required: true })}
						/>
					</label>
					<div className="text-red text-sm max-w-xs">
						{errors.revenue && (
							<p className="text-red-500">{errors.revenue.message}</p>
						)}
					</div>
				</div>
				<Button
					type="submit"
					disabled={isLoading}
					className="justify-between text-white gradient-right-primary">
					Continuar
					{!isLoading && (
						<FontAwesomeIcon icon={faArrowRight} className="w- h-5" />
					)}
          <ClipLoader color="#fff" loading={isLoading} size={15} aria-label='Loading' />
				</Button>
			</form>
			<div className="grid grid-cols-3 w-full max-w-sm font-semibold place-content-center">
				<div
					role="button"
					aria-label="pad-1"
					className="number-pad-item"
					onClick={() => handlePadClick("1")}>
					1
				</div>
				<div
					role="button"
					aria-label="pad-2"
					className="number-pad-item"
					onClick={() => handlePadClick("2")}>
					2
				</div>
				<div
					role="button"
					aria-label="pad-3"
					className="number-pad-item"
					onClick={() => handlePadClick("3")}>
					3
				</div>
				<div
					role="button"
					aria-label="pad-4"
					className="number-pad-item"
					onClick={() => handlePadClick("4")}>
					4
				</div>
				<div
					role="button"
					aria-label="pad-5"
					className="number-pad-item"
					onClick={() => handlePadClick("5")}>
					5
				</div>
				<div
					role="button"
					aria-label="pad-6"
					className="number-pad-item"
					onClick={() => handlePadClick("6")}>
					6
				</div>
				<div
					role="button"
					aria-label="pad-7"
					className="number-pad-item"
					onClick={() => handlePadClick("7")}>
					7
				</div>
				<div
					role="button"
					aria-label="pad-8"
					className="number-pad-item"
					onClick={() => handlePadClick("8")}>
					8
				</div>
				<div
					role="button"
					aria-label="pad-9"
					className="number-pad-item"
					onClick={() => handlePadClick("9")}>
					9
				</div>
				<div
					role="button"
					aria-label="pad-dot"
					className="number-pad-item"
					onClick={() => handlePadClick(".")}>
					.
				</div>
				<div
					role="button"
					aria-label="pad-0"
					className="number-pad-item"
					onClick={() => handlePadClick("0")}>
					0
				</div>
				<div
					role="button"
					aria-label="pad-backspace"
					className="number-pad-item"
					onClick={() => handlePadClick("backspace")}>
					<FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
				</div>
			</div>
		</div>
	);
}
