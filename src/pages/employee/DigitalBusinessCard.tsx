import { Card, CardContent } from "@/components/ui/card";

const DigitalBusinessCard = () => {
  return (
    <Card className="relative  max-w-3xl mx-auto rounded-3xl w-[476px] h-[755px] ">
      <CardContent className="px-0 " >
        <div className=" bg-[#DDFF8F] rounded-2xl bg-[url('/cardBG.png')] bg-cover bg-center p-5 flex flex-col gap-12">
          <div>
            <h1 className="text-[24px] font-montserrat font-bold text-center">
              Emergio Games Pvt ltd
            </h1>
          </div>
          <div className="flex justify-center">
            <img
              src="/demoimg.png"
              className="w-[170px] h-[170px] rounded-full"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-[24px] font-bold text-[#4F4F4F] font-montserrat">
              Mr vishak ps{" "}
              <span className="text-[19px] font-normal">(UIUX01274)</span>
            </h1>
            <p className="text-[19px] font-montserrat">
              Associate UI/ UX Designer
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 ">
            <p className="bg-[#4F4F4F] p-1 rounded-3xl text-white text-center text-[14px font-montserrat py-1 ">
              Add to Contacts
            </p>
            <p className="bg-[#4F4F4F] p-1 rounded-3xl text-white text-center text-[14px font-montserrat py-1">
              Whatsapp Me
            </p>
            <p className="bg-[#4F4F4F] p-1 rounded-3xl text-white text-center text-[14px font-montserrat py-1">
              Call Me
            </p>
            <p className="bg-[#4F4F4F] p-1 rounded-3xl text-white text-center text-[14px font-montserrat py-1">
              Email Me
            </p>
          </div>
          <div className="flex justify-center">
            <div className="w-[150px] h-[150px] bg-white">
              <img src="/QR.png" alt="" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalBusinessCard;
