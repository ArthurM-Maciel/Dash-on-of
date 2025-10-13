import { useState, FC, ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Menu,
  X,
  Home,
  Users,
  FileText,
  Settings,
  Bell,
  LogOut,
} from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Gestão de Acessos", href: "/access-management", icon: Users },
    { name: "Requisições", href: "/requests", icon: FileText },
    { name: "Configurações", href: "/settings", icon: Settings },
  ];

  

  const filteredNavigation =
    user?.role === "hr"
      ? navigation.filter((item) => item.name !== "Gestão de Acessos")
      : navigation;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <img src="/raio-logo.svg" alt="Raiô Logo" className="h-8 w-8" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              Raiô Dashboard
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            title="Fechar menu lateral"
            aria-label="Fechar menu lateral"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="mt-5 px-2 space-y-1">
          {filteredNavigation.map((item) => {
            const isActive = window.location.pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-primary-100 text-primary-900"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </a>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              className="h-8 w-8 rounded-full"
              src={user?.avatar}
              alt={user?.name}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.name}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                title="Abrir menu lateral"
                aria-label="Abrir menu lateral"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-2 text-xl font-semibold text-gray-900">
                {window.location.pathname === "/" && "Dashboard"}
                {window.location.pathname === "/access-management" &&
                  "Gestão de Acessos"}
                {window.location.pathname === "/requests" && "Requisições"}
                {window.location.pathname === "/settings" && "Configurações"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 text-gray-400 hover:text-gray-500 relative"
                title="Notificações"
                aria-label="Abrir notificações"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-2 w-2 bg-danger-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <img
                  className="h-8 w-8 rounded-full"
                  src={user?.avatar}
                  alt={user?.name}
                />
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {user?.role}
                  </p>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-500"
                title="Sair"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
