import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  NotificationCenter,
  NotificationBell,
  useNotifications,
} from "./NotificationSystem";

interface LayoutProps {
  children: React.ReactNode;
}

const ModernLayout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);

  const isAdmin = user?.role === "admin";

  const adminMenuItems = [
    { icon: "📊", label: "Dashboard", path: "/dashboard", active: true },
    { icon: "⚙️", label: "Automações", path: "/automations" },
    { icon: "👥", label: "Colaboradores", path: "/employees" },
    { icon: "📈", label: "Analytics", path: "/analytics" },
    { icon: "🔧", label: "Sistemas", path: "/systems" },
    { icon: "🔔", label: "Notificações", path: "/notifications" },
    { icon: "⚡", label: "Logs", path: "/logs" },
  ];

  const hrMenuItems = [
    { icon: "📋", label: "Dashboard", path: "/dashboard", active: true },
    { icon: "➕", label: "Novo Funcionário", path: "/onboarding" },
    { icon: "➖", label: "Desligamento", path: "/offboarding" },
    { icon: "🔔", label: "Notificações", path: "/notifications" },
  ];

  const menuItems = isAdmin ? adminMenuItems : hrMenuItems;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gradient-to-b from-raiô-500 to-raiô-600 shadow-lg transition-all duration-300 ease-in-out`}
      >
        {/* Logo/Header */}
        <div className="flex items-center justify-between p-4 border-b border-raiô-400">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-2">
              <img src="/raio-logo.svg" alt="Raiô Logo" className="w-8 h-8" />
              <h2 className="text-xl font-bold text-white">
                Raiô<span className="text-raiô-100">Hub</span>
              </h2>
            </div>
          ) : (
            <img
              src="/raio-logo.svg"
              alt="Raiô Logo"
              className="w-8 h-8 mx-auto"
            />
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-raiô-400 transition-colors text-white"
          >
            {isSidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-raiô-400 to-raiô-600 flex items-center justify-center text-white font-semibold">
              {user?.name.charAt(0)}
            </div>
            {isSidebarOpen && (
              <div className="flex-1">
                <p className="font-semibold text-white">{user?.name}</p>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      isAdmin
                        ? "bg-white text-raiô-700"
                        : "bg-raiô-200 text-raiô-800"
                    }`}
                  >
                    {isAdmin ? "Admin" : "RH"}
                  </span>
                  {user?.level && (
                    <span className="px-2 py-1 text-xs bg-white text-raiô-700 rounded-full">
                      Nível {user.level}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Points/XP Bar (gamification) */}
          {isSidebarOpen && user?.points && (
            <div className="mt-3">
              <div className="flex justify-between text-xs text-raiô-100 mb-1">
                <span>XP: {user.points}</span>
                <span>{user.level ? `Nível ${user.level}` : "Nível 1"}</span>
              </div>
              <div className="w-full bg-raiô-300 rounded-full h-2">
                <div
                  className={`xp-progress-bar ${
                    user.points % 1000 > 500 ? "w-1/2" : "w-1/4"
                  }`}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                item.active
                  ? "bg-white text-raiô-700 border-l-4 border-white shadow-md"
                  : "text-raiô-100 hover:bg-raiô-400 hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {isSidebarOpen && (
                <span className="font-medium">{item.label}</span>
              )}
              {item.label === "Notificações" && unreadCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="text-lg">🚪</span>
            {isSidebarOpen && <span className="font-medium">Sair</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-raiô-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-2xl font-bold text-raiô-800">
                {isAdmin ? "Painel Administrativo" : "Painel RH"}
              </h1>
              <p className="text-sm text-raiô-600">
                {isAdmin
                  ? "Controle total das automações e sistemas"
                  : "Gerencie onboarding e offboarding de funcionários"}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button className="p-2 rounded-lg hover:bg-raiô-50 transition-colors text-raiô-600">
                🌙
              </button>

              {/* Notifications */}
              <NotificationBell onClick={() => setShowNotifications(true)} />

              {/* Quick Stats */}
              <div className="hidden md:flex items-center space-x-4 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">94%</div>
                  <div className="text-xs text-gray-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-raiô-600">12</div>
                  <div className="text-xs text-gray-600">Ativas</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-6">{children}</main>

        {/* Notification Center */}
        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      </div>
    </div>
  );
};

export default ModernLayout;
