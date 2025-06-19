import { api } from "./api";

interface ApiCallOptions {
    method: string;
    url: string;
    data?: Record<string, any> | null; //specifies optional data with key string with value of any type, ? meanst its optional
}

export const apiCall = async (
    method: ApiCallOptions["method"],
    url: ApiCallOptions["url"],
    data: ApiCallOptions["data"] = null
): Promise<any> => {
    try {
        let response;

        switch (method.toLowerCase()) {
            case "post":
                response = await api.post(url, data);
                break;
            case "get":
                response = await api.get(url, { params: data }); // Ensure query params are passed correctly
                break;
            case "patch":
                response = await api.patch(url, data);
                break;
            case "put":
                response = await api.put(url, data);
                break;
            case "delete":
                response = await api.delete(url);
                break;
            default:
                throw new Error(`Unsupported HTTP method: ${method}`);
        }
        return response;
    } catch (error: any) {
        const errorMsg: string = error?.response?.data || error?.message || "An unexpected error occurred";
        console.log("error 1.1 ::", error);

        if (error?.response?.status === 401) {
            // store.dispatch(logout());
            return Promise.reject(errorMsg);
        }

        console.log("error3", errorMsg);

        return Promise.reject(errorMsg);
    }
};
