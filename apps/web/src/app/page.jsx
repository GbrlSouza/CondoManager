"use client";

import { useState, useEffect } from "react";
import useUser from "@/utils/useUser";
import { Header } from "../components/Dashboard/Header";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { MainContent } from "../components/Dashboard/MainContent";
import { RightSidebar } from "../components/Dashboard/RightSidebar";

const DashboardPage = () => {
  const { data: user, loading: userLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          setProfile(data);

          // If user is not onboarded, redirect to onboarding
          if (!data.isOnboarded) {
            window.location.href = "/onboarding";
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setProfileLoading(false);
      }
    };

    if (!userLoading) {
      if (!user) {
        window.location.href = "/account/signin";
        return;
      }
      fetchProfile();
    }
  }, [user, userLoading]);

  if (userLoading || profileLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#121212] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#2188FF] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile?.isOnboarded) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212] overflow-x-hidden">
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        profile={profile}
      />
      <div className="flex overflow-x-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          profile={profile}
        />
        <div className="flex-1 flex flex-col xl:flex-row min-w-0 overflow-x-hidden">
          <MainContent user={user} profile={profile} />
          <RightSidebar user={user} profile={profile} />
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        * {
          box-sizing: border-box;
        }
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
