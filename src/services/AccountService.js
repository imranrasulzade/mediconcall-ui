import axios from "axios";

const ACCOUNT_API_BASE_URL = "http://localhost:8080/account";

class AccountService {
  signIn(loginReq) {
    return axios.post(ACCOUNT_API_BASE_URL + "/sign-in", loginReq)
  }

  forgotPassword(email) {
    return axios.post(ACCOUNT_API_BASE_URL + "/forgot-password?email=" + email)
  }

  recoveryPassword(passwordResetToken) {
    return axios.patch(ACCOUNT_API_BASE_URL + "/recovery-password", passwordResetToken);
  }

  signOut() {
    return axios.get(ACCOUNT_API_BASE_URL + "/sign-out");
  }

}

export default new AccountService();