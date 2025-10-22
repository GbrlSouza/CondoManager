"use client";
import {
  Grid,
  Building,
  Users,
  CreditCard,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  X,
  MoreHorizontal,
  Home,
  UserCheck,
  Wrench,
} from "lucide-react";

export const Sidebar = ({ sidebarOpen, setSidebarOpen, user, profile }) => {
  const role = profile?.condoUser?.role;

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { icon: Grid, label: "Dashboard", active: true, href: "/" },
    ];

    if (role === "administrator") {
      return [
        ...baseItems,
        { icon: Building, label: "Condomínios", href: "/condominiums" },
        { icon: Users, label: "Usuários", href: "/users" },
        { icon: CreditCard, label: "Financeiro", href: "/financial" },
        { icon: MessageCircle, label: "Chat Central", href: "/chat" },
        { icon: Settings, label: "Configurações", href: "/settings" },
      ];
    } else if (role === "sindico") {
      return [
        ...baseItems,
        { icon: Building, label: "Meu Condomínio", href: "/condominium" },
        { icon: Users, label: "Moradores", href: "/residents" },
        { icon: Home, label: "Unidades", href: "/units" },
        { icon: Calendar, label: "Espaços", href: "/amenities" },
        { icon: Wrench, label: "Manutenção", href: "/maintenance" },
        { icon: CreditCard, label: "Financeiro", href: "/payments" },
        { icon: MessageCircle, label: "Chat", href: "/chat" },
      ];
    } else { // resident
      return [
        ...baseItems,
        { icon: Home, label: "Minha Unidade", href: "/unit" },
        { icon: Calendar, label: "Reservas", href: "/bookings" },
        { icon: CreditCard, label: "Pagamentos", href: "/payments" },
        { icon: MessageCircle, label: "Chat", href: "/chat" },
        { icon: UserCheck, label: "Meu Perfil", href: "/profile" },
      ];
    }
  };

  const navItems = getNavItems();

  const getRoleDisplay = (role) => {
    switch (role) {
      case "administrator": return "Administrador";
      case "sindico": return "Síndico";
      case "resident": return "Morador";
      default: return "Usuário";
    }
  };

  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:relative lg:translate-x-0 z-50 lg:z-auto
          w-60 lg:w-60 bg-[#F4F8FF] dark:bg-[#1E1E1E] min-h-screen border-r border-[#E6EEF9] dark:border-[#333333] p-4 md:p-6
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Mobile close button */}
        <button
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-[#333333] active:bg-gray-300 dark:active:bg-[#404040] rounded-md transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <X size={20} className="text-gray-900 dark:text-white" />
        </button>

        {/* User Card */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#2188FF] dark:bg-[#4A9EFF] flex items-center justify-center text-white font-semibold text-sm md:text-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="font-semibold text-[#012A66] dark:text-white text-sm md:text-base truncate"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {user?.name || "Usuário"}
              </div>
              <div
                className="text-xs md:text-sm text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {getRoleDisplay(role)}
              </div>
            </div>
            <button className="p-1 hover:bg-gray-200 dark:hover:bg-[#333333] active:bg-gray-300 dark:active:bg-[#404040] transition-colors">
              <MoreHorizontal
                size={16}
                className="text-gray-900 dark:text-white"
              />
            </button>
          </div>

          {role === "sindico" && (
            <button
              className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-2 md:py-3 font-semibold hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors text-sm md:text-base"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Novo Morador
            </button>
          )}

          {role === "resident" && (
            <button
              className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-2 md:py-3 font-semibold hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors text-sm md:text-base"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Nova Reserva
            </button>
          )}

          {role === "administrator" && (
            <button
              className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-2 md:py-3 font-semibold hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors text-sm md:text-base"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Novo Condomínio
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="mb-6 md:mb-8">
          <div className="space-y-1 md:space-y-2">
            {navItems.map((item, index) => (
              <div key={index} className="relative">
                <button
                  className={`w-full flex items-center space-x-3 px-3 py-2 md:py-3 transition-colors text-sm md:text-base ${
                    item.active
                      ? "text-[#2188FF] dark:text-[#4A9EFF] font-semibold bg-white dark:bg-[#262626]"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#2188FF] dark:hover:text-[#4A9EFF] hover:bg-white dark:hover:bg-[#262626] active:bg-gray-50 dark:active:bg-[#333333]"
                  }`}
                  onClick={() => {
                    if (item.href) {
                      window.location.href = item.href;
                    }
                  }}
                >
                  <item.icon size={18} className="md:w-5 md:h-5" />
                  <span
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
                {item.active && (
                  <div className="absolute left-0 top-0 w-1 h-full bg-[#2188FF] dark:bg-[#4A9EFF]"></div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Quick Stats Card */}
        {role !== "administrator" && (
          <div className="bg-white dark:bg-[#262626] p-3 md:p-4 shadow-sm dark:shadow-none dark:border dark:border-[#404040] mb-6 md:mb-8">
            <div className="mb-2">
              <span className="text-xs font-bold text-[#1AD48F] dark:text-[#22C55E] uppercase tracking-wide">
                {role === "sindico" ? "Meu Condomínio" : "Minha Unidade"}
              </span>
            </div>
            <h3
              className="text-base md:text-lg font-semibold text-[#012A66] dark:text-white mb-2"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {role === "sindico" ? "Residencial Jardim" : "Apartamento 101"}
            </h3>
            <p
              className="text-sm text-gray-600 dark:text-gray-400 mb-3"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {role === "sindico" 
                ? "50 unidades • 3 pendências" 
                : "Pagamento em dia • Sem pendências"
              }
            </p>
            <button className="text-[#2188FF] dark:text-[#4A9EFF] text-sm font-medium hover:underline active:text-[#1a6bc7] dark:active:text-[#2C7EDF] transition-colors">
              Ver detalhes
            </button>
          </div>
        )}

        {/* Footer Links */}
        <div className="space-y-2">
          <button 
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-[#2188FF] dark:hover:text-[#4A9EFF] active:text-[#1a6bc7] dark:active:text-[#2C7EDF] text-sm transition-colors"
            onClick={() => window.location.href = "/settings"}
          >
            <Settings size={16} />
            <span>Configurações</span>
          </button>
          <button 
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 active:text-red-600 dark:active:text-red-500 text-sm transition-colors"
            onClick={() => window.location.href = "/account/logout"}
          >
            <LogOut size={16} />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </>
  );
};