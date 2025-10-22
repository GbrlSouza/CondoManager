"use client";

import { useState } from "react";
import { Building2, Shield, User, Mail, Lock, Phone } from "lucide-react";

function MainComponent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Erro ao criar administrador");
      }
    } catch (err) {
      console.error("Error creating admin:", err);
      setError("Erro ao criar administrador");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (success) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="bg-white dark:bg-[#1E1E1E] p-6 md:p-8 border border-gray-200 dark:border-[#404040] space-y-6">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 flex items-center justify-center rounded-full">
                <Shield size={32} className="text-green-500 dark:text-green-400" />
              </div>
            </div>
            
            <div>
              <h2 
                className="text-lg font-semibold text-[#012A66] dark:text-white mb-2"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Administrador Criado com Sucesso!
              </h2>
              <p 
                className="text-gray-600 dark:text-gray-400 text-sm mb-4"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                O primeiro administrador foi criado. Agora você pode fazer login e começar a usar o sistema.
              </p>
              <p 
                className="text-red-600 dark:text-red-400 text-xs font-medium"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                IMPORTANTE: Delete esta página após criar o primeiro administrador por segurança.
              </p>
            </div>

            <button
              onClick={() => window.location.href = "/account/signin"}
              className="w-full bg-[#2188FF] dark:bg-[#4A9EFF] text-white py-3 font-semibold hover:bg-[#1e7ae6] dark:hover:bg-[#3B8EEF] active:bg-[#1a6bc7] dark:active:bg-[#2C7EDF] transition-colors"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    );
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
            CondoManager
          </h1>
          <p 
            className="text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Criar Primeiro Administrador
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield size={20} className="text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 
                className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Atenção - Rota de Segurança
              </h3>
              <p 
                className="text-xs text-yellow-700 dark:text-yellow-300"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              >
                Esta página deve ser usada apenas para criar o primeiro administrador do sistema. 
                Após criar o administrador, delete esta página por segurança.
              </p>
            </div>
          </div>
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
              Nome Completo *
            </label>
            <div className="relative">
              <User 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                required
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Digite o nome completo"
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
              Email *
            </label>
            <div className="relative">
              <Mail 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                required
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite o email"
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
              Telefone
            </label>
            <div className="relative">
              <Phone 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
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
              Senha *
            </label>
            <div className="relative">
              <Lock 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
                size={20} 
              />
              <input
                required
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite uma senha segura"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-[#404040] focus:outline-none focus:ring-2 focus:ring-[#2188FF] focus:border-[#2188FF] transition-colors bg-white dark:bg-[#262626] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              />
            </div>
          </div>

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
            {loading ? "Criando..." : "Criar Administrador"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;