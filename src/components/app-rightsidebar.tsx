import { CalendarDash, } from "./app-calendar";
import { AccordionNotification } from "./notification-accordian";
import { ProfilePieChart } from "./profile-piechart";

export default function RightBar() {
  return (
    <>
    <div className="flex flex-col space-y-4">
        <CalendarDash />
        <AccordionNotification />
        <ProfilePieChart />
    </div>
    </>
  )
}
