import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import Loading from './loading';


export default async function Page() {
  const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))
  await sleep(1000)
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Dashboard!!!
        </h1>
      </Suspense>
    </main>
  );
}
