"use client";
import { useState } from "react";
import { 
  MessageCircle, 
  Plus, 
  Bell, 
  Clock, 
  X, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  TrendingUp
} from "lucide-react";

export const RightSidebar = ({ user, profile }) => {
  const [showPostponeMenu, setShowPostponeMenu] = useState(null);
  const [selectedPostpone, setSelectedPostpone] = useState("1 hour");
  
  const role = profile?.condoUser?.role;

  const postponeOptions = ["1 hora", "4 horas", "1 dia", "1 semana", "Personalizar"];

  // Get role-specific notifications and financial data
  const getRoleSpecificData = () => {
    if (role === "administrator") {
      return {
        financialTitle: "Receita Total do Sistema",
        financialValue: "R$ 127.890",
        financialSubtext: "Média da última semana",
        notifications: [
          {
            id: 1,
            title: "Novo Condomínio Pendente",
            description: "Residencial Vista Verde aguarda aprovação",
            type: "warning",
          },
          {
            id: 2,
            title: "Relatório Mensal Disponível",
            description: "Relatório financeiro de Janeiro 2024",
            type: "info",
          },
        ],
      };
    } else if (role === "sindico") {
      return {
        financialTitle: "Receita do Condomínio",
        financialValue: "R$ 22.500",
        financialSubtext: "Arrecadação mensal",
        notifications: [
          {
            id: 1,
            title: "Manutenção Urgente",
            description: "Elevador 2 precisa de reparo imediato",
            type: "urgent",
          },
          {
            id: 2,
            title: "Nova Reserva",
            description: "Salão de festas reservado para 15/02",
            type: "success",
          },
        ],
      };
    } else { // resident
      return {
        financialTitle: "Meus Pagamentos",
        financialValue: "R$ 450",
        financialSubtext: "Próximo vencimento",
        notifications: [
          {
            id: 1,
            title: "Boleto Disponível",
            description: "Taxa condominial de Fevereiro 2024",
            type: "warning",
          },
          {
            id: 2,
            title: "Reserva Confirmada",
            description: "Salão de festas - 15/02/2024 às 19h",
            type: "success",
          },
        ],
      };
    }
  };

  const data = getRoleSpecificData();

  const getNotificationIcon = (type) => {
    switch (type) {
      case "urgent": return <AlertTriangle size={14} className="text-red-500 dark:text-red-400" />;
      case "warning": return <Clock size={14} className="text-yellow-500 dark:text-yellow-400" />;
      case "success": return <CheckCircle size={14} className="text-green-500 dark:text-green-400" />;
      default: return <Bell size={14} className="text-blue-500 dark:text-blue-400" />;
    }
  };

  return (
    <div className="w-full xl:w-80 xl:flex-shrink-0 p-3 md:p-6 lg:p-8 space-y-4 md:space-y-6 overflow-x-hidden">
      {/* Financial Dashboard */}
      <div className="bg-[#F4F8FF] dark:bg-[#1a3a5c] p-3 md:p-6 overflow-hidden">
        <div
          className="text-[#2188FF] dark:text-[#4A9EFF] font-semibold mb-2 text-sm md:text-base"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {data.financialTitle}
        </div>
        <div
          className="text-xl md:text-3xl font-bold text-[#012A66] dark:text-white mb-1"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {data.financialValue}
        </div>
        <div
          className="text-sm text-gray-600 dark:text-gray-400 mb-4"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {data.financialSubtext}
        </div>

        {/* Chart placeholder */}
        <div className="h-20 md:h-32 bg-white dark:bg-[#262626] p-2 md:p-4 mb-4 flex items-end justify-between gap-1">
          {[40, 60, 80, 45, 70, 90, 55, 65].map((height, index) => (
            <div
              key={index}
              className="bg-[#2188FF] dark:bg-[#4A9EFF] w-3 md:w-6 flex-1 max-w-[20px]"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
          <button className="text-[#012A66] dark:text-[#E0E7FF] hover:underline active:text-[#1a6bc7] dark:active:text-[#2C7EDF] text-xs md:text-base transition-colors">
            {role === "resident" ? "Histórico de pagamentos" : "Relatório financeiro"}
          </button>
          <button className="bg-[#2188FF] dark:bg-[#4A9EFF] text-white px-3 md:px-4 py-2 hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors text-xs md:text-base whitespace-nowrap">
            {role === "resident" ? "Pagar agora" : "Ver detalhes"}
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white dark:bg-[#1E1E1E] p-3 md:p-6 border border-gray-200 dark:border-[#404040] overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-base md:text-lg font-bold text-[#012A66] dark:text-white"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Notificações
          </h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#333333] active:bg-gray-200 dark:active:bg-[#404040] transition-colors">
              <Plus size={16} className="text-[#2188FF] dark:text-[#4A9EFF]" />
            </button>
            <div className="relative">
              <Bell size={16} className="text-gray-600 dark:text-gray-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 dark:bg-red-400"></div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {data.notifications.map((notification, index) => (
            <div key={notification.id} className="relative">
              <div className="flex items-start space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-10 md:h-10 bg-[#E7F1FF] dark:bg-[#1a3a5c] flex items-center justify-center flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="font-semibold text-[#012A66] dark:text-white mb-1 text-xs md:text-base"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {notification.title}
                  </div>
                  <div
                    className="text-xs text-gray-600 dark:text-gray-400 mb-2"
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {notification.description}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowPostponeMenu(
                            showPostponeMenu === notification.id
                              ? null
                              : notification.id,
                          )
                        }
                        className="flex items-center space-x-1 text-xs text-[#2188FF] dark:text-[#4A9EFF] hover:underline active:text-[#1a6bc7] dark:active:text-[#2C7EDF] transition-colors"
                      >
                        <Clock size={12} />
                        <span>Adiar</span>
                      </button>

                      {showPostponeMenu === notification.id && (
                        <div className="absolute top-full left-0 mt-2 w-44 md:w-60 bg-[#2188FF] dark:bg-[#4A9EFF] p-3 md:p-4 z-10">
                          <div
                            className="text-white font-semibold mb-3 text-sm"
                            style={{
                              fontFamily:
                                "system-ui, -apple-system, sans-serif",
                            }}
                          >
                            Adiar notificação
                          </div>
                          <div className="space-y-2">
                            {postponeOptions.map((option) => (
                              <label
                                key={option}
                                className="flex items-center space-x-2 text-white cursor-pointer hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] px-2 py-1 transition-colors"
                              >
                                <input
                                  type="radio"
                                  name="postpone"
                                  value={option}
                                  checked={selectedPostpone === option}
                                  onChange={(e) =>
                                    setSelectedPostpone(e.target.value)
                                  }
                                  className="text-white"
                                />
                                <span className="text-xs">
                                  {option === "Personalizar" ? (
                                    <div className="flex items-center space-x-1">
                                      <Plus size={12} />
                                      <span>Personalizar</span>
                                    </div>
                                  ) : (
                                    option
                                  )}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <button className="text-xs text-[#2188FF] dark:text-[#4A9EFF] hover:underline active:text-[#1a6bc7] dark:active:text-[#2C7EDF] transition-colors">
                      Ver detalhes
                    </button>
                  </div>
                </div>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#333333] active:bg-gray-200 dark:active:bg-[#404040] transition-colors flex-shrink-0">
                  <X
                    size={12}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 md:w-4 md:h-4"
                  />
                </button>
              </div>
              {index < data.notifications.length - 1 && (
                <div className="border-t border-gray-100 dark:border-[#333333] mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-[#1E1E1E] p-3 md:p-6 border border-gray-200 dark:border-[#404040] overflow-hidden">
        <h3
          className="text-base md:text-lg font-bold text-[#012A66] dark:text-white mb-4"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Ações Rápidas
        </h3>
        
        <div className="space-y-3">
          {role === "administrator" && (
            <>
              <button className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-2 px-4 hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] transition-colors text-sm font-medium">
                Novo Condomínio
              </button>
              <button className="w-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#404040] text-gray-700 dark:text-gray-300 py-2 px-4 hover:border-[#2188FF] dark:hover:border-[#4A9EFF] transition-colors text-sm">
                Relatório Geral
              </button>
            </>
          )}
          
          {role === "sindico" && (
            <>
              <button className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-2 px-4 hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] transition-colors text-sm font-medium">
                Novo Morador
              </button>
              <button className="w-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#404040] text-gray-700 dark:text-gray-300 py-2 px-4 hover:border-[#2188FF] dark:hover:border-[#4A9EFF] transition-colors text-sm">
                Gerar Boletos
              </button>
            </>
          )}
          
          {role === "resident" && (
            <>
              <button className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-2 px-4 hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] transition-colors text-sm font-medium">
                Nova Reserva
              </button>
              <button className="w-full bg-white dark:bg-[#262626] border border-gray-200 dark:border-[#404040] text-gray-700 dark:text-gray-300 py-2 px-4 hover:border-[#2188FF] dark:hover:border-[#4A9EFF] transition-colors text-sm">
                Meus Boletos
              </button>
            </>
          )}
        </div>
      </div>

      {/* Chat Widget */}
      <div className="bg-[#E4FBF2] dark:bg-[#1a3a2e] p-3 md:p-4 overflow-hidden">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-[#1AD48F] dark:bg-[#22C55E] flex items-center justify-center">
            <MessageCircle size={16} className="text-white" />
          </div>
          <div>
            <div
              className="text-[#18B378] dark:text-[#22C55E] font-medium text-sm"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Chat Disponível
            </div>
            <div
              className="text-xs text-[#18B378] dark:text-[#22C55E]"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              {role === "resident" ? "Fale com o síndico" : "Central de mensagens"}
            </div>
          </div>
        </div>
        <button className="w-full bg-[#1AD48F] dark:bg-[#22C55E] text-white py-2 px-4 hover:bg-[#16a34a] dark:hover:bg-[#16a34a] transition-colors text-sm font-medium">
          Abrir Chat
        </button>
      </div>
    </div>
  );
};