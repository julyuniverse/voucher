import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, registerVoucher } from "../../reducer/user/userReducer";
import { useSelector } from "react-redux";
import VoucherModal from "./components/VoucherModal";
import { ReactComponent as Logo } from "../../assets/svgs/logo.svg";
import help1 from "../../assets/images/help1.png";

const LoginPage = () => {
    const userReducer = useSelector((state) => state.userReducer); // reducer가 하나라면 state.userId로 가능하지만 여러 개인 reducer들을 하나로 합쳤기 때문에 해당 reducer를 선택하고 하위 state를 찾는다.
    const [formData, setFormData] = useState({
        id: "",
        pw: "",
    });
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);

    const childRef = useRef(); // 자식 컴포넌트 설정

    const handleFormData = (e) => {
        // Computed Property Name 문법 (키값 동적 할당)
        // ex) { [key] : "value" }
        setFormData({
            ...formData, // 기존 값들 유지
            [e.target.name]: e.target.value
        });
    }

    const submit = async (e) => { // 로그인
        e.preventDefault();

        if (formData.id === "") {
            alert("아이디를 입력해 주세요.");
            return false;
        } else if (formData.pw === "") {
            alert("비밀번호를 입력해 주세요.");
            return false;
        }

        const body = {
            id: formData.id,
            pw: formData.pw,
        };

        dispatch(await loginUser(body)); // dispatch() 함수를 통해서 store에 등록
        setFormData({ ...formData, pw: "" });
    }

    const logout = async () => { // 로그아웃
        const body = {
            login_id_no: userReducer.loginIdNo
        };

        dispatch(await logoutUser(body)); // dispatch() 함수를 통해서 store에 등록

        childRef.current.emptySerialNumber(); // 자식 컴포넌트에서 설정한 함수나 변수들을 사용
    }

    const handleModalClose = () => {
        setShow(false);
    };

    const handleModalOpen = () => {
        setShow(true);
    };

    return (
        <div className="flex justify-center items-center">
            {/* <div>
                {userReducer.loginState}<br />
                {userReducer.loginIdNo}<br />
                {userReducer.userId}<br />
                {userReducer.schoolIdState}<br />
                {userReducer.payState}<br />
                {userReducer.experienceTicketState}<br />
            </div> */}

            <div hidden={!show}>
                <VoucherModal handleModalClose={handleModalClose} dispatch={dispatch} registerVoucher={registerVoucher} userReducer={userReducer} ref={childRef} /> {/* ref 자식 설정 */}
            </div>

            <div className="mt-[160px]">
                <div className="flex justify-center items-center">
                    <Logo width="96" height="96" className="h-[72px] w-[72px] lg:h-auto lg:w-auto" />
                </div>

                <div className="shadow-md bg-[#ffffff] rounded-lg w-[300px] mt-[40px] py-[14px] px-[20px] lg:w-[500px] lg:mt-[50px] lg:py-[20px] lg:px-[30px]">
                    {userReducer.loginState === 0 ? (
                        <div>
                            <form>
                                <div>
                                    <div>일프로연산 앱 ID</div>
                                    <div>
                                        <input
                                            className="w-[100%] border border-[#d9dce1] rounded-md mt-[10px] p-[4px] lg:mt-[12px] lg:p-[10px]"
                                            type="text" name="id" placeholder="아이디를 입력해 주세요." value={formData.id || ""} onChange={handleFormData} />
                                    </div>
                                </div>
                                <div className="mt-[14px] lg:mt-[20px]">
                                    <div>Password</div>
                                    <div>
                                        <input
                                            className="w-[100%] border border-[#d9dce1] rounded-md mt-[10px] p-[4px] lg:mt-[12px] lg:p-[10px]"
                                            type="password" name="pw" placeholder="비밀번호를 입력해 주세요." value={formData.pw || ""} onChange={handleFormData} />
                                    </div>
                                </div>
                                <div className="mt-[20px] lg:mt-[26px]">
                                    <div>
                                        <button
                                            className="w-[100%] bg-[#005ade] text-[#ffffff] rounded-md p-[4px] lg:p-[10px]"
                                            type="submit" onClick={submit}>로그인</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <div>
                                    <div>일프로연산 앱 ID</div>
                                    <div>
                                        <div className="w-[100%] border border-[#d9dce1] rounded-md mt-[10px] p-[4px] lg:mt-[12px] lg:p-[10px]">
                                            {userReducer.userId}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-[20px] lg:mt-[26px]">
                                <button
                                    className="w-[100%] bg-[#005ade] text-[#ffffff] rounded-md p-[4px] lg:p-[10px]"
                                    type="button" onClick={handleModalOpen}>이용권 등록</button>
                            </div>
                            <div className="mt-[10px] lg:mt-[12px]">
                                <button
                                    className="w-[100%] bg-[#f3f4f6] rounded-md p-[4px] lg:p-[10px]"
                                    type="button" onClick={logout}>로그아웃</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-[60px] mb-[120px] lg:mt-[80px] lg:mb-[160px]">
                    <div className="w-[300px] lg:w-[auto]">
                        <img src={help1} alt="help1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;