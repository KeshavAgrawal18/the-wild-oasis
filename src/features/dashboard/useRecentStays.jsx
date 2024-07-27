import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
    const [searchParams] = useSearchParams()
    const last = searchParams.get("last");
    const numDays = last ? Number(last) : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: stays, isLoading } = useQuery({
        queryKey: ["stays", `last-${numDays}`],
        queryFn: () => getStaysAfterDate(queryDate)
    })

    const confirmedStays = stays?.filter(stay => stay.status === "checked-in" || stay.status === "checked-out")

    return { stays, isLoading, confirmedStays };
}
