import { Skeleton } from "./ui/skeleton";

export default function TopGamesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[40vh] order-3 md:order-2">
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="bg-gray-800 rounded-lg h-full">
                    <div className="h-6 w-full rounded-lg bg-gray-800 my-2" />
                </Skeleton>
            ))}
        </div>
    )
}