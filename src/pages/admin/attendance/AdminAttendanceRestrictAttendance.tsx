import { useState } from "react";

const AdminAttendanceRestrictAttendance = () => {
  // State for employee restrictions
  const [restrictPunchRequestByEmployee, setRestrictPunchRequestByEmployee] = useState(false);
  const [punchRequestEmployeeLimit, setPunchRequestEmployeeLimit] = useState("");
  const [restrictJustifyRequestByEmployee, setRestrictJustifyRequestByEmployee] = useState(false);
  const [justifyRequestEmployeeLimit, setJustifyRequestEmployeeLimit] = useState("");
  
  // State for manager restrictions
  const [restrictPunchApproval1, setRestrictPunchApproval1] = useState(false);
  const [punchApprovalLimit1, setPunchApprovalLimit1] = useState("");
  const [restrictPunchApproval2, setRestrictPunchApproval2] = useState(false);
  const [punchApprovalLimit2, setPunchApprovalLimit2] = useState("");
  const [restrictPunchApproval3, setRestrictPunchApproval3] = useState(false);
  const [punchApprovalLimit3, setPunchApprovalLimit3] = useState("");
  const [restrictPunchApproval4, setRestrictPunchApproval4] = useState(false);
  const [punchApprovalLimit4, setPunchApprovalLimit4] = useState("");
  const [restrictPunchApproval5, setRestrictPunchApproval5] = useState(false);
  const [punchApprovalLimit5, setPunchApprovalLimit5] = useState("");

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Attendance Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Restrict Attendance Action for Employee</h2>

      <div className="p-5 rounded-xl mb-6 space-y-5">
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-punch-request-employee"
              checked={restrictPunchRequestByEmployee}
              onChange={() => setRestrictPunchRequestByEmployee(!restrictPunchRequestByEmployee)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-punch-request-employee" className="font-medium block mb-1">
                Restrict on Duty / Punch Request by employee to
              </label>
              <input
                type="text"
                value={punchRequestEmployeeLimit}
                onChange={(e) => setPunchRequestEmployeeLimit(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="5"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-justify-request-employee"
              checked={restrictJustifyRequestByEmployee}
              onChange={() => setRestrictJustifyRequestByEmployee(!restrictJustifyRequestByEmployee)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-justify-request-employee" className="font-medium block mb-1">
                Restrict Total time justify Request by employee to
              </label>
              <input
                type="text"
                value={justifyRequestEmployeeLimit}
                onChange={(e) => setJustifyRequestEmployeeLimit(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="5"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-base font-medium mb-4">Restrict Attendance Action for Manager</h2>

      <div className="p-5 rounded-xl mb-6 space-y-5">
        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-punch-approval-1"
              checked={restrictPunchApproval1}
              onChange={() => setRestrictPunchApproval1(!restrictPunchApproval1)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-punch-approval-1" className="font-medium block mb-1">
                Restrict Attendance Punch request approval by manager to
              </label>
              <input
                type="text"
                value={punchApprovalLimit1}
                onChange={(e) => setPunchApprovalLimit1(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="10"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-punch-approval-2"
              checked={restrictPunchApproval2}
              onChange={() => setRestrictPunchApproval2(!restrictPunchApproval2)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-punch-approval-2" className="font-medium block mb-1">
                Restrict Attendance Punch request approval by manager to
              </label>
              <input
                type="text"
                value={punchApprovalLimit2}
                onChange={(e) => setPunchApprovalLimit2(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="10"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-punch-approval-3"
              checked={restrictPunchApproval3}
              onChange={() => setRestrictPunchApproval3(!restrictPunchApproval3)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-punch-approval-3" className="font-medium block mb-1">
                Restrict Attendance Punch request approval by manager to
              </label>
              <input
                type="text"
                value={punchApprovalLimit3}
                onChange={(e) => setPunchApprovalLimit3(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="10"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-punch-approval-4"
              checked={restrictPunchApproval4}
              onChange={() => setRestrictPunchApproval4(!restrictPunchApproval4)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-punch-approval-4" className="font-medium block mb-1">
                Restrict Attendance Punch request approval by manager to
              </label>
              <input
                type="text"
                value={punchApprovalLimit4}
                onChange={(e) => setPunchApprovalLimit4(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="10"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>

        <div className="flex items-start mb-6">
          <div className="mr-3 mt-1">
            <input
              type="checkbox"
              id="restrict-punch-approval-5"
              checked={restrictPunchApproval5}
              onChange={() => setRestrictPunchApproval5(!restrictPunchApproval5)}
              className="h-5 w-5 rounded border-gray-300"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center">
              <label htmlFor="restrict-punch-approval-5" className="font-medium block mb-1">
                Restrict Attendance Punch request approval by manager to
              </label>
              <input
                type="text"
                value={punchApprovalLimit5}
                onChange={(e) => setPunchApprovalLimit5(e.target.value)}
                className="w-16 p-1 mx-2 bg-gray-100 rounded"
                placeholder="10"
              />
              <span>Request per Month</span>
            </div>
            <p className="text-gray-600 text-sm text-center">
              Lorem ipsum dolor sit amet consectetur. At laoreet mattis id aliquet nec sociis etiam adipiscing. Id eget aliquet commodo volutpat semean pharetra urna ultrices.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <button className="bg-[#DDFF8F] text-black px-6 py-2 rounded-xl font-bold">
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminAttendanceRestrictAttendance;