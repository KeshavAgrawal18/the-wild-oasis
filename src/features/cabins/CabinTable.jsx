import { useSearchParams } from "react-router-dom";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner"
import Table from "../../ui/Table";
import CabinRow from "./CabinRow";
import { useCabins } from "./useCabins";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // 1. Filter  
  const filterValue = searchParams.get("discount") || "all";

  let filterCabins;
  if (filterValue === "all") filterCabins = cabins;
  if (filterValue === "no-discount") filterCabins = cabins.filter(cabin => cabin.discount === 0);
  if (filterValue === "with-discount") filterCabins = cabins.filter(cabin => cabin.discount > 0);

  // 2. Sort
  const sortValue = searchParams.get("sortBy") || "name-asc"
  const [field, direction] = sortValue.split("-");
  console.log(field, direction);

  const modifier = direction == "desc" ? -1 : 1;

  const sortCabins = filterCabins?.sort?.((a, b) => (a[field] - b[field]) * modifier)

  if (isLoading) return <Spinner />
  if (error) console.log(error);
  if (!sortCabins || !sortCabins.length) return <Empty resourceName="cabin" />


  return (
    <div>
      <Menus>
        <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>discount</div>
            <div></div>
          </Table.Header>
          <Table.Body
            render={(cabin => <CabinRow key={cabin.id} cabin={cabin} />)}
            data={sortCabins.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)} />
          <Table.Footer>
            <Pagination count={cabins.length} />
          </Table.Footer>
        </Table>
      </Menus>
    </div>
  );
}

export default CabinTable;