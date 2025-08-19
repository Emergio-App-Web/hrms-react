import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { postLogin } from "@/services/user/apiMethods";
import { useDispatch } from "react-redux";
import { setToken, setUserData, setOrganization } from "@/context/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import MainLoader from "@/components/main-loader";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    interface LoginResponseData {
        user(user: any): { payload: any; type: "auth/setUserData" };
        access?: string;
        refresh?: string;
        role?: string;
        organization?: string;
    }

    interface LoginResponse {
        data: LoginResponseData;
        status: number;
    }

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                setLoading(true);
                const loginResponse = (await postLogin(values)) as LoginResponse;

                if (loginResponse.status === 200 && loginResponse.data?.access) {
                    // console.log("login datass", loginResponse);
                    dispatch(setToken(loginResponse.data.access));
                    dispatch(setUserData(loginResponse.data.role));
                    dispatch(setOrganization(loginResponse.data.organization));
                    navigate("/");
                }
            } catch (error) {
                console.error("Login failed:", error);
            } finally {
                setSubmitting(false);
                setLoading(false);
            }
        },
    });

    return (
        <>
            {loading ? (
                <MainLoader />
            ) : (
                <div className="relative h-full flex overflow-hidden">
                    {/* left */}
                    <div className="hidden lg:block lg:w-1/2">
                        <img
                            src="/images/LoginSignage.png"
                            className="lg:block h-screen ml-12 py-5 transform scale-110 object-cover"
                            alt="LoginSinage"
                        />
                    </div>

                    {/* right */}
                    <div className="lg:w-1/2 h-screen">
                        <div className="lg:relative w-full overflow-hidden">
                            <div className="absolute inset-12 lg:inset-0 flex flex-col gap-y-1 lg:text-slate-600 mt-9">
                                <div className="font-bold text-5xl">Hello ,</div>
                                <div className="font-semibold text-3xl z-20">Welcome Back 👋</div>
                            </div>

                            <img
                                className="  scale-[200%] sm:scale-125 object-cover mt-[18rem] sm:mt-48 lg:mt-7"
                                src="/images/LoginLabel.png"
                                alt="LoginLabel"
                            />

                            <div className="absolute inset-0 flex items-center justify-center sm:mb-6">
                                <form
                                    onSubmit={formik.handleSubmit}
                                    className="bg-white lg:bg-opacity-80 p-6 py-20 rounded-3xl shadow-md max-w-md ml-9 mt-12 w-full"
                                >
                                    <h2 className="text-xl font-bold mb-4 text-center py-7">Emergio Games</h2>

                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        className="w-full p-2 mb-1 border border-gray-300 rounded"
                                    />
                                    {formik.touched.username && formik.errors.username && (
                                        <div className="text-red-500 text-sm mb-2">{formik.errors.username}</div>
                                    )}

                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="Password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                            className="w-full p-2 mb-1 border border-gray-300 rounded pr-10"
                                        />
                                        <span
                                            className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </span>
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting}
                                        className="w-full bg-slate-500 hover:bg-slate-600 text-white py-2 rounded mt-2"
                                    >
                                        {formik.isSubmitting ? "Submitting..." : "Submit"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
