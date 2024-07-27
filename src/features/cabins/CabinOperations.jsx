import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinOperations() {
    return (
        <TableOperations>
            <Filter filterField="discount" options={[{ label: "All", value: "all" }, { label: "No discount", value: "no-discount" }, { label: "With discount", value: "with-discount" }]} />

            <SortBy
                options={[
                    { label: "sort by name (A-Z)", value: "name-asc" },
                    { label: "sort by name (Z-A)", value: "name-desc" },
                    { label: "sort by capacity (low first)", value: "maxCapacity-asc" },
                    { label: "sort by capacity (high first)", value: "maxCapacity-desc" },
                    { label: "sort by Price (low first)", value: "regularPrice-asc" },
                    { label: "sort by Price (high first)", value: "regularPrice-desc" },
                ]}
            />

        </TableOperations>
    );
}

export default CabinOperations;