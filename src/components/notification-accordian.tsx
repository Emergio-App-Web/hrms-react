import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import { cn } from "@/lib/utils"
  
  export function AccordionNotification() {
    return (
      <div className="font-montserrat">
        <h2 className="text-lg font-semibold">Notification</h2>
        <Accordion type="single" collapsible className="max-w-xs">
          <AccordionItem 
            value="item-1" 
            className={cn(
              "border-b-0", // This will override the default border-b
              "hover:bg-gray-50 rounded-lg" // Optional: Add hover effect
            )}
          >
            <AccordionTrigger className="text-gray-500 font-bold text-xs hover:no-underline">
              Upcoming Holidays
            </AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem 
            value="item-2"
            className={cn(
              "border-b-0",
              "hover:bg-gray-50 rounded-lg"
            )}
          >
            <AccordionTrigger className="text-gray-500 font-bold text-xs hover:no-underline">
              Upcoming Birthdays
            </AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem 
            value="item-3"
            className={cn(
              "border-b-0",
              "hover:bg-gray-50 rounded-lg"
            )}
          >
            <AccordionTrigger className="text-gray-500 font-bold text-xs hover:no-underline">
              Upcoming Events
            </AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
  
          <AccordionItem 
            value="item-4" // Fixed the duplicate value
            className={cn(
              "border-b-0",
              "hover:bg-gray-50 rounded-lg"
            )}
          >
            <AccordionTrigger className="text-gray-500 font-bold text-xs hover:no-underline">
              Upcoming Meetings
            </AccordionTrigger>
            <AccordionContent>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  }