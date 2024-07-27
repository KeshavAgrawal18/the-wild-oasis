import AddCabin from "../features/cabins/AddCabin.jsx";
import CabinOperations from "../features/cabins/CabinOperations.jsx";
import Heading from "../ui/Heading.jsx";
import Row from "../ui/Row";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinOperations />
      </Row>
      <Row>
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
