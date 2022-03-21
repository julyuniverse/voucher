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

        let data = await voucherRegistration(serialNumber, props.loginIdNo).then(res => res.data);

        console.log(data);

        if (data.voucher_registration_state === 0 && data.voucher_state === 2) {
            alert("시리얼 넘버가 존재하지 않아요. 다시 한번 확인해 주세요.");
            return false;
        } else if (data.voucher_registration_state === 0 && data.voucher_state === 3) {
            alert("이미 사용한 시리얼 넘버에요. 다시 한번 확인해 주세요.");
            return false;
        } else if (data.voucher_registration_state === 0 && data.voucher_state === 4) {
            alert("등록 기간이 지난 이용권입니다. 다시 한번 확인해 주세요.");
            return false;
        }

        alert("이용권 등록이 완료되었습니다. 일프로연산 학습을 시작해 주세요!");
        props.handleModalClose();
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