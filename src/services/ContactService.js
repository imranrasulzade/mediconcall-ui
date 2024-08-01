import axios from "axios";

const CONTACT_API_BASE_URL = "http://localhost:8080/contact";

class ContactService {
  deleteConnection(token, doctorId) {
    return axios.delete(CONTACT_API_BASE_URL + "/patient?doctorId=" + doctorId, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  sendRequest(token, doctorId) {
    return axios.post(CONTACT_API_BASE_URL + "/patient/request?doctorId=" + doctorId, {}, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  getContact(token, doctorId) {
    return axios.get(CONTACT_API_BASE_URL + "/patient/check?doctorId=" + doctorId, {
      headers: { 'Authorization': `Bearer ${token}` }
  });
  }

}

export default new ContactService();