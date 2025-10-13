import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Badge } from "@mui/material";
import {
  Menu,
  Notifications,
  Search,
  Close,
  DisplaySettings,
  WbSunnyOutlined,
  RestoreOutlined,
  NotificationsNoneOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import { Breadcrumbs, Link } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/features/theme/themeSlice";
import profileIcon from "../../assets/svg/profileIcon.svg";
import SidebarDashboardPart from "./Sidebar-DashboardPart/SidebarDashboardPart";
import SidebarPagesPart from "./Sidebar-PagesPart/SidebarPagesPart";
import bugIcon from "../../assets/svg/bug.svg";
import liveIcon from "../../assets/svg/live.svg";
import userIcon from "../../assets/svg/userIcon.svg";
import menu1 from "../../assets/svg/menu1.svg";

// userProfile
import profile from "../../assets/userProfile/profile.png";
import profile1 from "../../assets/userProfile/profile1.png";
import profile2 from "../../assets/userProfile/profile2.png";
import profile3 from "../../assets/userProfile/profile3.png";
import profile4 from "../../assets/userProfile/profile4.png";

// contactProfile
import c1 from "../../assets/contactsProfile/c1.png";
import c2 from "../../assets/contactsProfile/c2.png";
import c3 from "../../assets/contactsProfile/c3.png";
import c4 from "../../assets/contactsProfile/c4.png";
import c5 from "../../assets/contactsProfile/c5.png";
import c6 from "../../assets/contactsProfile/c6.png";

const DashboardLayout = ({ children }) => {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const [isRightOpen, setIsRightOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.theme.value);
  // Set theme variables
  useEffect(() => {
    if (isDark) {
      document.documentElement.style.setProperty("--theme-bg", "#1C1C1C");
      document.documentElement.style.setProperty("--theme-text", "#FFFFFF");
    } else {
      document.documentElement.style.setProperty("--theme-bg", "#FFFFFF");
      document.documentElement.style.setProperty("--theme-text", "#1C1C1C");
    }
  }, [isDark]);

  // Track window size
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive Logic
  useEffect(() => {
    if (windowWidth < 768) {
      setIsLeftOpen(false);
      setIsRightOpen(false);
    } else if (windowWidth <= 1024) {
      // Changed < to <=
      setIsLeftOpen(true);
      setIsRightOpen(false);
    } else {
      setIsLeftOpen(true);
      setIsRightOpen(true);
    }
  }, [windowWidth]);

  const toggleLeft = () => setIsLeftOpen((prev) => !prev);
  const toggleRight = () => setIsRightOpen((prev) => !prev);

  const notifications = [
    {
      id: 1,
      title: "You have a bug that needs to be fixed",
      msgTime: "Just now",
      img: bugIcon,
      color: "#E3F5FF",
    },
    {
      id: 2,
      title: "New user registered",
      msgTime: "59 minutes ago",
      img: userIcon,
      color: "#e5ecf6",
    },
    {
      id: 3,
      title: "You have a bug that needs to be fixed.",
      msgTime: "12 hours ago",
      img: bugIcon,
      color: "#E3F5FF",
    },
    {
      id: 4,
      title: "Andi Lane subscribed to you",
      msgTime: "Today, 11:59 AM",
      img: liveIcon,
      color: "#e5ecf6",
    },
  ];

  const activities = [
    {
      id: 1,
      title: "You have a bug that needs to be fixed.",
      msgTime: "Just now",
      img: profile,
    },
    {
      id: 2,
      title: "Released a new version",
      msgTime: "59 minutes ago",
      img: profile1,
    },
    {
      id: 3,
      title: "Submitted a bug",
      msgTime: "12 hours ago",
      img: profile2,
    },
    {
      id: 4,
      title: "Modified A data in Page X",
      msgTime: "Today, 11:59 AM",
      img: profile3,
    },
    {
      id: 5,
      title: "Deleted a page in Project X",
      msgTime: "Feb 2, 2023",
      img: profile4,
    },
  ];

  const contacts = [
    {
      id: 1,
      name: "Natali Craig",
      img: c1,
    },
    {
      id: 2,
      name: "Drew Cano",
      img: c2,
    },
    {
      id: 3,
      name: "Orlando Diggs",
      img: c3,
    },
    {
      id: 4,
      name: "Andi Lane",
      img: c4,
    },
    {
      id: 5,
      name: "Kate Morrison",
      img: c5,
    },
    {
      id: 6,
      name: "Koray Okumus",
      img: c6,
    },
  ];

  return (
    <div className="flex h-screen bg-theme text-theme-text overflow-hidden transition-colors duration-300">
      {/* ===== Left Sidebar ===== */}
      <aside
        className={`
        ${isDark ? "scrollbar-dark" : "scrollbar-light"}
        bg-theme border-r ${
          isDark ? "border-[#333333] bg-[#1C1C1C]" : "border-[#e8e8e8] bg-white"
        } flex flex-col z-30 transition-transform duration-300 gap-4 pt-5  pb-5 pl-4 
        ${
          windowWidth < 768
            ? `fixed h-full w-full top-0 left-0 ${
                isLeftOpen ? "translate-x-0" : "-translate-x-full"
              }`
            : "w-70 static translate-x-0"
        }
        overflow-y-auto 
        ${
          isDark
            ? "scrollbar-track-[#1C1C1C] scrollbar-thumb-[#333333]"
            : "scrollbar-track-white scrollbar-thumb-[#D1D5DB]"
        }
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4">
          <div className="flex gap-2 items-center">
            <img src={profileIcon} alt="profile-icon" width={24} height={24} />
            <div className="text-xl text-theme-text">ByeWind</div>
          </div>
          {windowWidth < 768 && (
            <IconButton onClick={toggleLeft}>
              <Close className={isDark ? "text-[#ffffff]" : "text-[#1c1c1c]"} />
            </IconButton>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {/* Favorites and Recently */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              {["Favorites", "Recently"].map((label) => (
                <div
                  key={label}
                  className={isDark ? "text-[#FFFFFF66]" : "text-[#1c1c1c66]"}
                >
                  {label}
                </div>
              ))}
            </div>
            <ul
              className={`list-disc space-y-2 pl-4 ${
                isDark ? "marker:text-[#FFFFFF33]" : "marker:text-[#1c1c1c33]"
              }`}
            >
              {["Overview", "Projects"].map((item) => (
                <li
                  key={item}
                  className="hover:text-theme-text cursor-pointer transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dashboards */}
          <SidebarDashboardPart />

          {/* Pages */}
          <SidebarPagesPart />
        </nav>
      </aside>

      {/* ===== Main + Right Section ===== */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 h-full justify-between items-center 
            ${windowWidth >= 1024 ? (isRightOpen ? "mr-72" : "mr-0") : ""}`}
      >
        {/* ===== Top Navbar ===== */}
        <AppBar
          position="static"
          elevation={0}
          color="transparent"
          className={`bg-theme border-b ${
            isDark ? "border-[#333333]" : "border-[#e8e8e8]"
          }`}
        >
          <Toolbar className="flex justify-between px-6">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Menu1 */}
              <IconButton
                edge="start"
                onClick={toggleLeft}
                sx={{ padding: "8px" }}
              >
                <img
                  src={menu1}
                  alt="menu"
                  width={18}
                  height={14}
                  className={isDark ? "brightness-100" : "brightness-0"}
                />
              </IconButton>

              {/* Star - Hidden on mobile */}
              <IconButton
                sx={{
                  padding: "8px",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                <StarBorderOutlined
                  sx={{
                    fontSize: "20px",
                    color: isDark ? "#FFFFFF" : "#1C1C1C",
                  }}
                />
              </IconButton>

              {/* Material-UI Breadcrumbs - Hidden on mobile and tablet */}
              <Breadcrumbs
                separator="/"
                sx={{
                  display: { xs: "none", lg: "flex" },
                  "& .MuiBreadcrumbs-separator": {
                    color: isDark ? "#FFFFFF66" : "#1C1C1C66",
                    mx: 1,
                  },
                }}
              >
                <Link
                  underline="none"
                  sx={{
                    color: isDark ? "#FFFFFF66" : "#1C1C1C66",
                    fontSize: "14px",
                    cursor: "pointer",
                    "&:hover": {
                      color: isDark ? "#FFFFFF" : "#1C1C1C",
                    },
                  }}
                >
                  Dashboards
                </Link>
                <span
                  className={`text-sm ${
                    isDark ? "text-white" : "text-[#1C1C1C]"
                  }`}
                >
                  Default
                </span>
              </Breadcrumbs>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              {/* Search Bar - Hidden on mobile */}
              <div
                className={`items-center gap-2 px-4 py-2 rounded-lg ${
                  isDark ? "bg-[#282828]" : "bg-[#F5F5F5]"
                } hidden md:flex`}
              >
                <Search
                  className={`${
                    isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C66]"
                  } w-5 h-5`}
                />
                <input
                  type="text"
                  placeholder="Search"
                  className={`bg-transparent outline-none text-sm w-32 ${
                    isDark
                      ? "text-white placeholder:text-[#FFFFFF66]"
                      : "text-[#1C1C1C] placeholder:text-[#1C1C1C66]"
                  }`}
                />
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    isDark
                      ? "bg-[#383838] text-[#FFFFFF66]"
                      : "bg-[#E5E5E5] text-[#1C1C1C66]"
                  }`}
                >
                  ⌘/
                </span>
              </div>

              {/* Icons */}
              {/* mode toggle */}
              <IconButton
                sx={{ padding: "8px" }}
                onClick={() => dispatch(toggleTheme())}
              >
                <WbSunnyOutlined
                  sx={{
                    fontSize: "20px",
                    color: isDark ? "#FFFFFF" : "#1C1C1C",
                  }}
                />
              </IconButton>

              {/* Restore - Hidden on mobile */}
              <IconButton
                sx={{
                  padding: "8px",
                  display: { xs: "none", md: "inline-flex" },
                }}
              >
                <RestoreOutlined
                  sx={{
                    fontSize: "20px",
                    color: isDark ? "#FFFFFF" : "#1C1C1C",
                  }}
                />
              </IconButton>

              {/* Notifications */}
              <IconButton sx={{ padding: "8px" }}>
                <Badge
                  badgeContent={0}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#FF4D4F",
                      color: "white",
                      fontSize: "10px",
                      minWidth: "16px",
                      height: "16px",
                    },
                  }}
                >
                  <NotificationsNoneOutlined
                    sx={{
                      fontSize: "20px",
                      color: isDark ? "#FFFFFF" : "#1C1C1C",
                    }}
                  />
                </Badge>
              </IconButton>

              {/* Menu1 */}
              <IconButton
                edge="start"
                onClick={toggleRight}
                sx={{ padding: "8px" }}
              >
                <img
                  src={menu1}
                  alt="menu"
                  width={18}
                  height={14}
                  className={isDark ? "brightness-100" : "brightness-0"}
                />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* ===== Page Content ===== */}
        <main className="flex-1 p-3 lg:p-6 overflow-y-auto bg-theme text-theme-text w-full">
          {children}
        </main>
      </div>

      {/* ===== Right Sidebar ===== */}
      <aside
        className={`fixed right-0 top-0 bg-theme border-l
        ${
          isDark ? "border-[#333333] bg-[#1C1C1C]" : "border-[#e8e8e8] bg-white"
        } 
        h-full z-40 transition-transform duration-300
        ${isRightOpen ? "translate-x-0" : "translate-x-full"}
        ${windowWidth < 768 ? "w-full" : "w-75"}
        flex flex-col overflow-hidden`}
        style={{ direction: "rtl" }}
      >
        <div
          style={{ direction: "ltr" }}
          className={`${isDark ? "scrollbar-dark" : "scrollbar-light"} 
          flex flex-col gap-4 p-4 h-full overflow-y-auto
          ${
            isDark
              ? "scrollbar-track-[#1C1C1C] scrollbar-thumb-[#333333]"
              : "scrollbar-track-white scrollbar-thumb-[#D1D5DB]"
          }`}
        >
          {/* Reusable Section Component */}
          {[
            {
              title: "Notifications",
              data: notifications,
              showClose: windowWidth < 1024, // Changed from 768 to 1024
              renderItem: (item) => (
                <div className="flex gap-2" key={item.id}>
                  <div
                    className="p-1 rounded-lg flex items-center justify-center h-1/2"
                    style={{ backgroundColor: item.color }}
                  >
                    <img
                      src={item.img}
                      alt={`${item.id}img`}
                      width={20}
                      height={20}
                    />
                  </div>
                  <div className="w-full text-sm">
                    <p className="line-clamp-1">{item.title}</p>
                    <p
                      className={
                        isDark ? "text-[#FFFFFF66]" : "text-[#1C1C1C66]"
                      }
                    >
                      {item.msgTime}
                    </p>
                  </div>
                </div>
              ),
            },
            {
              title: "Activities",
              data: activities,
              renderItem: (item, index, array) => (
                <div className="flex gap-2 relative" key={item.id}>
                  {index !== array.length - 1 && (
                    <div
                      className={`absolute left-3 top-8 w-[2px] ${
                        isDark ? "bg-[#FFFFFF1A]" : "bg-[#1C1C1C1A]"
                      } h-2`}
                    />
                  )}
                  <div className="rounded-full flex items-center justify-center shrink-0 w-7 h-7 z-10 relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={`${item.id}img`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="w-full text-sm">
                    <p className="line-clamp-1 font-normal leading-snug">
                      {item.title}
                    </p>
                    <p className="text-gray-500 text-xs">{item.msgTime}</p>
                  </div>
                </div>
              ),
            },
            {
              title: "Contacts",
              data: contacts,
              renderItem: (item) => (
                <div className="flex gap-2 relative" key={item.id}>
                  <div className="rounded-full flex items-center justify-center shrink-0 w-7 h-7 z-10 relative overflow-hidden">
                    <img
                      src={item.img}
                      alt={`${item.id}img`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="w-full text-sm">
                    <p className="line-clamp-1 font-normal leading-snug">
                      {item.name}
                    </p>
                  </div>
                </div>
              ),
            },
          ].map((section, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-base font-semibold text-theme-text">
                  {section.title}
                </p>
                {section.showClose && (
                  <IconButton onClick={toggleRight}>
                    <Close
                      className={`text-theme-text ${
                        isDark ? "text-[#ffffff]" : "text-[#1c1c1c]"
                      }`}
                    />
                  </IconButton>
                )}
              </div>
              <div className="overflow-y-auto text-theme-text/80 py-1 space-y-2">
                {section.data.map((item, index, array) =>
                  section.renderItem(item, index, array)
                )}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ===== Mobile Overlay ===== */}
      {windowWidth < 768 && (isLeftOpen || isRightOpen) && (
        <div
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => {
            setIsLeftOpen(false);
            setIsRightOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
