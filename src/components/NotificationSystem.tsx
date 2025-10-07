import React, { useState, useEffect, createContext, useContext } from "react";
import { Notification } from "../types";
import { mockNotifications } from "../data/mockData";

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "isRead">
  ) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addNotification = (
    notification: Omit<Notification, "id" | "createdAt" | "isRead">
  ) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Simular notificações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          title: "Automação Concluída",
          message: "Onboarding de João Santos foi finalizado com sucesso",
          type: "success" as const,
          priority: "medium" as const,
        },
        {
          title: "Sistema Atualizado",
          message: "Office 365 foi atualizado para versão mais recente",
          type: "info" as const,
          priority: "low" as const,
        },
        {
          title: "Falha Detectada",
          message: "Erro na integração com Slack - verificar logs",
          type: "error" as const,
          priority: "high" as const,
          actionRequired: true,
        },
      ];

      // 30% chance de gerar notificação a cada 30 segundos
      if (Math.random() > 0.7) {
        const randomNotif =
          randomNotifications[
            Math.floor(Math.random() * randomNotifications.length)
          ];
        addNotification(randomNotif);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de NotificationProvider"
    );
  }
  return context;
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
}) => {
  const { notifications, markAsRead, markAllAsRead, removeNotification } =
    useNotifications();
  const [filter, setFilter] = useState<"all" | "unread" | "important">("all");

  const filteredNotifications = notifications.filter((n) => {
    switch (filter) {
      case "unread":
        return !n.isRead;
      case "important":
        return n.priority === "high" || n.actionRequired;
      default:
        return true;
    }
  });

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error":
        return "🚨";
      case "warning":
        return "⚠️";
      case "success":
        return "✅";
      case "info":
        return "ℹ️";
      default:
        return "📢";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-raiô-500 bg-raiô-50";
      default:
        return "border-l-gray-300 bg-gray-50";
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Notification Panel */}
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-raiô-600 to-raiô-700 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Central de Notificações</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
            >
              ✕
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === "all"
                  ? "bg-white text-raiô-600"
                  : "bg-raiô-500 text-white hover:bg-raiô-400"
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === "unread"
                  ? "bg-white text-raiô-600"
                  : "bg-raiô-500 text-white hover:bg-raiô-400"
              }`}
            >
              Não Lidas ({notifications.filter((n) => !n.isRead).length})
            </button>
            <button
              onClick={() => setFilter("important")}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                filter === "important"
                  ? "bg-white text-raiô-600"
                  : "bg-raiô-500 text-white hover:bg-raiô-400"
              }`}
            >
              Importantes
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-b bg-gray-50">
          <button
            onClick={markAllAsRead}
            className="text-sm text-raiô-600 hover:text-raiô-800 font-medium"
          >
            Marcar todas como lidas
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <span className="text-6xl mb-4 block">📭</span>
              <p className="text-gray-600">Nenhuma notificação encontrada</p>
            </div>
          ) : (
            <div className="space-y-2 p-4">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`
                    p-4 border-l-4 rounded-lg cursor-pointer transition-all duration-200
                    hover:shadow-md ${getPriorityColor(notification.priority)}
                    ${
                      !notification.isRead
                        ? "border-2 border-blue-200"
                        : "border border-gray-200"
                    }
                  `}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <h4 className="font-semibold text-gray-900">
                        {notification.title}
                      </h4>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  <p className="text-sm text-gray-700 mb-2">
                    {notification.message}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {new Date(notification.createdAt).toLocaleString("pt-BR")}
                    </span>
                    <div className="flex items-center space-x-2">
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-raiô-500 rounded-full"></span>
                      )}
                      {notification.actionRequired && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full">
                          Ação Necessária
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

interface NotificationBellProps {
  onClick: () => void;
  className?: string;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({
  onClick,
  className = "",
}) => {
  const { unreadCount } = useNotifications();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [unreadCount]);

  return (
    <button
      onClick={onClick}
      className={`relative p-2 rounded-lg hover:bg-gray-100 transition-colors ${className} ${
        isAnimating ? "animate-bounce" : ""
      }`}
    >
      <span className="text-xl">🔔</span>
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}
    </button>
  );
};

// Toast Notifications
interface ToastNotificationProps {
  notification: Notification;
  onClose: () => void;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  notification,
  onClose,
  position = "top-right",
}) => {
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const typeStyles = {
    error: "bg-red-500 border-red-600",
    warning: "bg-yellow-500 border-yellow-600",
    success: "bg-green-500 border-green-600",
    info: "bg-raiô-500 border-raiô-600",
  };

  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`
      fixed z-50 ${positionClasses[position]} 
      transform transition-all duration-500 animate-slide-in-right
    `}
    >
      <div
        className={`
        ${
          typeStyles[notification.type]
        } text-white p-4 rounded-lg shadow-lg border-l-4
        max-w-sm transform transition-transform duration-300 hover:scale-105
      `}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <span className="text-lg">
              {notification.type === "error" && "🚨"}
              {notification.type === "warning" && "⚠️"}
              {notification.type === "success" && "✅"}
              {notification.type === "info" && "ℹ️"}
            </span>
            <div>
              <h4 className="font-semibold">{notification.title}</h4>
              <p className="text-sm mt-1 opacity-90">{notification.message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors ml-2"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
