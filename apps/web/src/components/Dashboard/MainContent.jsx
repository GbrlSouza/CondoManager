"use client";
import { useState, useEffect } from "react";
import { 
  Building, 
  Users, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Download
} from "lucide-react";

const getStatusStyle = (status, colorType) => {
  const styles = {
    blue: {
      bg: "#E7F1FF",
      text: "#2188FF",
      darkBg: "#1a3a5c",
      darkText: "#4A9EFF",
    },
    green: {
      bg: "#DFF8EC",
      text: "#16A34A",
      darkBg: "#1a3a2e",
      darkText: "#22C55E",
    },
    red: {
      bg: "#FFE5E7",
      text: "#D6344E",
      darkBg: "#4a1a1a",
      darkText: "#EF4444",
    },
    yellow: {
      bg: "#FEF3C7",
      text: "#D97706",
      darkBg: "#4a3a1a",
      darkText: "#F59E0B",
    },
  };
  return styles[colorType] || styles.blue;
};

export const MainContent = ({ user, profile }) => {
  const [activeTab, setActiveTab] = useState("Todos");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const role = profile?.condoUser?.role;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        if (res.ok) {
          const data = await res.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Dashboard content based on user role
  const getDashboardContent = () => {
    if (role === "administrator") {
      return {
        title: "Painel Administrativo",
        stats: [
          { label: "Total de Condomínios", value: "12", icon: Building },
          { label: "Usuários Ativos", value: "1,247", icon: Users },
          { label: "Receita Mensal", value: "R$ 89.450", icon: CreditCard },
          { label: "Pendências", value: "23", icon: AlertTriangle },
        ],
        tabs: ["Todos", "Condomínios", "Usuários", "Financeiro", "Pendências"],
        recentItems: [
          {
            id: 1,
            title: "Novo Condomínio Cadastrado",
            description: "Residencial Vista Verde - 45 unidades",
            status: "Ativo",
            statusColor: "green",
            date: "2024-01-15",
          },
          {
            id: 2,
            title: "Pagamento Pendente",
            description: "Condomínio Jardim das Flores - Taxa de administração",
            status: "Pendente",
            statusColor: "yellow",
            date: "2024-01-14",
          },
          {
            id: 3,
            title: "Novo Síndico Cadastrado",
            description: "João Silva - Residencial Primavera",
            status: "Ativo",
            statusColor: "green",
            date: "2024-01-13",
          },
        ],
      };
    } else if (role === "sindico") {
      return {
        title: "Painel do Síndico",
        stats: [
          { label: "Total de Unidades", value: "50", icon: Building },
          { label: "Moradores Ativos", value: "127", icon: Users },
          { label: "Receita Mensal", value: "R$ 22.500", icon: CreditCard },
          { label: "Manutenções Pendentes", value: "5", icon: AlertTriangle },
        ],
        tabs: ["Todos", "Moradores", "Pagamentos", "Manutenção", "Reservas"],
        recentItems: [
          {
            id: 1,
            title: "Pagamento Recebido",
            description: "Apartamento 101 - Taxa condominial Janeiro",
            status: "Pago",
            statusColor: "green",
            date: "2024-01-15",
          },
          {
            id: 2,
            title: "Solicitação de Manutenção",
            description: "Elevador 2 - Ruído anormal",
            status: "Pendente",
            statusColor: "yellow",
            date: "2024-01-14",
          },
          {
            id: 3,
            title: "Nova Reserva",
            description: "Salão de Festas - Apartamento 205",
            status: "Aprovada",
            statusColor: "green",
            date: "2024-01-13",
          },
        ],
      };
    } else { // resident
      return {
        title: "Meu Painel",
        stats: [
          { label: "Minha Unidade", value: "101", icon: Building },
          { label: "Próximo Vencimento", value: "10/02", icon: Calendar },
          { label: "Valor a Pagar", value: "R$ 450", icon: CreditCard },
          { label: "Reservas Ativas", value: "1", icon: CheckCircle },
        ],
        tabs: ["Todos", "Pagamentos", "Reservas", "Comunicados"],
        recentItems: [
          {
            id: 1,
            title: "Boleto Disponível",
            description: "Taxa condominial - Fevereiro 2024",
            status: "Pendente",
            statusColor: "yellow",
            date: "2024-02-01",
          },
          {
            id: 2,
            title: "Reserva Confirmada",
            description: "Salão de Festas - 15/02/2024",
            status: "Confirmada",
            statusColor: "green",
            date: "2024-01-14",
          },
          {
            id: 3,
            title: "Comunicado",
            description: "Manutenção preventiva dos elevadores",
            status: "Lido",
            statusColor: "blue",
            date: "2024-01-13",
          },
        ],
      };
    }
  };

  const content = getDashboardContent();

  if (loading) {
    return (
      <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-x-hidden">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-[#2188FF] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-3 md:p-6 lg:p-8 overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h2
          className="text-lg md:text-2xl font-bold text-[#012A66] dark:text-white mb-4 md:mb-6"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {content.title}
        </h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mb-6">
          {content.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#262626] p-3 md:p-4 border border-gray-100 dark:border-[#404040] hover:shadow-sm transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="text-xs md:text-sm text-[#8194B6] dark:text-gray-400"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  {stat.label}
                </div>
                <stat.icon size={16} className="text-[#2188FF] dark:text-[#4A9EFF] md:w-5 md:h-5" />
              </div>
              <div
                className="text-lg md:text-2xl lg:text-3xl font-bold text-[#012A66] dark:text-white"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions Banner */}
        {role === "resident" && (
          <div className="bg-[#E4FBF2] dark:bg-[#1a3a2e] p-3 md:p-4 mb-6 flex items-center space-x-3 md:space-x-4 hover:bg-[#d9f7eb] dark:hover:bg-[#1e4a33] active:bg-[#cef4e6] dark:active:bg-[#235a3a] transition-colors cursor-pointer">
            <div className="w-6 h-6 md:w-8 md:h-8 bg-[#1AD48F] dark:bg-[#22C55E] flex items-center justify-center flex-shrink-0">
              <CreditCard size={14} className="text-white md:w-4 md:h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[#18B378] dark:text-[#22C55E] font-medium text-xs md:text-base"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Pagamento em Dia
              </div>
              <div
                className="text-sm md:text-lg font-bold text-[#18B378] dark:text-[#22C55E]"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Próximo vencimento: 10/02/2024
              </div>
            </div>
          </div>
        )}

        <div className="border-t border-[#E6EEF9] dark:border-[#333333]"></div>
      </div>

      {/* Recent Activity */}
      <div className="overflow-x-hidden">
        <h3
          className="text-base md:text-xl font-bold text-[#012A66] dark:text-white mb-4"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          Atividades Recentes
        </h3>

        <div className="flex flex-col space-y-4 mb-6">
          {/* Tabs */}
          <div className="w-full overflow-x-auto">
            <div className="flex space-x-4 md:space-x-8 pb-2 min-w-max">
              {content.tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 relative font-medium transition-colors whitespace-nowrap text-xs md:text-base flex-shrink-0 ${
                    activeTab === tab
                      ? "text-[#2188FF] dark:text-[#4A9EFF]"
                      : "text-gray-600 dark:text-gray-400 hover:text-[#2188FF] dark:hover:text-[#4A9EFF] active:text-[#1a6bc7] dark:active:text-[#2C7EDF]"
                  }`}
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2188FF] dark:bg-[#4A9EFF]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-4">
            <button className="bg-[#2188FF] dark:bg-[#4A9EFF] text-white px-3 md:px-4 py-2 hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors text-xs md:text-base font-medium">
              <Download size={14} className="inline mr-2 md:w-4 md:h-4" />
              Exportar
            </button>
            <button className="bg-white dark:bg-[#262626] border border-gray-300 dark:border-[#404040] text-gray-700 dark:text-gray-300 px-2 md:px-3 py-2 hover:border-[#2188FF] dark:hover:border-[#4A9EFF] hover:text-[#2188FF] dark:hover:text-[#4A9EFF] active:border-[#1a6bc7] dark:active:border-[#2C7EDF] active:text-[#1a6bc7] dark:active:text-[#2C7EDF] transition-colors flex items-center justify-center space-x-1 md:space-x-2 text-xs md:text-base">
              <Filter size={14} className="md:w-4 md:h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-[#404040] overflow-x-auto">
          <div className="min-w-[500px]">
            {content.recentItems.map((item, index) => (
              <div
                key={item.id}
                className={`p-4 md:p-6 hover:bg-[#F9FBFF] dark:hover:bg-[#262626] transition-colors ${
                  index < content.recentItems.length - 1 ? "border-b border-[#EEF3FA] dark:border-[#333333]" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-medium text-[#012A66] dark:text-white text-sm md:text-base mb-1"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {item.description}
                    </div>
                    <div
                      className="text-xs text-gray-500 dark:text-gray-500"
                      style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                    >
                      {item.date}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-4">
                    <span
                      className="px-2 py-1 text-xs font-semibold whitespace-nowrap"
                      style={{
                        backgroundColor: getStatusStyle(item.status, item.statusColor).darkBg,
                        color: getStatusStyle(item.status, item.statusColor).darkText,
                        borderRadius: "12px",
                      }}
                    >
                      {item.status}
                    </span>
                    <button className="text-[#2188FF] dark:text-[#4A9EFF] hover:underline active:text-[#1a6bc7] dark:active:text-[#2C7EDF] text-xs md:text-sm transition-colors whitespace-nowrap">
                      Ver detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};