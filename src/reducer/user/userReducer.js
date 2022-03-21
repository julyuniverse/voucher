import { login } from "../../api/axios";

// Action Type
const LOGIN_USER = "LOGIN_USER";

// Action Create Function
export const loginUser = async (data) => {
    let returnData = await login(data.id, data.pw).then(res => res.data);
    console.log(returnData);
    return {
        type: LOGIN_USER,
        isLogin: "y",
        loginIdNo: returnData.login_id_no,
        userId: returnData.id,
        userName: returnData.name,
    }
}

// initState
const initState = {
    isLogin: "n",
    loginIdNo: "",
    userId: "",
    userName: "",
}

// Reducer
export default function userReducer(state = initState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                isLogin: action.isLogin,
                loginIdNo: action.loginIdNo,
                userId: action.userId,
                userName: action.userName
            }
        default:
            return state;
    }
}