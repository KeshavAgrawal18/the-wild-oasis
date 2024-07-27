import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentBookings() {
    const [searchParams] = useSearchParams()
    const last = searchParams.get("last");
    const numDays = last ? Number(last) : 7;
    const queryDate = subDays(new Date(), numDays).toISOString();

    const { data: bookings, isLoading } = useQuery({
        queryKey: ["bookings", `last-${numDays}`],
        queryFn: () => getBookingsAfterDate(queryDate)
    })
    return { bookings, numDays, isLoading };
}
