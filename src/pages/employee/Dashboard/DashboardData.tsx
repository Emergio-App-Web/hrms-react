import { useEffect, useState } from "react";
import AttendanceGraph from "../../../components/ui/AttendanceGraph";

interface CardData {
  gradient: [string, string];
  title: string;
  image: string;
  text: string;
}


const DashboardData = () => {
    const [selectedContent, setSelectedContent] = useState<string>("News");
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [active, setActive] = useState<string>("News");
  
    const handleSelectedContent = (Content: string): void => {
      setSelectedContent(Content);
      setActive(Content);
      console.log(Content);
    };
  
    const data: CardData[] = [
      {
        gradient: ["from-[#E3B7FF]", "to-[#C362FF]"],
        title: "Rewards",
        image: "gift.png",
        text: "Tap to get",
      },
      {
        gradient: ["from-[#FFD1A1]", "to-[#FF9A8B]"],
        title: "Special Offer",
        image: "gift2.png",
        text: "Limited time",
      },
    ];
  
    useEffect(() => {
      const intervel = setInterval(() => {
        setCurrentIndex((prev) => (prev == 0 ? 1 : 0));
      }, 1000);
  
      return () => clearInterval(intervel);
    }, []);
  
    const { gradient, title, image, text } = data[currentIndex];
  
    return (
     <div>

   
  
          {/* Center Content */}
          <main className="flex-1 bg-gray-100 p-10 flex flex-col gap-10">
            {/* first 4 div */}
            <div className="">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="w-full h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                  <p className="text-[14px] font-medium">For Next Hollyday</p>
                  <p className="text-[24px] font-bold">3</p>
                </div>
                <div className="w-full h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                  <p className="text-[14px] font-medium">Birthdays this week</p>
                  <p className="text-[24px] font-bold">1</p>
                </div>
                <div className="w-full h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                  <p className="text-[14px] font-medium">For Next Payroll</p>
                  <p className="text-[24px] font-bold">16</p>
                </div>
                <div className="w-full h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                  <p className="text-[14px] font-medium">Company Events</p>
                  <p className="text-[24px] font-bold">5</p>
                </div>
              </div>
            </div>
  
            {/* chart */}
            <div className="flex justify-center items-center">
              <AttendanceGraph />
            </div>
  
            {/* last div */}
  
            <div className="flex flex-col lg:flex-row lg:justify-between gap-10 lg:h-[340px]">
              {/* news-section */}
              <div className="lg:w-4/6 bg-[#FBFFF2] rounded-xl">
                <div className="header p-10 flex flex-col gap-10">
                  <ul className="flex flex-wrap justify-around md:justify-start gap-4 md:gap-8">
                    {["News", "Hollyday", "Birthday", "Work Anniversory"].map(
                      (path, index) => (
                        <li
                          key={index}
                          className={`cursor-pointer text-[12px] sm:text-[14px] lg:text-[16px] font-semibold text-center py-2 px-4 rounded-md transition-all duration-300 ${
                            active == path
                              ? "border-b-4 border-black pb-1 bg-[#FBFFF2] shadow-lg"
                              : "hover:bg-[#FBFFF2] hover:shadow-md"
                          } w-1/2 md:w-auto`}
                          onClick={() => handleSelectedContent(path)}
                        >
                          {path}
                        </li>
                      )
                    )}
                  </ul>
  
                  <div className="border border-black h-auto rounded-xl flex justify-center items-center">
                    {selectedContent == "News" && (
                      <div className="flex flex-col lg:flex-row justify-between gap-5 p-2">
                        <div className="flex justify-center items-center w-full lg:w-1/5 ">
                          <img
                            src="emergio.png"
                            className="h-[100px] w-[100px] rounded-full mx-auto"
                            alt=""
                          />
                        </div>
                        <div className="flex-1 flex flex-col gap-2 text-center lg:text-left">
                          <p className="font-bold text-[16px] lg:text-[18px]">
                            Christmas Program Invitation at 18th Saturday 9 am
                          </p>
                          <p className="text-[13px] lg:text-[14px]">
                            Dear Team,
                            <br />
                            We are thrilled to invite you to our Christmas
                            Celebration at Emergio Games. Let’s come together to
                            celebrate the festive season with joy, laughter, and
                            holiday cheer.
                            <br />
                            Date: December 21, 2024, <br />
                            Saturday Time: 9:00 AM to 1:00 PM <br />
                            Dress Code: Red & White
                          </p>
                        </div>
                      </div>
                    )}
                    {selectedContent == "Hollyday" && (
                      <p className="text-center text-[14px] lg:text-[16px] min-h-36">
                        A public holiday to celebrate the start of the new year.
                      </p>
                    )}
                    {selectedContent == "Birthday" && (
                      <p className="text-center text-[14px] lg:text-[16px] min-h-36">
                        Jane Smith
                      </p>
                    )}
                    {selectedContent == "Work Anniversory" && (
                      <p className="text-center text-[14px] lg:text-[16px] min-h-36">
                        Alice Johnson
                      </p>
                    )}
                  </div>
                </div>
              </div>
  
  
              {/* giftcard */}
              <div
                className={`flex-1 bg-gradient-to-t ${gradient[0]} ${gradient[1]} rounded-xl flex flex-col justify-center items-center cursor-pointer py-5 lg:py-0 `}
              >
                <h1 className="text-[20px] font-medium text-white">{title}</h1>
                <img src={image} alt="" className="h-[230px]" />
                <p className="text-[13px] font-semibold">{text}</p>
              </div>
            </div>
          </main>
        
          </div>
    );
    
}

export default DashboardData






