"use client"

import * as React from "react"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"


interface DatePickerProps {
  label: string
}

export function DatePicker({ label }: DatePickerProps) {
  const [date, setDate] = React.useState<Date>()

  return (
    <div className="grid w-full items-center gap-1.5">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-center text-left font-semibold text-[#1F1F1FB2] text-sm bg-[#f0f0f0]", !date && "text-muted-foreground")}
          >
            {date ? format(date, "PPP") : label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}

