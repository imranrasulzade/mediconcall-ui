import axios from "axios";

const DOCTOR_API_BASE_URL = "http://localhost:8080/doctor";

class DoctorService {
  saveDoctor(formData) {
    return axios.post(DOCTOR_API_BASE_URL + "/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }


  fetchDoctors(token, page) {
    return axios.get(DOCTOR_API_BASE_URL + "/patient/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params: {
          page: page,
          size : 4
      }
  })};


  handleSearch(token, params) {
    return axios.get(DOCTOR_API_BASE_URL + "/patient/search", {
      headers: {
          Authorization: `Bearer ${token}`
      },
      params
  });
  }


  getSpecialities(token) {
    return axios.get(DOCTOR_API_BASE_URL + "/specialties", {
      headers: {
          Authorization: `Bearer ${token}`
      }
  });
  }


  getDoctorsForAdmin(token) {
    return axios.get(DOCTOR_API_BASE_URL + "/admin/doctors", {
      headers: { 'Authorization': `Bearer ${token}` }
      });
  }

  getDoctorByIdForAdmin(id) {
    return axios.get(DOCTOR_API_BASE_URL + "/admin/doctor/" + id);
  }

  getDoctorById (token, doctorId) {
    const response = axios.get(DOCTOR_API_BASE_URL + "/patient/doctor?id=" + doctorId, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response;
}

}

export default new DoctorService();