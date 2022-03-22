import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducer/user/userReducer";
import { useSelector } from "react-redux";
import VoucherModal from "./components/VoucherModal";

const LoginPage = () => {
    const userReducer = useSelector((state) => state.userReducer); // reducer가 하나라면 state.userId로 가능하지만 여러 개인 reducer들을 하나로 합쳤기 때문에 해당 reducer를 선택하고 하위 state를 찾는다.
    const [formData, setFormData] = useState({
        id: "",
        pw: "",
    });
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);


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

        const body = {
            id: formData.id,
            pw: formData.pw,
        };

        dispatch(await loginUser(body)); // dispatch() 함수를 통해서 store에 등록
    }

    const logout = () => { // 로그아웃
        localStorage.clear();
        window.location.reload();
    }

    const handleModalClose = () => {
        setShow(false);
    };

    const handleModalOpen = () => {
        setShow(true);
    };

    return (
        <div>
            <div hidden={!show}>
                <VoucherModal handleModalClose={handleModalClose} loginIdNo={userReducer.loginIdNo} />
            </div>

            <div>
                {userReducer.isLogin}<br />
                {userReducer.loginIdNo}<br />
                {userReducer.userId}<br />
                {userReducer.userName}<br />
            </div>

            <div>
                로고
            </div>
            {userReducer.isLogin === 'n' ? (
                <div>
                    <form>
                        <div>
                            <div>ID</div>
                            <div>
                                <input type="text" name="id" placeholder="아이디를 입력해 주세요." value={formData.id || ""} onChange={handleFormData} />
                            </div>
                        </div>
                        <div>
                            <div>PW</div>
                            <div>
                                <input type="text" name="pw" placeholder="비밀번호를 입력해 주세요." value={formData.pw || ""} onChange={handleFormData} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <button type="submit" onClick={submit}>로그인</button>
                            </div>
                        </div>
                    </form>
                    <div>
                        <div>
                            <button type="button">회원가입</button>
                            </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        <div>
                            {userReducer.userId}
                        </div>
                    </div>
                    <div>
                        <button type="button" onClick={handleModalOpen}>이용권 등록</button>
                    </div>
                    <div>
                        <button type="button" onClick={logout}>로그아웃</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default LoginPage;