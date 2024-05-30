
import { useCallback } from 'react';
import { useSearchParams } from "next/navigation";


export default function useQueryParams() {
  const searchParams = useSearchParams()

  const createQueryParams = useCallback((name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.append(name, value);

    return params.toString();
  },
    [searchParams]
  )


  return createQueryParams;
}
