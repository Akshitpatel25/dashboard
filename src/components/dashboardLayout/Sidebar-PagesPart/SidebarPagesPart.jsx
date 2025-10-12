import { useState } from "react";
import {
  ChevronRight,
  User,
  FileText,
  Users,
  Briefcase,
  Newspaper,
  MessageSquareText,
  Folder,
  File,
  Eye,
} from "lucide-react";
import { useSelector } from "react-redux";

export default function SidebarPagesPart() {
  const [openDropdown, setOpenDropdown] = useState("User Profile");

  const isDark = useSelector((state) => state.theme.value);

  const menuItems = [
    {
      name: "User Profile",
      icon: User,
      dropdown: true,
      subItems: ["Overview", "Projects", "Campaigns", "Documents", "Followers"],
    },
    {
      name: "Account",
      icon: FileText,
      dropdown: false,
    },
    {
      name: "Corporate",
      icon: Users,
      dropdown: false,
    },
    {
      name: "Blog",
      icon: Newspaper,
      dropdown: false,
    },
    {
      name: "Social",
      icon: MessageSquareText,
      dropdown: false,
    },
  ];

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className="text-white/60 mt-6">
      <div className={`tracking-wide mb-3 ${isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C66]"}`}>
        Pages
      </div>

      <ul className="space-y-1">
        {menuItems.map(({ name, icon: Icon, dropdown, subItems = [] }) => {
          const isOpen = openDropdown === name;

          return (
            <li key={name} className="flex flex-col">
              <div
                className={`
                  group relative flex items-center gap-2 px-2 py-2 cursor-pointer rounded-xl transition-colors duration-200 
                  ${isDark ? "hover:bg-[#2C2C2C]" : "hover:bg-[#F5F5F5]"}
                `}
                onClick={() => {
                  if (dropdown) handleDropdownToggle(name);
                  // Optionally, handle active state here
                }}
              >
                {/* Dropdown chevron */}
                
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 
                      ${isDark ? "text-[#FFFFFF33]" : "text-gray-400"}
                      ${
                      isOpen ? "rotate-90 text-[#C6C7F8]" : "text-[#FFFFFF33]"
                    }`}
                  />
                

                {/* Icon */}
                <Icon
                  size={18}
                  className={`${isDark ? "text-white" : "text-black"}`}
                />

                {/* Label */}
                <span className={`${isDark ? "text-white" : "text-black"}`}>
                  {name}
                </span>
              </div>

              {/* Subitems */}
              {dropdown && (
                <ul
                  className={`overflow-hidden transition-all duration-300 pl-14 pr-2 space-y-1 ${
                    isOpen ? "max-h-fit opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {subItems.map((sub) => (
                    <li
                      key={sub}
                      className={`cursor-pointer transition-colors text 
                        text py-1 ${
                        isDark ? "text-[#FFFFFF] hover:text-[#C6C7F8]" : "text-[#1C1C1C] hover:text-black"
                      }`}
                    >
                      {sub}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
