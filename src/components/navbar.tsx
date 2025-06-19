
import { Bell, ChevronDown, MessageCircleMore, SwatchBookIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch } from "react-redux"
import { logout } from "@/context/reducers/authSlice"
import { useNavigate } from "react-router-dom"




interface NavbarProps {
  lastLoginTime?: string
  userAvatar?: string
  userName?: string
  userRole?: string
  colors?: string[]
  onSelect?: (color: string) => void
  onClear?: () => void
}

export function Navbar({
  lastLoginTime = "10:00 AM",
  userAvatar = "https://github.com/shadcn.png",
  userName = "Mr John Doe",
  userRole = "Associate UI/UX Designer",
  colors = [],
  onSelect = () => {},
  onClear = () => {},
}: NavbarProps) {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const HandleLogout = () => {
       dispatch(logout())
       navigate("/login")
       
  } 
  return (
    <nav className="bg-black font-montserrat w-full max-w-6xl mx-auto px-2 sm:px-4 py-2 flex flex-wrap items-center justify-between rounded-full mt-2">
      {/* Last Login Time - Hidden on mobile */}
      <p className="hidden sm:block sm:ml-10 lg:ml-0 text-white font-bold text-sm">Last In: {lastLoginTime}</p>

      {/* Main Navigation Items */}
      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        {/* Theme Dropdown - Shows on all screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-black text-white hover:bg-black hover:text-white p-2 sm:p-3">
              <div className="flex items-center gap-2">
                <span className="hidden lg:inline">Change Theme</span>
                <SwatchBookIcon className="w-5 h-5" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 p-4 bg-white">
            <div className="grid grid-cols-4 gap-2">
              {colors?.map((color, index) => (
                <button
                  key={index}
                  className="w-8 h-8 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform"
                  style={{
                    background: color,
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  onClick={() => onSelect(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
            {colors?.length > 0 && (
              <button 
                onClick={onClear} 
                className="mt-4 w-full text-blue-500 hover:text-blue-600 text-sm"
              >
                Clear
              </button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notification and Message Icons - Hidden on mobile */}
        <div className="hidden lg:flex items-center gap-2">
          <Button className="bg-black text-white hover:bg-black hover:text-white p-2 sm:p-3">
            <Bell className="w-5 h-5 sm:transform sm:scale-150" />
          </Button>
          <Button className="bg-black text-white hover:bg-black hover:text-white p-2 sm:p-3">
            <MessageCircleMore className="w-5 h-5 sm:transform sm:scale-150" />
          </Button>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-black text-white hover:bg-black hover:text-white p-1 sm:p-2">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback>{userName[0]}</AvatarFallback>
                </Avatar>
                <div className="hidden lg:flex flex-col items-start">
                  <p className="text-sm text-white font-bold">{userName}</p>
                  <p className="text-xs text-white">{userRole}</p>
                </div>
                <ChevronDown className="hidden sm:block w-4 h-4" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white w-44 border border-gray-800">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-white hover:text-black">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-white hover:text-black">
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-gray-800" />
            <DropdownMenuItem onClick={() => HandleLogout()} className="hover:bg-white hover:text-black">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

