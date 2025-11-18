import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mx-auto w-full space-y-6 px-4 py-10 h-screen flex flex-col">
      <div className="flex w-full justify-between">
        <div className="space-x-2 flex flex-row">
          <Skeleton className="h-9 w-[250px]" />
        </div>
        <div className="space-x-2 flex flex-row">
          <Skeleton className="h-9 w-[100px]" />
        </div>
      </div>

      <div className="flex  flex-col space-y-4">
        <Skeleton className="h-[400px] w-full" />
      </div>
      <div className="space-x-2 flex flex-row justify-end">
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-[100px]" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
        <Skeleton className="h-9 w-9" />
      </div>
    </div>
  )
}
