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

  updateDoctor(doctor) {
    return axios.put(DOCTOR_API_BASE_URL + "/edit", doctor)
  }

  getDoctorInfo() {
    return axios.get(DOCTOR_API_BASE_URL + "/info");
  }

  getDoctorById(id) {
    return axios.get(DOCTOR_API_BASE_URL + "/patient/doctor/" + id);
  }

  getDoctorByName(name) {
    return axios.get(DOCTOR_API_BASE_URL + "/patient/doctor-name/" + name);
  }

  getDoctors() {
    return axios.get(DOCTOR_API_BASE_URL + "/admin/doctors");
  }

  getDoctorByIdForAdmin(id) {
    return axios.get(DOCTOR_API_BASE_URL + "/admin/doctor/" + id);
  }

}

export default new DoctorService();