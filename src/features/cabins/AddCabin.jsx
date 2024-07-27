import CabinTable from "./CabinTable"
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {

    return (
        <>
            <CabinTable />
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form" >
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </ >
    );
}

export default AddCabin;