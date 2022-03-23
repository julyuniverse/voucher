import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../reducer/user/userReducer";
import logo96 from "../../assets/images/logo96.png";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        id: "",
        pw: "",
    });
    const dispatch = useDispatch();

    const handleFormData = (e) => {
        // Computed Property Name 문법 (키값 동적 할당)
        // ex) { [key] : "value" }
        setFormData({
            ...formData, // 기존 값들 유지
            [e.target.name]: e.target.value
        });
    }

    const submit = async (e) => {
        e.preventDefault();

        let regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

        if (formData.id === "") {
            alert("아이디를 입력해 주세요.");
            return false;
        } else if (regEmail.test(formData.id) === false) {
            alert("아이디를 이메일 형식으로 입력해 주세요.");
            return false;
        } else if (formData.pw === "") {
            alert("비밀번호를 입력해 주세요.");
            return false;
        }

        if (window.confirm("회원가입하시겠습니까?")) {
            const body = {
                id: formData.id,
                pw: formData.pw,
            };

            dispatch(await registerUser(body)); // dispatch() 함수를 통해서 store에 등록
            window.location = "/";
        }
    }

    return (
        <div className="flex justify-center items-center">
            <div className="mt-[160px]">
                <div className="flex justify-center items-center">
                    <img src={logo96} className="h-[72px] w-[72px] lg:h-auto lg:w-auto" alt="onepromath_logo" />
                </div>

                <div className="shadow-md bg-[#ffffff] rounded-lg w-[300px] mt-[40px] py-[14px] px-[20px] lg:w-[500px] lg:mt-[50px] lg:py-[20px] lg:px-[30px]">
                    <form>
                        <div>
                            <div>Email</div>
                            <div>
                                <input
                                    className="w-[100%] border border-[#d9dce1] rounded-md mt-[10px] p-[4px] lg:mt-[12px] lg:p-[10px]"
                                    type="text" name="id" placeholder="이메일를 입력해 주세요." value={formData.id || ""} onChange={handleFormData} />
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
                                    type="submit" onClick={submit}>회원가입</button>
                            </div>
                        </div>
                    </form>
                    <div className="mt-[10px] lg:mt-[12px]">
                        <div>
                            <Link className="flex justify-center items-center w-[100%] bg-[#f3f4f6] rounded-md p-[4px] lg:p-[10px]" to="/">취소</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RegisterPage;