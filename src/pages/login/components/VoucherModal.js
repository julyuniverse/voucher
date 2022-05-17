import { useState, forwardRef, useImperativeHandle } from "react";

const VoucherModal = forwardRef((props, ref) => { // forwardRef로 부모에게 연결
    const [serialNumber, setSerialNumber] = useState("");

    // Parent component는 이제 childRef.current.emptySerialNumber()를 통해 해당 값을 가져갈 수 있게 됩니다.
    useImperativeHandle(ref, () => ({
        emptySerialNumber: () => { setSerialNumber(""); },
    }));

    const handleSerialNumber = (e) => {
        setSerialNumber(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();

        if (props.userReducer.schoolIdState === 1) { // 학교||학원 계정은 이용권||체험권 등록 불가
            alert("학교 또는 학원 계정은 이용권 또는 체험권을 등록할 수 없어요.");
            return false;
        }

        if (serialNumber === "") {
            alert("이용권 코드를 입력해 주세요.");
            return false;
        }

        if (props.userReducer.payState === 1 && props.userReducer.experienceTicketState === 1) { // 체험권을 이용중인 사용자라면
            if (window.confirm("체험권을 이용 중입니다. 현재 체험권 종료 날짜 이후로 이어서 이용권을 추가로 사용하시겠습니까?")) {
                const body = {
                    serial_number: serialNumber,
                    login_id_no: props.userReducer.loginIdNo,
                    pay_state: props.userReducer.payState,
                    school_id_state: props.userReducer.schoolIdState,
                    experience_ticket_state: props.userReducer.experienceTicketState,
                    handleModalClose: props.handleModalClose,
                    setSerialNumber: setSerialNumber,
                };

                props.dispatch(await props.registerVoucher(body)); // dispatch() 함수를 통해서 store에 등록

                return false;
            } else {
                return false;
            }
        } else if (props.userReducer.payState === 1 && props.userReducer.experienceTicketState === 0) { // 유료 계정이라면
            if (window.confirm("이미 결제한 유료 계정입니다. 현재 결제 종료 날짜 이후로 이어서 이용권을 추가로 사용하시겠습니까?")) {
                const body = {
                    serial_number: serialNumber,
                    login_id_no: props.userReducer.loginIdNo,
                    pay_state: props.userReducer.payState,
                    school_id_state: props.userReducer.schoolIdState,
                    experience_ticket_state: props.userReducer.experienceTicketState,
                    handleModalClose: props.handleModalClose,
                    setSerialNumber: setSerialNumber,
                };

                props.dispatch(await props.registerVoucher(body)); // dispatch() 함수를 통해서 store에 등록

                return false;
            } else {
                return false;
            }
        }

        if (window.confirm("등록하시겠습니까?")) {
            const body = {
                serial_number: serialNumber,
                login_id_no: props.userReducer.loginIdNo,
                pay_state: props.userReducer.payState,
                school_id_state: props.userReducer.schoolIdState,
                experience_ticket_state: props.userReducer.experienceTicketState,
                handleModalClose: props.handleModalClose,
                setSerialNumber: setSerialNumber,
            };

            props.dispatch(await props.registerVoucher(body)); // dispatch() 함수를 통해서 store에 등록
        }
    }

    return (
        <div>
            <div className="absolute inset-0 bg-[#cccccc] opacity-50"></div>
            <div className="fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#ffffff] w-[320px] rounded-lg py-[14px] px-[20px]">
                <div>
                    <form>
                        <div>
                            이용권 코드
                        </div>
                        <div>
                            <input
                                className="w-[100%] border border-[#d9dce1] rounded-md mt-[10px] p-[4px] lg:mt-[12px] lg:p-[10px]"
                                type="text" name="serial_number" placeholder="이용권 코드를 입력해 주세요." value={serialNumber || ""} onChange={handleSerialNumber} />
                        </div>

                        <div className="mt-[20px] lg:mt-[26px]">
                            <div>
                                <button
                                    className="w-[100%] bg-[#005ade] text-[#ffffff] rounded-md p-[4px] lg:p-[10px]"
                                    type="submit" onClick={submit}>등록</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="mt-[10px] lg:mt-[12px]">
                    <div>
                        <button type="button" className="flex justify-center items-center w-[100%] bg-[#f3f4f6] rounded-md p-[4px] lg:p-[10px]" onClick={props.handleModalClose}>취소</button>
                    </div>
                </div>
            </div>
        </div>

    )
})

export default VoucherModal;