import { Card, CardContent } from "@/components/ui/card";
import { getPersonalDetails, postPersonalDetails, putPersonalDetails } from "@/services/user/apiMethods";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";

interface PersonalDetailsData {
  id?: number;
  fullname: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  date_of_birth: string;
  place_of_birth: string;
  gender: string;
  bloodgroup: string;
  domicile: string;
  citizenship: string;
  religion: string;
  marital_status: string;
  marriage_date: string;
  workphone: string;
  personal_email: string;
  linkedin: string;
  slackuser: string;
  permanent_address: string;
  present_address: string;
  drivinglicense: string;
  passport: string;
  aadhar_number: string;
  pan: string;
  uan: string;
  skills: Record<string, any>;
  total_experiance: number;
}

const PersonalDetails = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetailsData>({
    fullname: {
      firstName: "",
      middleName: "",
      lastName: ""
    },
    date_of_birth: "",
    place_of_birth: "",
    gender: "",
    bloodgroup: "",
    domicile: "",
    citizenship: "",
    religion: "",
    marital_status: "",
    marriage_date: "",
    workphone: "",
    personal_email: "",
    linkedin: "",
    slackuser: "",
    permanent_address: "",
    present_address: "",
    drivinglicense: "",
    passport: "",
    aadhar_number: "",
    pan: "",
    uan: "",
    skills: {},
    total_experiance: 0
  });

  const [skillInput, setSkillInput] = useState("");
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPersonalDetails();
  }, []);

  useEffect(() => {
    // Convert skills object to array for display
    if (personalDetails.skills && typeof personalDetails.skills === 'object') {
      const skillsArray = Object.keys(personalDetails.skills);
      setSkillTags(skillsArray);
    }
  }, [personalDetails.skills]);

  const fetchPersonalDetails = async () => {
    try {
      const response: any = await getPersonalDetails();
      if (response.status === 200 && response.data) {
        setPersonalDetails(response.data);
        setIsEditing(true);
      }
    } catch (err: unknown) {
      console.log("Error fetching personal details:", err);
      // Don't show error toast as this might be expected for new users
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('fullname.')) {
      const field = name.split('.')[1];
      setPersonalDetails(prev => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [field]: value
        }
      }));
    } else {
      setPersonalDetails(prev => ({
        ...prev,
        [name]: name === 'total_experiance' ? parseInt(value) || 0 : value
      }));
    }
  };

  const handleSkillInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      addSkill();
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !skillTags.includes(skillInput.trim())) {
      const newSkillTags = [...skillTags, skillInput.trim()];
      setSkillTags(newSkillTags);
      
      // Convert to skills object format
      const skillsObject = newSkillTags.reduce((acc, skill, index) => {
        acc[skill] = `skill_${index}`;
        return acc;
      }, {} as Record<string, any>);
      
      setPersonalDetails(prev => ({
        ...prev,
        skills: skillsObject
      }));
      
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    const newSkillTags = skillTags.filter(skill => skill !== skillToRemove);
    setSkillTags(newSkillTags);
    
    // Convert to skills object format
    const skillsObject = newSkillTags.reduce((acc, skill, index) => {
      acc[skill] = `skill_${index + 1}`;
      return acc;
    }, {} as Record<string, any>);
    
    setPersonalDetails(prev => ({
      ...prev,
      skills: skillsObject
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && personalDetails.id) {
        const response: any = await putPersonalDetails(personalDetails);
        if (response.status === 200) {
          toast.success("Personal details updated successfully");
        } else {
          toast.error("Failed to update personal details");
        }
      } else {
        const response: any = await postPersonalDetails(personalDetails);
        if (response.status === 201) {
          toast.success("Personal details created successfully");
          setIsEditing(true);
        } else {
          toast.error("Failed to create personal details");
        }
      }
    } catch (error) {
      console.error("Error submitting personal details:", error);
      toast.error("An error occurred while saving personal details");
    }
  };

  return (
    <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Personal_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="bg-[#FBFFF2] rounded-2xl my-10 px-5 py-5">
            <div className="md:flex md:gap-5 justify-between font-montserrat text-[14px] mb-5">
              {/* Left side */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="fullname.firstName"
                    value={personalDetails.fullname.firstName}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="fullname.middleName"
                    value={personalDetails.fullname.middleName}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="fullname.lastName"
                    value={personalDetails.fullname.lastName}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="date_of_birth">Date of Birth</label>
                  <input
                    type="date"
                    id="date_of_birth"
                    name="date_of_birth"
                    value={personalDetails.date_of_birth}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="place_of_birth">Place of Birth</label>
                  <input
                    type="text"
                    id="place_of_birth"
                    name="place_of_birth"
                    value={personalDetails.place_of_birth}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={personalDetails.gender}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <label htmlFor="bloodgroup">Blood Group</label>
                  <select
                    id="bloodgroup"
                    name="bloodgroup"
                    value={personalDetails.bloodgroup}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <label htmlFor="domicile">Domicile</label>
                  <input
                    type="text"
                    id="domicile"
                    name="domicile"
                    value={personalDetails.domicile}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="citizenship">Citizenship</label>
                  <input
                    type="text"
                    id="citizenship"
                    name="citizenship"
                    value={personalDetails.citizenship}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="religion">Religion</label>
                  <input
                    type="text"
                    id="religion"
                    name="religion"
                    value={personalDetails.religion}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <label htmlFor="marital_status">Marital Status</label>
                  <select
                    id="marital_status"
                    name="marital_status"
                    value={personalDetails.marital_status}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div className="flex justify-between">
                  <label htmlFor="marriage_date">Marriage Date</label>
                  <input
                    type="date"
                    id="marriage_date"
                    name="marriage_date"
                    value={personalDetails.marriage_date}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
              </div>

              {/* Right side */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label htmlFor="drivinglicense">Driving License</label>
                  <input
                    type="text"
                    id="drivinglicense"
                    name="drivinglicense"
                    value={personalDetails.drivinglicense}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="passport">Passport Number</label>
                  <input
                    type="text"
                    id="passport"
                    name="passport"
                    value={personalDetails.passport}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="aadhar_number">Aadhar Number</label>
                  <input
                    type="text"
                    id="aadhar_number"
                    name="aadhar_number"
                    value={personalDetails.aadhar_number}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="pan">PAN</label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    value={personalDetails.pan}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="uan">UAN</label>
                  <input
                    type="text"
                    id="uan"
                    name="uan"
                    value={personalDetails.uan}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="workphone">Work Phone</label>
                  <input
                    type="tel"
                    id="workphone"
                    name="workphone"
                    value={personalDetails.workphone}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="personal_email">Personal Email</label>
                  <input
                    type="email"
                    id="personal_email"
                    name="personal_email"
                    value={personalDetails.personal_email}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="linkedin">LinkedIn</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={personalDetails.linkedin}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="slackuser">Slack</label>
                  <input
                    type="text"
                    id="slackuser"
                    name="slackuser"
                    value={personalDetails.slackuser}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="total_experiance">Total Experience (Years)</label>
                  <input
                    type="number"
                    id="total_experiance"
                    name="total_experiance"
                    value={personalDetails.total_experiance}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                    min="0"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <label htmlFor="permanent_address">Permanent Address</label>
                  <textarea
                    id="permanent_address"
                    name="permanent_address"
                    value={personalDetails.permanent_address}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="present_address">Present Address</label>
                  <textarea
                    id="present_address"
                    name="present_address"
                    value={personalDetails.present_address}
                    onChange={handleInputChange}
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <h1 className="text-[22px] font-montserrat text-[#4F4F4F] font-semibold mb-5">
              Skills
            </h1>

            <div className="font-montserrat text-[14px] flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={handleSkillInputKeyPress}
                    className="flex-1 bg-[#F0F0F0] p-2 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-4 py-2 bg-[#ddff8f] rounded-md font-semibold"
                  >
                    Add
                  </button>
                </div>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {skillTags.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 bg-[#ddff8f] px-3 py-1 rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <button 
        onClick={handleSubmit} 
        className="p-3 bg-[#ddff8f] rounded-2xl font-montserrat font-semibold text-[14px] absolute right-10 bottom-6"
      >
        {isEditing ? 'Update Details' : 'Save Details'}
      </button>
    </Card>
  );
};

export default PersonalDetails;