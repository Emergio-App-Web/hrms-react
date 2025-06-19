import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  ChevronsLeft,
  MessagesSquare,
  Home,
  LogOut,
  Settings,
  Watch,
  Heart,
  HandCoins,
  Gift,
  CalendarCheck,
  ClipboardCheck,
  Users,
  FileText,
  ScrollText,
  CalendarDays,
  Grid,
  ChevronDown,
  Wallet,
  ChevronsRight
} from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

  useEffect(() => {
    let touchStart = 0
    let touchEnd = 0

    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.changedTouches[0].screenY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      touchEnd = e.changedTouches[0].screenY
      if (isMobile && Math.abs(touchEnd - touchStart) > 50) {
        setIsCollapsed(true)
      }
    }

    const sidebar = sidebarRef.current
    if (sidebar) {
      sidebar.addEventListener('touchstart', handleTouchStart)
      sidebar.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      if (sidebar) {
        sidebar.removeEventListener('touchstart', handleTouchStart)
        sidebar.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isMobile])

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024 // Using lg breakpoint
      setIsMobile(isMobileView)
      if (isMobileView) {
        setIsCollapsed(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial check

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && isCollapsed && (
        <button
          className="fixed left-9 top-5 z-50 h-12 w-12 rounded-full bg-black text-white flex items-center justify-center shadow-lg"
          onClick={() => setIsCollapsed(false)}
        >
          <ChevronsRight className="h-6 w-6" />
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={cn(
          // Base styles
          "flex flex-col gap-4 bg-[#1C1C1C] p-4 text-white transition-all duration-300",
          // Mobile styles with custom scrollbar
          isMobile && [
            "fixed left-0 top-0 bottom-0 z-40 custom-scrollbar",
            "overflow-y-auto max-h-screen ", // Added overflow handling
            isCollapsed ? "-translate-x-full" : "translate-x-0"
          ],
          // Desktop styles
          !isMobile && [
            "sticky top-4", // Changed from top-0 to match padding
            "h-fit", // Account for padding
            "rounded-3xl",
            isCollapsed ? "w-[70px]" : "w-[350px]"
          ],
          // Width for mobile
          isMobile && !isCollapsed && "w-[250px]",
          // Rounded corners
          "rounded-r-3xl lg:rounded-3xl",
          "ml-2",
        )}
      >
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h2 className="text-xl font-extrabold font-nunitoSans text-white transition-all duration-600">
              <span className="text-[#ddff8f]">Emergio</span> Games
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-6 w-6 text-white hover:bg-transparent hover:text-white",
              isCollapsed ? "mx-auto" : "ml-auto"
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ChevronsRight className="h-4 w-4 transition-transform" />
            ) : (
              <ChevronsLeft className="h-4 w-4 transition-transform" />
            )}
          </Button>
        </div>

        <nav className="flex flex-1 flex-col gap-2 "
        >
          <NavItem
            icon={LayoutDashboard}
            title="Dashboard"
            to="/dashboard"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/dashboard'}
          />

          <NavItem
            icon={Home}
            title="Home"
            to="/home"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/home'}
          />

          <NavItem
            icon={Heart}
            title="Attendance"
            to="/attendance"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/attendance'}
          />

          <DropdownNavItem
            icon={MessagesSquare}
            title="Leaves"
            isCollapsed={isCollapsed}
            isOpen={openDropdown === 'leaves'}
            onClick={() => toggleDropdown('leaves')}
            items={[
              { title: 'Apply Leave', to: '/leaves/apply' },
              { title: 'Leave Balance', to: '/leaves/balance' },
              { title: 'Leave History', to: '/leaves/history' }
            ]}
          />

          <DropdownNavItem
            icon={Wallet}
            title="Expense"
            isCollapsed={isCollapsed}
            isOpen={openDropdown === 'expense'}
            onClick={() => toggleDropdown('expense')}
            items={[
              { title: 'Submit Expense', to: '/expense/submit' },
              { title: 'Expense History', to: '/expense/history' },
              { title: 'Approvals', to: '/expense/approvals' }
            ]}
          />

          <DropdownNavItem
            icon={HandCoins}
            title="Compensation"
            isCollapsed={isCollapsed}
            isOpen={openDropdown === 'compensation'}
            onClick={() => toggleDropdown('compensation')}
            items={[
              { title: 'Salary Slip', to: '/compensation/salary' },
              { title: 'Tax Documents', to: '/compensation/tax' },
              { title: 'Benefits', to: '/compensation/benefits' }
            ]}
          />

          <div className="my-2 h-px bg-white/10" />

          <NavItem
            icon={Gift}
            title="Assets"
            to="/assets"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/assets'}
          />

          <NavItem
            icon={CalendarCheck}
            title="Time Sheet"
            to="/timesheet"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/timesheet'}
          />

          <NavItem
            icon={ClipboardCheck}
            title="Lets Achieve"
            to="/achieve"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/achieve'}
          />

          <NavItem
            icon={Users}
            title="Training"
            to="/training"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/training'}
          />

          <NavItem
            icon={FileText}
            title="Forms"
            to="/forms"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/forms'}
          />

          <NavItem
            icon={ScrollText}
            title="Policies"
            to="/policies"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/policies'}
          />

          <NavItem
            icon={CalendarDays}
            title="My Calendar"
            to="/calendar"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/calendar'}
          />

          <NavItem
            icon={Grid}
            title="Organisation Chart"
            to="/org-chart"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/org-chart'}
          />

          <NavItem
            icon={Watch}
            title="Time Line"
            to="/timeline"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/timeline'}
          />

          <div className="my-2 h-px bg-white/10" />

          <NavItem
            icon={Settings}
            title="Settings"
            to="/settings"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/settings'}
          />

          <NavItem
            icon={LogOut}
            title="Logout"
            to="/logout"
            isCollapsed={isCollapsed}
            isActive={location.pathname === '/logout'}
          />
        </nav>
      </aside>
    </>
  )
}

interface NavItemProps {
  icon: React.ElementType
  title: string
  to: string
  isCollapsed: boolean
  isActive?: boolean
}

function NavItem({ icon: Icon, title, to, isCollapsed }: NavItemProps) {
  // const location = useLocation();

  const isActive =  location.pathname.startsWith(to)
  return (
    <Button
      variant="nav"
      asChild
      className={cn(
        "relative justify-start gap-4 px-2 text-white transition-colors duration-200 ",
        "before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2",
        "before:h-8 before:w-1.5 before:rounded-r-md before:opacity-0",
        "before:transition-all before:duration-300",
        "hover:before:opacity-100 hover:before:bg-[#ddff8f]/50",
        isCollapsed && "justify-center",
        isActive ?
          "bg-[#ddff8f] before:bg-[#ddff8f] before:opacity-100 text-black hover:before:opacity-100" :
          "hover:bg-[#cdf966] hover:text-black"
      )}
    >
      <Link to={to}>
        <Icon className={cn("h-4 w-4", isActive && "text-black")} />
        {!isCollapsed && <span>{title}</span>}
      </Link>
    </Button>
  )
}

interface DropdownNavItemProps {
  icon: React.ElementType
  title: string
  isCollapsed: boolean
  isOpen: boolean
  onClick: () => void
  items: { title: string; to: string }[]
}

function DropdownNavItem({
  icon: Icon,
  title,
  isCollapsed,
  onClick,
  items
}: DropdownNavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = items.some(item => item.to === location.pathname);

  return (
    <div className="relative ml-4 ">
      <Button
        variant="nav"
        className={cn(
          "relative w-full justify-start gap-4 px-2 text-white transition-colors duration-200",
          "before:absolute before:-left-4 before:top-1/2 before:-translate-y-1/2",
          "before:h-8 before:w-1.5 before:rounded-r-md before:opacity-0",
          "before:transition-all before:duration-300",
          "hover:before:opacity-100 hover:before:bg-[#ddff8f]/50",
          isCollapsed && "justify-center",
          isActive && [
            "bg-[#ddff8f] text-black",
            "before:opacity-100 before:bg-[#ddff8f]",
            "hover:bg-[#ddff8f]"
          ],
          !isActive && "hover:bg-[#ddff8f]/10"
        )}
        onClick={() => {
          setIsOpen(!isOpen);
          onClick?.();
        }}
      >
        <Icon className={cn(
          "h-4 w-4",
          isActive && "text-black"
        )} />
        {!isCollapsed && (
          <>
            <span className="flex-1 text-left">{title}</span>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              isOpen && "rotate-180"
            )} />
          </>
        )}
      </Button>

      {isOpen && !isCollapsed && (
        <div className="pl-8 mt-1 space-y-1">
          {items.map((item, index) => (
            <Button
              key={index}
              variant="nav"
              asChild
              className={cn(
                "relative w-full justify-start px-2 text-white transition-colors duration-200",
                location.pathname === item.to ? [
                  "bg-[#ddff8f]/10 text-[#ddff8f]",
                  "before:opacity-100 before:bg-[#ddff8f]",
                  "hover:bg-[#ddff8f]/20 hover:text-white"
                ] : [
                  "hover:bg-[#ddff8f]/10 hover:text-white"
                ]
              )}
            >
              <Link to={item.to}>{item.title}</Link>
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Sidebar;
// import * as React from "react"

