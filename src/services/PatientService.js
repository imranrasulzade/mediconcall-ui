import axios from "axios";

const PATIENT_API_BASE_URL = "http://localhost:8080/patient";

class PatientService {
  savePatient(formData) {
    return axios.post(PATIENT_API_BASE_URL + "/register", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }

  updatePatient(formData) {
    return axios.put(PATIENT_API_BASE_URL + "/edit", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }

  getPatientInfo() {
    return axios.get(PATIENT_API_BASE_URL + "/info");
  }

  getPatientById(id) {
    return axios.get(PATIENT_API_BASE_URL + "/doctor/patient/" + id);
  }

}

export default new PatientService();