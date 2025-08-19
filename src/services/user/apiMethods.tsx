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

export const getAttendance = () => {
  return new Promise((resolve, reject) => {
    try {
        apiCall("get", userUrls.attendance)
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
