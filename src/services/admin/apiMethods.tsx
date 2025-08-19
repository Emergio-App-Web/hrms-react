import { apiCall } from "./apiCalls";
import { adminUrls, attendance, employeeBasics, employeeSettings } from "../endPoints";

// ADMIN GENERAL API

export const getUser = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.userDetails, null)
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

export const getGeneral = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.general, null)
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

export const editGeneral = (replaceSettingsData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("put", adminUrls.general, replaceSettingsData)
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

//Billing info
export const getBilling = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.billingInfo, null)
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

export const addBilling = (billingData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", adminUrls.billingInfo, billingData)
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

export const editBilling = (replaceBillingData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("put", adminUrls.billingInfo, replaceBillingData)
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

export const deleteBilling = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.department}?id=${id}`;
            apiCall("delete", url, null)
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

//Admin - Department

export const getDepartment = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.department, null)
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

export const addDepartment = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", adminUrls.department, userData)
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

export const editDepartment = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.department}?id=${id}`;
            apiCall("put", url, userData)
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

export const removeDepartment = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.department}?id=${id}`;
            apiCall("delete", url, null)
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

//Manage Designation

export const getDesignation = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.designation, null)
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

export const addDesignation = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", adminUrls.designation, userData)
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

export const editDesignation = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.designation}?id=${id}`;
            apiCall("put", url, userData)
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

export const removeDesignation = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.designation}?id=${id}`;
            apiCall("delete", url, null)
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

//Manage Bands/Grades

export const getBand = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.band, null)
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

export const addBand = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", adminUrls.band, userData)
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

export const editBand = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.band}?id=${id}`;
            apiCall("put", url, userData)
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

export const removeBand = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.band}?id=${id}`;
            apiCall("delete", url, null)
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

//Manage Business Unit

export const getBusinessUnit = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", adminUrls.businessUnit, null)
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

export const addBusinessUnit = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", adminUrls.businessUnit, userData)
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

export const editBusinessUnit = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.businessUnit}?id=${id}`;
            apiCall("put", url, userData)
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

export const removeBusinessUnit = (id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${adminUrls.businessUnit}?id=${id}`;
            apiCall("delete", url, null)
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

//EMPLOYEE SETTINGS API


export const getEmpSettings = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", employeeSettings.empProfileSettings, null)
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

export const postEmpSettings = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", employeeSettings.empProfileSettings, userData)
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

export const updateEmpSettings = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${ employeeSettings.empProfileSettings}?id=${id}`;
            apiCall("put", url, userData)
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

export const getDocSettings = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", employeeSettings.empDocSettings, null)
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

export const postDocSettings = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", employeeSettings.empDocSettings, userData)
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

export const updateDocSettings = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${ employeeSettings.empDocSettings}?id=${id}`;
            apiCall("put", url, userData)
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

//ATTENDENCE SETTINGS API

export const getAttendance = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.attendanceSettings, null)
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

export const postAttendance = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.attendanceSettings, userData)
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

export const updateAttendance = (userData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.attendanceSettings}?id=${id}`;
            apiCall("put", url, userData)
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

//manage shift

export const getShift = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.manageShift, null)
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

export const postShift = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.manageShift, userData)
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

export const updateShift = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.manageShift}`;
            apiCall("put", url, userData)
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

//roaster shift

export const getRosterShift = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.rosterShift, null)
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

export const postRosterShift = (rosterData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.rosterShift, rosterData)
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

export const updateRosterShift = (rosterData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.rosterShift}?id=${id}`;
            apiCall("put", url, rosterData)
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


export const getShiftChange = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.shiftChange, null)
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

export const postShiftChange = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.shiftChange, userData)
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

export const updateShiftChange = (rosterData: any, id: number) => {
    console.log("333", rosterData, "444", id);
    
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.shiftChange}?id=${id}`;
            apiCall("put", url, rosterData)
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


//sandwitch policy

export const getSandwitchPolicy = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.sandwichRules, null)
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

export const postSandwitchPolicy = (rosterData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.sandwichRules, rosterData)
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

export const updateSandwitchPolicy = (rosterData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.sandwichRules}?id=${id}`;
            apiCall("put", url, rosterData)
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

//Regularization Policy

export const getRegularization = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.regularization, null)
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

export const postRegularization = (regularizationData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.regularization, regularizationData)
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

export const updateRegularization = (regularizationData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.regularization}?id=${id}`;
            apiCall("put", url, regularizationData)
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

export const getTimePolicy = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.timeManage, null)
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

export const postTimePolicy = (regularizationData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.timeManage, regularizationData)
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

export const updateTimePolicy = (regularizationData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.timeManage}?id=${id}`;
            apiCall("put", url, regularizationData)
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

export const getCalculation = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.calculation, null)
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

export const postCalculation = (calculationData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.calculation, calculationData)
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

export const updateCalculation = (calculationData: any, id: number) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.calculation}?id=${id}`;
            apiCall("put", url, calculationData)
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

export const getWeeklyOff = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.weeklyOff, null)
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

export const postWeeklyOff = (weeklyOffData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", attendance.weeklyOff, weeklyOffData)
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

export const updateWeeklyOff = (weeklyOffData: any, weekday: string) => {
    return new Promise((resolve, reject) => {
        try {
            const url = `${attendance.weeklyOff}/${weekday}`;
            apiCall("put", url, weeklyOffData)
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

export const getRestrictions = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", attendance.restriction, null)
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

export const postRestrictions = (restrictionData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("put", attendance.restriction, restrictionData)
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

// Employee Basics API
export const getEmployeeBasics = () => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("get", employeeBasics.employeeBasic, null)
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

export const postEmployeeBasics = (userData: any) => {
    return new Promise((resolve, reject) => {
        try {
            apiCall("post", employeeBasics.employeeBasic, userData)
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