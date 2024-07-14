import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserService {

  // updateUser(formData) {
  //   return axios.put(USER_API_BASE_URL + "/edit", formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data'
  //       }
  //     })
  // }


  getUserInfo(token) {
    return axios.get(USER_API_BASE_URL + "/info", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
  }


  getUsersForAdmin(token) {
    return axios.get(USER_API_BASE_URL + "/admin/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
  }


  updateStatus(token, userID, status) {
    return axios.patch(USER_API_BASE_URL + "/admin/status", {
      id: userID,
      userStatus: status
  }, {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  }

}

export default new UserService();