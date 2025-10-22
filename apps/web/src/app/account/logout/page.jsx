"use client";

import useAuth from "@/utils/useAuth";
import { Building2, LogOut } from "lucide-react";

function MainComponent() {
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
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
            Tem certeza que deseja sair?
          </p>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] p-6 md:p-8 border border-gray-200 dark:border-[#404040] text-center space-y-6">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 flex items-center justify-center rounded-full">
              <LogOut size={32} className="text-red-500 dark:text-red-400" />
            </div>
          </div>

          <div>
            <h2 
              className="text-lg font-semibold text-[#012A66] dark:text-white mb-2"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Sair da Conta
            </h2>
            <p 
              className="text-gray-600 dark:text-gray-400 text-sm"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Você será desconectado do sistema e precisará fazer login novamente para acessar sua conta.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex-1 px-4 py-3 border border-gray-200 dark:border-[#404040] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#262626] active:bg-gray-100 dark:active:bg-[#333333] transition-colors font-medium"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 bg-red-500 dark:bg-red-600 text-white py-3 font-semibold hover:bg-red-600 dark:hover:bg-red-700 active:bg-red-700 dark:active:bg-red-800 transition-colors"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;