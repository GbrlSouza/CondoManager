"use client";

import { useState } from "react";
import useAuth from "@/utils/useAuth";
import { Building2, Lock, Mail, User, Phone } from "lucide-react";

function MainComponent() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("resident");

  const { signUpWithCredentials } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password || !fullName) {
      setError("Por favor, preencha todos os campos obrigatórios");
      setLoading(false);
      return;
    }

    try {
      // Store additional data in localStorage for onboarding
      localStorage.setItem("pendingUserData", JSON.stringify({
        phone,
        role
      }));

      await signUpWithCredentials({
        email,
        password,
        name: fullName,
        callbackUrl: "/onboarding",
        redirect: true,
      });
    } catch (err) {
      const errorMessages = {
        EmailCreateAccount: "Este email já está em uso. Tente fazer login.",
        CredentialsSignin: "Erro ao criar conta. Verifique os dados.",
        AccessDenied: "Você não tem permissão para se cadastrar.",
        Configuration: "Erro no sistema. Tente novamente mais tarde.",
      };

      setError(
        errorMessages[err.message] || "Algo deu errado. Tente novamente.",
      );
      setLoading(false);
    }
  };

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
            Crie sua conta para começar
          </p>
        </div>

        <form
          noValidate
          onSubmit={onSubmit}
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
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Digite seu nome completo"
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
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
              Tipo de Usuário *
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
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
            {loading ? "Criando conta..." : "Criar Conta"}
          </button>

          <p 
            className="text-center text-sm text-gray-600 dark:text-gray-400"
            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
          >
            Já tem uma conta?{" "}
            <a
              href={`/account/signin${
                typeof window !== "undefined" ? window.location.search : ""
              }`}
              className="text-[#2188FF] dark:text-[#4A9EFF] hover:text-[#1e7ae6] dark:hover:text-[#3B8EEF] font-medium"
            >
              Faça login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default MainComponent;