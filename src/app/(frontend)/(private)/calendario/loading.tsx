import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto w-full space-y-6 px-4 py-10 h-screen flex flex-col">
      <div className="flex w-full justify-between">
        <div className="space-x-2 flex flex-row">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-[200px]" />
        </div>
        <div className="space-x-2 flex flex-row">
          <Skeleton className="h-9 w-[100px]" />
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>

      <div className="grid gap-4 grid-cols-7 grid-rows-3 flex-1">
        {[...Array(21)].map((_, i) => (
          <Skeleton key={i} className="h-full w-full" />
        ))}
      </div>
    </div>
  )
}
