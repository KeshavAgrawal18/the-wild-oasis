import { HiArrowRightStartOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogout } from "./useLogout";

function Logout() {
    const { logout, isLoading } = useLogout()
    return (
        <ButtonIcon onClick={logout} disabled={isLoading}>
            {isLoading ? <SpinnerMini /> : <HiArrowRightStartOnRectangle />}
        </ButtonIcon>
    );
}

export default Logout;