import * as Yup from "yup";

export const ConfigAttendanceValidation = Yup.object().shape({
    organization: Yup.mixed().notRequired(),
    enable_attendance: Yup.boolean(),
    default_attendance_status: Yup.string().required("Default attendance status is required"),
    deduct_salary_for_absent_days: Yup.string().notRequired(),
    company_start_time: Yup.string().required("Start time is required"),
    company_end_time: Yup.string().required("End time is required"),
    hide_total_hours: Yup.boolean(),
    hide_attendance_punches: Yup.boolean(),
    disable_web_attendance: Yup.boolean(),
    enable_ip_restrictions: Yup.boolean(),
    disable_mobile_attendance: Yup.boolean(),
});
