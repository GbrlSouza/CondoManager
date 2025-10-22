"use client";
import { useState } from "react";
import {
  Plus,
  Search,
  User,
  ChevronDown,
  Bell,
  Menu,
  Building2,
  MessageCircle,
} from "lucide-react";

export const Header = ({ sidebarOpen, setSidebarOpen, user, profile }) => {
  const [searchExpanded, setSearchExpanded] = useState(false);

  const getRoleDisplay = (role) => {
    switch (role) {
      case "administrator": return "Administrador";
      case "sindico": return "Síndico";
      case "resident": return "Morador";
      default: return "Usuário";
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1E1E1E] border-b border-[#E6EEF9] dark:border-[#333333] h-16">
      <div className="flex items-center justify-between px-4 md:px-6 h-full">
        {/* Left cluster */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-[#333333] active:bg-gray-200 dark:active:bg-[#404040] transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} className="text-gray-900 dark:text-white" />
          </button>

          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[#2188FF] dark:bg-[#4A9EFF] flex items-center justify-center">
              <Building2 size={16} className="text-white md:w-5 md:h-5" />
            </div>
            <div className="hidden md:block">
              <h1
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontWeight: 600,
                }}
                className="text-[#012A66] dark:text-white text-lg"
              >
                CondoManager
              </h1>
            </div>
            {profile?.condoUser?.role !== "administrator" && (
              <button className="hidden md:flex items-center space-x-1 bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#404040] px-3 py-1 text-sm hover:bg-gray-50 dark:hover:bg-[#333333] active:bg-gray-100 dark:active:bg-[#404040] transition-colors">
                <span
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 500,
                  }}
                  className="text-gray-900 dark:text-white"
                >
                  {profile?.condoUser?.condominium_id ? "Meu Condomínio" : "Sem Condomínio"}
                </span>
                <ChevronDown
                  size={14}
                  className="text-gray-900 dark:text-white"
                />
              </button>
            )}
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4 md:mx-8">
          <div className="relative">
            {/* Mobile search toggle */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-[#333333] active:bg-gray-200 dark:active:bg-[#404040] transition-colors"
              onClick={() => setSearchExpanded(!searchExpanded)}
            >
              <Search size={20} className="text-gray-900 dark:text-white" />
            </button>

            {/* Desktop search */}
            <div className="hidden md:block relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] focus:border-[#2188FF] transition-colors bg-white dark:bg-[#262626] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              />
            </div>
          </div>
        </div>

        {/* Right cluster */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Chat button */}
          <button className="relative hover:bg-gray-100 dark:hover:bg-[#333333] active:bg-gray-200 dark:active:bg-[#404040] p-2 transition-colors">
            <MessageCircle size={20} className="text-gray-600 dark:text-gray-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#1AD48F] dark:bg-[#22C55E] rounded-full"></div>
          </button>

          {/* Notifications */}
          <button className="relative hover:bg-gray-100 dark:hover:bg-[#333333] active:bg-gray-200 dark:active:bg-[#404040] p-2 transition-colors">
            <Bell size={20} className="text-gray-600 dark:text-gray-400" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full"></div>
          </button>

          {/* User menu */}
          <div className="flex items-center space-x-2 md:space-x-3 pl-2 md:pl-4 border-l border-gray-200 dark:border-[#404040]">
            <div className="text-right hidden md:block">
              <div
                className="text-sm font-medium text-[#012A66] dark:text-white"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {user?.name || "Usuário"}
              </div>
              <div
                className="text-xs text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {getRoleDisplay(profile?.condoUser?.role)}
              </div>
            </div>
            <button className="flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-[#333333] active:bg-gray-100 dark:active:bg-[#404040] px-2 py-1 transition-colors">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2188FF] dark:bg-[#4A9EFF] flex items-center justify-center text-white font-semibold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <ChevronDown size={14} className="text-gray-900 dark:text-white hidden md:block" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile search expanded */}
      {searchExpanded && (
        <div className="md:hidden px-4 pb-4 border-t border-gray-200 dark:border-[#404040]">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] bg-white dark:bg-[#262626] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};