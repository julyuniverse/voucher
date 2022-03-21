import axios from "axios";

// 로그인
export const login = async (id_value, pw_value) => {
    return await axios.post("/api/auth.php", { type: "login", id: id_value, pw: pw_value });
}

// 이용권 등록
export const voucherRegistration = async (serial_number_value) => {
    return await axios.post("/api/voucher.php", {type: "voucher_registration", serial_number: serial_number_value});
}