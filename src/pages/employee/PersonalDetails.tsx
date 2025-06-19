import { Card, CardContent } from "@/components/ui/card";

const PersonalDetails = () => {
  return (
    <Card className="relative w-full max-w-3xl mx-auto rounded-3xl bg-[#fbfff2] before:content-['Personal_Details'] before:text-[#4F4F4F] before:font-semibold before:text-2xl before:absolute before:-top-14">
      <CardContent className="p-6">
        <form>
          <div className="bg-[#FBFFF2] rounded-2xl my-10 px-5 py-5">
            <div className="md:flex md:gap-5 justify-between font-montserrat text-[14px] mb-5">
              {/* left side */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label htmlFor="input">Input</label>
                  <input
                    type="text"
                    id="input"
                    name="input"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    type="text"
                    id="dob"
                    name="dob"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="placeOfBirth">Place of Birth</label>
                  <input
                    type="text"
                    id="placeOfBirth"
                    name="placeOfBirth"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="gender">Gender</label>
                  <input
                    type="text"
                    id="gender"
                    name="gender"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="bloodGroup">Blood Group</label>
                  <input
                    type="text"
                    id="bloodGroup"
                    name="bloodGroup"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="domicile">Domicile</label>
                  <input
                    type="text"
                    id="domicile"
                    name="domicile"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="citizenship">Citizenship</label>
                  <input
                    type="text"
                    id="citizenship"
                    name="citizenship"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="religion">Religion</label>
                  <input
                    type="text"
                    id="religion"
                    name="religion"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <label htmlFor="maritalStatus">Marital Status</label>
                  <input
                    type="text"
                    id="maritalStatus"
                    name="maritalStatus"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="marriageDate">Marriage Date</label>
                  <input
                    type="text"
                    id="marriageDate"
                    name="marriageDate"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
              </div>

              {/* right side */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <label htmlFor="drivingLicense">Driving License</label>
                  <input
                    type="text"
                    id="drivingLicense"
                    name="drivingLicense"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="passportNumber">Passport Number</label>
                  <input
                    type="text"
                    id="passportNumber"
                    name="passportNumber"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="aadharNumber">Aadhar Number</label>
                  <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="pan">Pan</label>
                  <input
                    type="text"
                    id="pan"
                    name="pan"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="lan">Lan</label>
                  <input
                    type="text"
                    id="lan"
                    name="lan"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="mobile">Mobile</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="workPhone">Work Phone</label>
                  <input
                    type="text"
                    id="workPhone"
                    name="workPhone"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="personalMail">Personal Mail</label>
                  <input
                    type="text"
                    id="personalMail"
                    name="personalMail"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="linkedIn">LinkedIn</label>
                  <input
                    type="text"
                    id="linkedIn"
                    name="linkedIn"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="slack">Slack</label>
                  <input
                    type="text"
                    id="slack"
                    name="slack"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="imSkype">IM/Skype</label>
                  <input
                    type="text"
                    id="imSkype"
                    name="imSkype"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  />
                </div>
                <div className="flex justify-between gap-2">
                  <label htmlFor="permanentAddress">Permanent Address</label>
                  <textarea
                    id="permanentAddress"
                    name="permanentAddress"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  ></textarea>
                </div>
                <div className="flex justify-between">
                  <label htmlFor="presentAddress">Present Address</label>
                  <textarea
                    id="presentAddress"
                    name="presentAddress"
                    className="bg-[#F0F0F0] rounded-md p-1"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* otherdetails */}
            <h1 className="text-[22px] font-montserrat text-[#4F4F4F] font-semibold mb-10">
              Other Details
            </h1>

            <div className="font-montserrat text-[14px] flex flex-col gap-5">
              <div className="flex gap-5">
                <label htmlFor="skills">Skills</label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  className="w-full bg-[#F0F0F0] p-1 rounded-md"
                />
              </div>

              <div className="w-full flex justify-between">
                <div className="flex gap-2 justify-start">
                  <label htmlFor="previousExp">Previous Experience</label>
                  <input
                    type="text"
                    id="previousExp"
                    name="previousExp"
                    className="bg-[#F0F0F0] p-1 rounded-md w-[40%]"
                  />
                </div>
                <div className="flex gap-2 justify-center">
                  <label htmlFor="years">Years</label>
                  <input
                    type="text"
                    id="years"
                    name="years"
                    className="bg-[#F0F0F0] p-1 rounded-md w-[40%]"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <label htmlFor="months">Months</label>
                  <input
                    type="text"
                    id="months"
                    name="months"
                    className="bg-[#F0F0F0] p-1 rounded-md w-[40%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
