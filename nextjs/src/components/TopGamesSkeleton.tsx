import { Skeleton } from "@/components/ui/skeleton";

export default function TopGamesSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[1000px] md:h-[40vh] order-3 md:order-2 w-full md:w-[96vw]">
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="bg-gray-800 rounded-lg h-full w-full"/>
            ))}
        </div>
    )
}