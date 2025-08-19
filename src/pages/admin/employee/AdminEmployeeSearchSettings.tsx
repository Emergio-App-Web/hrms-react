import { useEffect, useState } from "react";
import { getEmpSettings, updateEmpSettings } from "@/services/admin/apiMethods";
import { toast } from "react-toastify";

// Define proper types for the fields structure
interface FieldsState {
  general: {
    email: boolean;
    employee_status: boolean;
    profile_image: boolean;
  };
  work: {
    employee_code: boolean;
    department: boolean;
    designation: boolean;
    location: boolean;
    joining_date: boolean;
    reporting_manager: boolean;
  };
  contact: {
    mobile_number: boolean;
    address: boolean;
    personal_email: boolean;
    skype_imo: boolean;
    linkedIn: boolean;
  };
  other: {
    about: boolean;
    skills: boolean;
    attendance_status: boolean;
    employment_type: boolean;
    service_status: boolean;
  };
  filter_search: boolean;
}

const AdminEmployeeSearchSettings = () => {
  const [_filterSearch, setFilterSearch] = useState(true);
  const [existingId, setExistingId] = useState<number | null>(null);
  const [employeeSettings, setEmployeeSettings] = useState<any>(null);
  const [fields, setFields] = useState<FieldsState>({
    general: {
      email: false,
      employee_status: false,
      profile_image: false,
    },
    work: {
      employee_code: false,
      department: false,
      designation: false,
      location: false,
      joining_date: false,
      reporting_manager: false,
    },
    contact: {
      mobile_number: false,
      address: false,
      personal_email: false,
      skype_imo: false,
      linkedIn: false,
    },
    other: {
      about: false,
      skills: false,
      attendance_status: false,
      employment_type: false,
      service_status: false,
    },
    filter_search: true,
  });

  useEffect(() => {
    const fetchEmployeeSettings = async () => {
      try {
        const response: any = await getEmpSettings();
        if (response && response.status) {
          const profiledata = response.data;
          setExistingId(profiledata.organization?.id);
          setEmployeeSettings(profiledata);
          setFields({
            general: {
              email: profiledata.generally_showable_fields?.email || false,
              employee_status: profiledata.generally_showable_fields?.employee_status || false,
              profile_image: profiledata.generally_showable_fields?.profile_image || false,
            },
            work: {
              employee_code: profiledata.officially_showable_fields?.employee_code || false,
              department: profiledata.officially_showable_fields?.department || false,
              designation: profiledata.officially_showable_fields?.designation || false,
              location: profiledata.officially_showable_fields?.location || false,
              joining_date: profiledata.officially_showable_fields?.joining_date || false,
              reporting_manager: profiledata.officially_showable_fields?.reporting_manager || false,
            },
            contact: {
              mobile_number: profiledata.contacts_showable_fields?.mobile_number || false,
              address: profiledata.contacts_showable_fields?.address || false,
              personal_email: profiledata.contacts_showable_fields?.personal_email_id || false,
              skype_imo: profiledata.contacts_showable_fields?.skype_imo || false,
              linkedIn: profiledata.contacts_showable_fields?.linkedIn || false,
            },
            other: {
              about: profiledata.other_showable_fields?.about_me || false,
              skills: profiledata.other_showable_fields?.skills || false,
              attendance_status: profiledata.other_showable_fields?.attendance_status_status || false,
              employment_type: profiledata.other_showable_fields?.employment_type || false,
              service_status: profiledata.other_showable_fields?.service_status || false,
            },
            filter_search: profiledata.filter_search || false,
          });
          setFilterSearch(profiledata.filter_search || false);
        }
      } catch (error) {
        toast.error("Failed to load employee settings");
      }
    };
    fetchEmployeeSettings();
  }, []);

  const handleCheckboxChange = (section: keyof FieldsState, key: string) => {
    if (section === 'filter_search') return; // Handle this separately

    setFields(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, boolean>),
        [key]: !(prev[section] as Record<string, boolean>)[key]
      }
    }));
  };

  // const handleCheckboxChangeTypeSafe = <T extends keyof Omit<FieldsState, 'show_active_only'>>(
  //   section: T, 
  //   key: keyof FieldsState[T]
  // ) => {
  //   setFields(prev => ({
  //     ...prev,
  //     [section]: {
  //       ...prev[section],
  //       [key]: !prev[section][key]
  //     }
  //   }));
  // };

  const handleFilterChange = () => {
    setFields(prev => ({
      ...prev,
      filter_search: !prev.filter_search
    }));
    setFilterSearch(prev => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let payload;
      if (employeeSettings) {
        payload = {
          ...employeeSettings,
          filter_search: fields.filter_search,
          generally_showable_fields: {
            email: fields.general.email,
            employee_status: fields.general.employee_status,
            profile_image: fields.general.profile_image,
          },
          officially_showable_fields: {
            employee_code: fields.work.employee_code,
            department: fields.work.department,
            designation: fields.work.designation,
            location: fields.work.location,
            joining_date: fields.work.joining_date,
            reporting_manager: fields.work.reporting_manager,
          },
          contacts_showable_fields: {
            mobile_number: fields.contact.mobile_number,
            address: fields.contact.address,
            personal_email_id: fields.contact.personal_email,
            skype_imo: fields.contact.skype_imo,
            linkedIn: fields.contact.linkedIn,
          },
          other_showable_fields: {
            about_me: fields.other.about,
            skills: fields.other.skills,
            attendance_status_status: fields.other.attendance_status,
            employment_type: fields.other.employment_type,
            service_status: fields.other.service_status,
          },
        };
      } else {
        payload = {
          filter_search: fields.filter_search,
          generally_showable_fields: {
            email: fields.general.email,
            employee_status: fields.general.employee_status,
            profile_image: fields.general.profile_image,
          },
          officially_showable_fields: {
            employee_code: fields.work.employee_code,
            department: fields.work.department,
            designation: fields.work.designation,
            location: fields.work.location,
            joining_date: fields.work.joining_date,
            reporting_manager: fields.work.reporting_manager,
          },
          contacts_showable_fields: {
            mobile_number: fields.contact.mobile_number,
            address: fields.contact.address,
            personal_email_id: fields.contact.personal_email,
            skype_imo: fields.contact.skype_imo,
            linkedIn: fields.contact.linkedIn,
          },
          other_showable_fields: {
            about_me: fields.other.about,
            skills: fields.other.skills,
            attendance_status_status: fields.other.attendance_status,
            employment_type: fields.other.employment_type,
            service_status: fields.other.service_status,
          },
        };
      }
      if (existingId) {
        const response: any = await updateEmpSettings(payload, existingId);
        if (response.status === 200) {
          toast.success("Search settings updated successfully");
        } else {
          toast.error("Failed to update search settings");
        }
      } else {
        toast.error("Organization ID not found");
      }
    } catch (error) {
      toast.error("Something went wrong while updating search settings");
    }
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <div className="flex items-center mb-8">
        <h1 className="text-2xl font-bold mr-2">Employee Settings</h1>
        <span className="text-gray-500 flex items-center">
          <span className="mx-2">»</span>
          <span>View / Update global settings for your Company</span>
        </span>
      </div>

      <h2 className="text-base font-medium mb-4">Configure Employee Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="bg-[#FBFFF2] p-5 rounded">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-sm">Filter</span>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="activeOnly"
                  checked={fields.filter_search}
                  onChange={handleFilterChange}
                  className="w-4 h-4 mr-2"
                />
                <label htmlFor="activeOnly" className="text-sm">Show only Active Employee</label>
              </div>
            </div>
            <div className="mb-4 text-right">
              <span className="text-sm">Mandatory</span>
            </div>
            {/* General row */}
            <div className="flex mb-4 justify-between">
              <div className="w-1/6">
                <span className="text-sm font-medium">General</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(fields.general).map(([key, value]) => (
                  <div className="flex items-center" key={key}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={value}
                      onChange={() => handleCheckboxChange('general', key)}
                    />
                    <span className="text-sm">{key === 'email' ? 'Email' : key === 'employee_status' ? 'Employee Status' : key === 'profile_image' ? 'Profile Image' : key}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Official row */}
            <div className="flex mb-4 justify-between">
              <div className="w-1/6">
                <span className="text-sm font-medium">Official</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(fields.work).map(([key, value]) => (
                  <div className="flex items-center" key={key}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={value}
                      onChange={() => handleCheckboxChange('work', key)}
                    />
                    <span className="text-sm">{
                      key === 'employee_code' ? 'Employee code' :
                      key === 'department' ? 'Department' :
                      key === 'designation' ? 'Designation' :
                      key === 'location' ? 'Location' :
                      key === 'joining_date' ? 'Joining Date' :
                      key === 'reporting_manager' ? 'Reporting Manager' : key
                    }</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Contact row */}
            <div className="flex mb-4 justify-between">
              <div className="w-1/6">
                <span className="text-sm font-medium">Contact</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(fields.contact).map(([key, value]) => (
                  <div className="flex items-center" key={key}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={value}
                      onChange={() => handleCheckboxChange('contact', key)}
                    />
                    <span className="text-sm">{
                      key === 'mobile_number' ? 'Mobile Number' :
                      key === 'address' ? 'Address' :
                      key === 'personal_email' ? 'Personal Email Id' :
                      key === 'skype_imo' ? 'Skype / Imo' :
                      key === 'linkedIn' ? 'LinkedIn' : key
                    }</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Others row */}
            <div className="flex mb-4 justify-between">
              <div className="w-1/6">
                <span className="text-sm font-medium">Others</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.entries(fields.other).map(([key, value]) => (
                  <div className="flex items-center" key={key}>
                    <input
                      type="checkbox"
                      className="w-4 h-4 mr-2"
                      checked={value}
                      onChange={() => handleCheckboxChange('other', key)}
                    />
                    <span className="text-sm">{
                      key === 'about' ? 'About me' :
                      key === 'skills' ? 'Skills' :
                      key === 'attendance_status' ? 'Attendance Status' :
                      key === 'employment_type' ? 'Employment Type' :
                      key === 'service_status' ? 'Service Status' : key
                    }</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-gray-100 text-black px-6 py-2 rounded-xl font-bold"
          >
            Update Search Settings
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminEmployeeSearchSettings;