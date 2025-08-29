import { apiCall } from "./apiCalls";
import {  userUrls } from "../endPoints"

export const postLogin = (userData:any) => {
  return new Promise((resolve, reject) => {
    try {
        apiCall("post", userUrls.login, userData)
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err)
        })
    } catch(error){
        resolve({ status: 500, message: "Something went wrong"})
    }
  })    
}

export const postPunchIn = () => {
  return new Promise((resolve, reject) => {
    try {
        apiCall("post", userUrls.punchIn)
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err)
        })
    } catch(error){
        resolve({ status: 500, message: "Something went wrong"})
    }
  })    
}

export const getLastPunch = () => {
  return new Promise((resolve, reject) => {
    try {
        apiCall("get", userUrls.lastPunch)
        .then((response) => {
            resolve(response)
        })
        .catch((err) => {
            reject(err)
        })
    } catch(error){
        resolve({ status: 500, message: "Something went wrong"})
    }
  })    
}

export const getAttendance = (start_date: string, end_date: string) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = new URLSearchParams({
        start_date: start_date,
        end_date: end_date
      }).toString();
      
      const urlWithParams = `${userUrls.attendance}?${queryParams}`;
      
      apiCall("get", urlWithParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const getAttendanceSummary = (month: number, year: number) => {
  return new Promise((resolve, reject) => {
    try {
      const queryParams = new URLSearchParams({
        month: month.toString(),
        year: year.toString()
      }).toString();

      const urlWithParams = `${userUrls.attendanceSummary}?${queryParams}`;

      apiCall("get", urlWithParams)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
}

export const getUserBasic = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.userBasic)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// Personal Details

export const getPersonalDetails = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.personalDetails)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postPersonalDetails = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.personalDetails, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const putPersonalDetails = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("put", userUrls.personalDetails, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// Bank Details

export const getBankDetails = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.bankDetails)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postBankDetails = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.bankDetails, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// Job History

export const getJobHistory = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.jobHistory)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
}

export const postJobHistory = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.jobHistory, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// Education

export const getEducation = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.education)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
}

export const postEducation = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.education, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// Family 

export const getFamilyDetails = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.family)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postFamilyDetails = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.family, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// Emergency

export const getEmergencyDetails = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.emergency)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postEmergencyDetails = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.emergency, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

// References

export const getReferences = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.references)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};

export const postReferences = (data: any) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.references, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Something went wrong" });
    }
  });
};
