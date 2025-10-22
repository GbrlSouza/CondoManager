"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Building2, Home, User, Phone } from "lucide-react";

function MainComponent() {
  const { data: user, loading: userLoading } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("resident");
  const [condominiumId, setCondominiumId] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [condominiums, setCondominiums] = useState([]);

  useEffect(() => {
    // Load pending profile data from localStorage
    if (typeof window !== "undefined") {
      const pendingData = localStorage.getItem("pendingUserData");
      if (pendingData) {
        try {
          const data = JSON.parse(pendingData);
          if (data.phone) setPhone(data.phone);
          if (data.role) setRole(data.role);
        } catch (e) {
          console.error("Error parsing pending user data:", e);
        }
      }
    }

    // Fetch available condominiums
    const fetchCondominiums = async () => {
      try {
        const res = await fetch("/api/condominiums");
        if (res.ok) {
          const data = await res.json();
          setCondominiums(data.condominiums || []);
        }
      } catch (err) {
        console.error("Failed to fetch condominiums:", err);
      }
    };

    fetchCondominiums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone,
          role,
          condominiumId: condominiumId ? parseInt(condominiumId) : null,
          unitNumber: role === "resident" ? unitNumber : null,
        }),
      });

      if (res.ok) {
        // Clear localStorage
        if (typeof window !== "undefined") {
          localStorage.removeItem("pendingUserData");
        }
        // Redirect to dashboard
        window.location.href = "/";
      } else {
        const data = await res.json();
        setError(data.error || "Erro ao salvar perfil");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Erro ao salvar perfil");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2188FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    window.location.href = "/account/signin";
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-[#2188FF] dark:bg-[#4A9EFF] flex items-center justify-center">
              <Building2 size={24} className="text-white" />
            </div>
          </div>
          <h1 
            className="text-2xl md:text-3xl font-bold text-[#012A66] dark:text-white mb-2"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Bem-vindo ao CondoManager
          </h1>
          <p 
            className="text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Complete seu perfil para começar
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-[#1E1E1E] p-6 md:p-8 border border-gray-200 dark:border-[#404040] space-y-6"
        >
          <div className="space-y-2">
            <label 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Nome Completo
            </label>
            <div className="relative">
              <User 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                type="text"
                value={user.name || ""}
                disabled
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-[#404040] bg-gray-50 dark:bg-[#333333] text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Email
            </label>
            <input
              type="email"
              value={user.email || ""}
              disabled
              className="w-full px-4 py-3 border border-gray-200 dark:border-[#404040] bg-gray-50 dark:bg-[#333333] text-gray-500 dark:text-gray-400"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            />
          </div>

          <div className="space-y-2">
            <label 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Telefone
            </label>
            <div className="relative">
              <Phone 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] focus:border-[#2188FF] transition-colors bg-white dark:bg-[#262626] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Tipo de Usuário
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] focus:border-[#2188FF] transition-colors bg-white dark:bg-[#262626] text-gray-900 dark:text-white"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              <option value="resident">Morador</option>
              <option value="sindico">Síndico</option>
            </select>
          </div>

          {role === "resident" && (
            <>
              <div className="space-y-2">
                <label 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Condomínio
                </label>
                <select
                  value={condominiumId}
                  onChange={(e) => setCondominiumId(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] focus:border-[#2188FF] transition-colors bg-white dark:bg-[#262626] text-gray-900 dark:text-white"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  <option value="">Selecione um condomínio</option>
                  {condominiums.map((condo) => (
                    <option key={condo.id} value={condo.id}>
                      {condo.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                  Número da Unidade
                </label>
                <div className="relative">
                  <Home 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                    size={20} 
                  />
                  <input
                    type="text"
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    placeholder="Ex: 101, 202, Casa 5"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] focus:border-[#2188FF] transition-colors bg-white dark:bg-[#262626] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                  />
                </div>
              </div>
            </>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-3 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-3 font-semibold hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors disabled:opacity-50"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            {loading ? "Salvando..." : "Completar Cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;