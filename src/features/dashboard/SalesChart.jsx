import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;


function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
      totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
      extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
      text: "#e5e7eb",
      background: "#18212f",
    }
    : {
      totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
      extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
      text: "#374151",
      background: "#fff",
    };

  let allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date()
  })
  const data = allDates.map(date => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings.filter(booking => isSameDay(date, booking.created_at)).reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings.filter(booking => isSameDay(date, new Date(booking.created_at))).reduce((acc, cur) => acc + cur.extrasPrice, 0),

    }
  });


  return (
    <StyledSalesChart>
      <Heading as="h2">Sales from {format(allDates.at(0), "dd MMM yyy")} to {format(allDates.at(-1), "dd MMM yyy")}</Heading>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <CartesianGrid strokeDasharray="4" />
          <XAxis dataKey="label" tick={colors.text} tickLine={colors.text} />
          <YAxis values="$" tick={colors.text} tickLine={colors.text} />
          <Area
            type="monotone"
            dataKey="totalSales"
            {...colors.totalSales}
            name="Total Sales"
            unit="$"
            strokeWidth="2"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            {...colors.extrasSales}
            name="Extra Sales"
            unit="$"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
