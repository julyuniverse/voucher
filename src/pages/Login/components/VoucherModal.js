import { useState } from "react";
import { voucherRegistration } from "../../../api/axios";

const VoucherModal = (props) => {
    const [serialNumber, setSerialNumber] = useState("");

    const handleSerialNumber = (e) => {
        setSerialNumber(e.target.value);
    }

    // const submit = async () => {
    //     let data = await login(formData.id, formData.pw).then(res => res.data);
    //     console.log(data);
    // }

    const submit = async (e) => {
        e.preventDefault();
        //로그인을 진행하기위해서
        //첫번째 useDispatch(액션) 을 활용해서 액션을 dispatch해준다
        let data = await voucherRegistration(serialNumber).then(res => res.data);
        console.log(data);
    }

    return (
        <div className="absolute inset-0 bg-[#cccccc]">
            <div>
                <div>
                    <form>
                        <div>
                            이용권 시리얼 넘버
                        </div>
                        <div>
                            <input type="text" name="serial_number" placeholder="시리얼 넘버를 입력해 주세요." value={serialNumber || ""} onChange={handleSerialNumber} />
                        </div>
                        <button type="submit" onClick={submit}>등록</button>
                    </form>
                </div>
                <div>
                    <button type="button" onClick={props.handleModalClose}>X</button>
                </div>
            </div>
        </div>
    )
}

export default VoucherModal;