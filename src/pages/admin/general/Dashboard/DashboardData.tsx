import { useEffect} from "react";
import AttendanceGraph from "@/components/ui/AttendanceGraph";
import { AdminProfilePieChart } from "@/components/admin-dashboard-piechart";

// interface CardData {
//     gradient: [string, string];
//     title: string;
//     image: string;
//     text: string;
// }

const DashboardData = () => {
    // const [selectedContent, setSelectedContent] = useState<string>("News");
    // const [currentIndex, setCurrentIndex] = useState<number>(0);
    // const [active, setActive] = useState<string>("News");

    // const handleSelectedContent = (Content: string): void => {
    //     setSelectedContent(Content);
    //     setActive(Content);
    //     console.log(Content);
    // };

    // const data: CardData[] = [
    //     {
    //         gradient: ["from-[#E3B7FF]", "to-[#C362FF]"],
    //         title: "Rewards",
    //         image: "gift.png",
    //         text: "Tap to get",
    //     },
    //     {
    //         gradient: ["from-[#FFD1A1]", "to-[#FF9A8B]"],
    //         title: "Special Offer",
    //         image: "gift2.png",
    //         text: "Limited time",
    //     },
    // ];

    useEffect(() => {
        const intervel = setInterval(() => {
            // setCurrentIndex((prev) => (prev == 0 ? 1 : 0));
        }, 1000);

        return () => clearInterval(intervel);
    }, []);

    // const { gradient, title, image, text } = data[currentIndex];

    return (
        <div>
            {/* Center Content */}
            <main className="flex-1  p-10 flex flex-col gap-10">
                {/* first 4 div */}
                <div className="">
                    <div className="font-montserrat font-semibold text-xl  p-4 ">Pending Actions</div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="w-full h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">On bording</p>
                            <p className="text-[24px] font-bold">54</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Confirmations</p>
                            <p className="text-[24px] font-bold">1</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Separtaion Request</p>
                            <p className="text-[24px] font-bold">0</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Off Boarding</p>
                            <p className="text-[24px] font-bold">5</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Updates</p>
                            <p className="text-[24px] font-bold">0</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Leaves</p>
                            <p className="text-[24px] font-bold">1</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Work From Home</p>
                            <p className="text-[24px] font-bold">0</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Leave Credit</p>
                            <p className="text-[24px] font-bold">5</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Attendence Request</p>
                            <p className="text-[24px] font-bold">54</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Expence</p>
                            <p className="text-[24px] font-bold">1</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Adv Salary</p>
                            <p className="text-[24px] font-bold">0</p>
                        </div>
                        <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Loans</p>
                            <p className="text-[24px] font-bold">5</p>
                        </div>
                    </div>
                    <div className="grid grid-col-2 lg:grid-cols-4 gap-4 mt-4">
                        <div className=" h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Incentive Request</p>
                            <p className="text-[24px] font-bold">54</p>
                        </div>
                        <div className=" h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Investment</p>
                            <p className="text-[24px] font-bold">1</p>
                        </div>
                        <div className=" h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                            <p className="text-[14px] font-medium">Time S</p>
                            <p className="text-[24px] font-bold">0</p>
                        </div>
                    </div>
                </div>

                {/* chart */}
                <div className="flex justify-center items-center">
                    <AttendanceGraph />
                </div>

                {/* last div */}

                <div className="flex flex-col lg:flex-row lg:justify-between gap-10  m-3">
                    {/* news-section */}
                    <div className="lg:w-[60%] bg-[#FDFBF9] rounded-xl p-5">
                        <div className="font-montserrat font-semibold text-xl pb-4 ">Stats / Info</div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-full h-[112px] bg-[#E6FFAE] rounded-xl p-7 flex flex-col gap-2">
                                <p className="text-[14px] font-medium">On bording</p>
                                <p className="text-[24px] font-bold">54</p>
                            </div>
                            <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                                <p className="text-[14px] font-medium">Confirmations</p>
                                <p className="text-[24px] font-bold">1</p>
                            </div>
                            <div className="w-full h-[112px] bg-[#F5FFDE] rounded-xl p-7 flex flex-col gap-2">
                                <p className="text-[14px] font-medium">Separtaion Request</p>
                                <p className="text-[24px] font-bold">0</p>
                            </div>
                            <div className="w-full h-[112px] bg-[#EDF7FF] rounded-xl p-7 flex flex-col gap-2">
                                <p className="text-[14px] font-medium">Off Boarding</p>
                                <p className="text-[24px] font-bold">5</p>
                            </div>
                        </div>
                    </div>

                    {/* chart admin side */}
                    <div className="w-[20rem] bg-slate-100 rounded-xl p-5">
                        <AdminProfilePieChart />
                        <div className="grid grid-cols-2 gap-4 font-semibold font-montserrat text-lg leading-none">
                            <div className="flex items-center justify-center gap-2">
                                <span className="bg-green-400 h-3 w-3 rounded-full"></span>
                                <span>Active</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <span className="bg-red-400 h-3 w-3 rounded-full"></span>
                                <span>Deactive</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <span className="bg-yellow-400 h-3 w-3 rounded-full"></span>
                                <span>Pending</span>
                            </div>
                            <div className="flex items-center gap-2 justify-center">
                                <span className="bg-gray-400 h-3 w-3 rounded-full"></span>
                                <span>Reject</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardData;
