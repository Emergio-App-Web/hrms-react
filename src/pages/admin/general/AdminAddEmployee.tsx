import { useState, useEffect } from "react";
import { ChevronsRight, Eye, EyeOff } from "lucide-react";
import { postEmployeeBasics, getDepartment, getDesignation, getUser } from "@/services/admin/apiMethods";
import { toast } from "react-toastify";

interface DropdownOption {
  label: string;
  value: number;
}

const initialState = {
  username: "",
  email: "",
  password: "",
  name: "",
  phone: "",
  role: "employee",
  employee_code: "",
  reporting_manager_id: 0,
  business_unit_id: 0,
  department_id: 0,
  designation_id: 0,
  date_of_joining: "",
  employment_type: "",
  service_status: "",
  workmode: "",
  probation: "",
  extension: "",
  notice_period: "",
  enrollment_no: "",
  trigger_onboarding: false,
  send_mail: false,
  weekly_offs: {},
  permissions: {},
};

const AdminAddEmployee = () => {
  const [form, setForm] = useState({ ...initialState });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState("");
  // const [apiError, setApiError] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState<DropdownOption[]>([]);
  const [designationOptions, setDesignationOptions] = useState<DropdownOption[]>([]);
  const [managerOptions, setManagerOptions] = useState<DropdownOption[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch departments
    getDepartment().then((res: any) => {
      if (res && res.data) {
        setDepartmentOptions(
          res.data.map((d: any) => ({ label: d.title || d.name, value: d.id }))
        );
      }
    });
    // Fetch designations
    getDesignation().then((res: any) => {
      if (res && res.data) {
        setDesignationOptions(
          res.data.map((d: any) => ({ label: d.title || d.name, value: d.id }))
        );
      }
    });
    // Fetch managers (users)
    getUser().then((res: any) => {
      if (res && res.data) {
        setManagerOptions(
          res.data.map((u: any) => ({ label: u.name, value: u.id }))
        );
      }
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? e.target.checked : false;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.phone) newErrors.phone = "Phone number is required";
    if (!form.department_id || form.department_id === 0)
      newErrors.department_id = "Department is required";
    if (!form.designation_id || form.designation_id === 0)
      newErrors.designation_id = "Designation is required";
    if (!form.reporting_manager_id || form.reporting_manager_id === 0)
      newErrors.reporting_manager_id = "Reporting Manager is required";
    if (!form.employment_type) newErrors.employment_type = "Employment type is required";
    if (!form.workmode) newErrors.workmode = "Workmode is required";
    if (!form.date_of_joining) newErrors.date_of_joining = "Date of joining is required";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setSuccess("");
    // setApiError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      // Ensure phone is unique or at least not empty to avoid duplicate '' error
      // let phone = form.phone && form.phone.trim() !== "" ? form.phone : `999${Date.now()}`;
      const payload = {
        ...initialState,
        ...form,
        department_id: Number(form.department_id),
        designation_id: Number(form.designation_id),
        reporting_manager_id: Number(form.reporting_manager_id),
        trigger_onboarding: !!form.trigger_onboarding,
        send_mail: !!form.send_mail,
      };
      await postEmployeeBasics(payload);
      toast.success("Employee added successfully!");
      setForm({ ...initialState });
    } catch (err) {
      toast.error("Failed to add employee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="flex items-center gap-3 ml-6 mt-6">
        <h1 className="font-montserrat font-semibold text-2xl">Personal Information</h1>
        <span className="font-montserrat font-semibold text-md flex items-center">
          <ChevronsRight />
          <span className="ml-1">view , add and update employees</span>
        </span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto bg-[#fbfff2] rounded-3xl mt-8 p-8 flex flex-col gap-8 shadow-md"
      >
        {/* Row 1: Name, Email, Phone */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-bold mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.name ? "border border-red-500" : ""}`}
              placeholder="Enter full name"
            />
            {errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}
          </div>
          <div>
            <label className="block font-bold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.email ? "border border-red-500" : ""}`}
              placeholder="Enter email"
            />
            {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
          </div>
          <div>
            <label className="block font-bold mb-1">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.phone ? "border border-red-500" : ""}`}
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
          </div>
        </div>

        {/* Row 2: Username, Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.username ? "border border-red-500" : ""}`}
              placeholder="Enter username"
            />
            {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
          </div>
          <div>
            <label className="block font-bold mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none pr-10 ${errors.password ? "border border-red-500" : ""}`}
                placeholder="Enter password"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                tabIndex={-1}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
          </div>
        </div>

        {/* Row 3: Department, Designation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-1">Department</label>
            <select
              name="department_id"
              value={form.department_id}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.department_id ? "border border-red-500" : ""}`}
            >
              <option value={0}>Select</option>
              {departmentOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.department_id && <span className="text-red-500 text-xs">{errors.department_id}</span>}
          </div>
          <div>
            <label className="block font-bold mb-1">Designation</label>
            <select
              name="designation_id"
              value={form.designation_id}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.designation_id ? "border border-red-500" : ""}`}
            >
              <option value={0}>Select</option>
              {designationOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.designation_id && <span className="text-red-500 text-xs">{errors.designation_id}</span>}
          </div>
        </div>

        {/* Row 4: Reporting Manager, Employment Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-1">Reporting Manager</label>
            <select
              name="reporting_manager_id"
              value={form.reporting_manager_id}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.reporting_manager_id ? "border border-red-500" : ""}`}
            >
              <option value={0}>Select</option>
              {managerOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.reporting_manager_id && <span className="text-red-500 text-xs">{errors.reporting_manager_id}</span>}
          </div>
          <div>
            <label className="block font-bold mb-1">Employment Type</label>
            <input
              type="text"
              name="employment_type"
              value={form.employment_type}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.employment_type ? "border border-red-500" : ""}`}
              placeholder="e.g. Full Time, Part Time"
            />
            {errors.employment_type && <span className="text-red-500 text-xs">{errors.employment_type}</span>}
          </div>
        </div>

        {/* Row 5: Workmode, Date of Joining */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold mb-1">Workmode</label>
            <input
              type="text"
              name="workmode"
              value={form.workmode}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.workmode ? "border border-red-500" : ""}`}
              placeholder="e.g. Remote, Onsite"
            />
            {errors.workmode && <span className="text-red-500 text-xs">{errors.workmode}</span>}
          </div>
          <div>
            <label className="block font-bold mb-1">Date of Joining</label>
            <input
              type="date"
              name="date_of_joining"
              value={form.date_of_joining}
              onChange={handleChange}
              className={`w-full bg-[#F0F0F0] p-2 rounded-xl focus:outline-none ${errors.date_of_joining ? "border border-red-500" : ""}`}
            />
            {errors.date_of_joining && <span className="text-red-500 text-xs">{errors.date_of_joining}</span>}
          </div>
        </div>

        {/* Row 6: Checkboxes */}
        <div className="flex flex-col md:flex-row gap-6">
          <label className="flex items-center gap-2 font-bold">
            <input
              type="checkbox"
              name="trigger_onboarding"
              checked={form.trigger_onboarding}
              onChange={handleChange}
              className="accent-[#DDFF8F] w-5 h-5"
            />
            Trigger Onboarding
          </label>
          <label className="flex items-center gap-2 font-bold">
            <input
              type="checkbox"
              name="send_mail"
              checked={form.send_mail}
              onChange={handleChange}
              className="accent-[#DDFF8F] w-5 h-5"
            />
            Send Mail
          </label>
        </div>

        {/* API error/success
        {apiError && <div className="text-red-500 text-sm">{apiError}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>} */}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#DDFF8F] px-8 py-2 text-black rounded-3xl font-semibold hover:shadow-md disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAddEmployee;