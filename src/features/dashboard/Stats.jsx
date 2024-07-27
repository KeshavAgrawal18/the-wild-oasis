import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, numCabins }) {
    // 1.
    const numBookings = bookings?.length;

    //2.
    const sales = bookings?.reduce((acc, cur) => acc + cur.totalPrice, 0);

    //3.
    const checkIns = confirmedStays.length;

    // 4.
    const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * numCabins)

    return (
        <>
            <Stat
                title="Boookings"
                color="blue"
                icon={<HiOutlineBriefcase />}
                value={numBookings}
            />
            <Stat
                icon={<HiOutlineBanknotes />}
                color="green"
                value={formatCurrency(sales)}
                title="sales"
            />
            <Stat
                icon={<HiOutlineCalendarDays />}
                color="indigo"
                value={checkIns}
                title="Check ins"
            />
            <Stat
                icon={<HiOutlineChartBar />}
                color="yellow"
                value={Math.round(occupation * 100) + "%"}
                title="Occupancy rate"
            />
        </>
    );
}

export default Stats;
