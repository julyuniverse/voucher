import { login, logout, voucherRegistration } from "../../api/axios";

// Action Type
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const REGISTER_VOUCHER = "REGISTER_VOUCHER";

// Action Create Function
export const loginUser = async (data) => { // 로그인
    let returnData = await login(data.id, data.pw).then(res => res.data);

    // Parameters
    let loginState = 0;
    let loginIdNo = 0;
    let id = "";
    let schoolIdState = 0;
    let payState = 0;
    let experienceTicketState = 0;

    if (returnData.success === 0) {
        if (returnData.error_code === 1) { // ID 없음
            alert("아이디를 확인해 주세요.");
        } else if (returnData.error_code === 2) { // 비밀번호 틀림
            alert("비밀번호를 확인해 주세요.");
        }
    } else if (returnData.success === 1) {
        loginState = 1;
        loginIdNo = returnData.login_id_no;
        id = returnData.id;
        schoolIdState = returnData.school_id_state;
        payState = returnData.pay_state;
        experienceTicketState = returnData.experience_ticket_state;
    }

    return {
        type: LOGIN_USER,
        loginState: loginState,
        loginIdNo: loginIdNo,
        userId: id,
        schoolIdState: schoolIdState,
        payState: payState,
        experienceTicketState: experienceTicketState,
    }
}

export const logoutUser = async (data) => { // 로그아웃
    let returnData = await logout(data.login_id_no).then(res => res.data);

    // Parameters
    let loginState = 0;
    let loginIdNo = 0;
    let id = "";
    let schoolIdState = 0;
    let payState = 0;
    let experienceTicketState = 0;

    return {
        type: LOGOUT_USER,
        loginState: loginState,
        loginIdNo: loginIdNo,
        userId: id,
        schoolIdState: schoolIdState,
        payState: payState,
        experienceTicketState: experienceTicketState,
    }
}

export const registerVoucher = async (data) => { // 이용권 등록
    let returnData = await voucherRegistration(data.serial_number, data.login_id_no).then(res => res.data);

    // Parameters
    let payState = data.pay_state;
    let experienceTicketState = data.experience_ticket_state;

    if (returnData.success === 0 && returnData.voucher_state === 2) {
        alert("이용권 코드가 존재하지 않아요. 다시 한번 확인해 주세요.");
    } else if (returnData.success === 0 && returnData.voucher_state === 3) {
        alert("이미 사용한 이용권이에요. 다시 한번 확인해 주세요.");
    } else if (returnData.success === 0 && returnData.voucher_state === 4) {
        alert("등록 기간이 지난 이용권입니다. 다시 한번 확인해 주세요.");
    } else if (returnData.success === 0 && returnData.voucher_state === 5) {
        alert("이미 결제한 유료 계정은 체험권을 사용할 수 없어요.");
    } else if (returnData.success === 0 && returnData.voucher_state === 6) {
        alert("이미 체험권을 이용 중이라 체험권을 중복 사용할 수 없어요.");
    } else if (returnData.success === 0 && returnData.voucher_state === 7) {
        alert("이미 이 전에 같은 체험권을 이용한 내역이 있어서 사용할 수 없어요.");
    } else if (returnData.success === 0 && returnData.voucher_state === 8) {
        alert("학교 또는 학원 계정은 이용권 또는 체험권을 등록할 수 없어요.");
    } else if (returnData.success === 1 && returnData.voucher_state === 1) {
        alert("이용권 등록이 완료되었습니다. 일프로연산 학습을 시작해 주세요!");
        payState = 1;
        if (returnData.voucher_type === 42) { // 체험권일 경우
            experienceTicketState = 1;
        } else {
            experienceTicketState = 0;
        }
        data.handleModalClose();
        data.setSerialNumber("");
    } else {
        alert("이용권 등록이 불가합니다. 고객센터로 문의해 주세요.");
    }

    return {
        type: REGISTER_VOUCHER,
        payState: payState,
        experienceTicketState: experienceTicketState,
    }
}

// Initial State
const initialState = {
    loginState: 0, // 로그인 상태
    loginIdNo: 0, // LOGIN_ID->NO
    userId: "", // 사용자 ID
    schoolIdState: 0, // 학교||학원 계정 상태
    payState: 0, // 결제 상태
    experienceTicketState: 0, // 체험권 상태
}

// Reducer
export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                loginState: action.loginState,
                loginIdNo: action.loginIdNo,
                userId: action.userId,
                schoolIdState: action.schoolIdState,
                payState: action.payState,
                experienceTicketState: action.experienceTicketState,
            }
        case LOGOUT_USER:
            return {
                loginState: action.loginState,
                loginIdNo: action.loginIdNo,
                userId: action.userId,
                schoolIdState: action.schoolIdState,
                payState: action.payState,
                experienceTicketState: action.experienceTicketState,
            }
        case REGISTER_VOUCHER:
            return {
                ...state,
                payState: action.payState,
                experienceTicketState: action.experienceTicketState,
            }
        default:
            return state;
    }
}