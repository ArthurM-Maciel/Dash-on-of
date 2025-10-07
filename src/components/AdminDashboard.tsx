import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  mockDashboardStats,
  mockAccessRequests,
  mockSystems,
  mockAutomationStatus,
  mockNotifications,
} from "../data/mockData";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [stats] = useState(mockDashboardStats);
  const [recentRequests] = useState(mockAccessRequests.slice(0, 5));
  const [systemsStatus] = useState(mockSystems);
  const [automations] = useState(mockAutomationStatus);
  const [notifications] = useState(
    mockNotifications.filter((n) => !n.isRead).slice(0, 3)
  );
  const [isRealTime, setIsRealTime] = useState(true);

  // Simular atualizações em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRealTime) {
        // Simulate real-time updates
        console.log("Atualizando dados em tempo real...");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isRealTime]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-raiô-100 text-raiô-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header com Gamificação */}
      <div className="bg-gradient-to-r from-raiô-500 to-raiô-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user?.name}! 👋</h1>
            <p className="text-raiô-100 mt-2">
              Bem-vindo ao seu painel administrativo
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">⚡</span>
                <div>
                  <p className="text-sm font-medium">
                    Nível {user?.level || 1}
                  </p>
                  <p className="text-xs text-raiô-200">
                    {user?.points || 0} XP
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-sm font-medium">
                    {user?.badges?.length || 0} Badges
                  </p>
                  <p className="text-xs text-raiô-200">Conquistadas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle Real-time */}
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm">Tempo Real</span>
              <button
                onClick={() => setIsRealTime(!isRealTime)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isRealTime ? "bg-green-500" : "bg-gray-300"
                } transition-colors`}
                aria-label={
                  isRealTime ? "Desativar tempo real" : "Ativar tempo real"
                }
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isRealTime ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            {isRealTime && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-raiô-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Solicitações
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalRequests}
              </p>
              <p className="text-xs text-green-600 mt-1">↗ +12% este mês</p>
            </div>
            <div className="p-3 bg-raiô-100 rounded-full">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.pendingRequests}
              </p>
              <p className="text-xs text-yellow-600 mt-1">Requer atenção</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Taxa de Sucesso
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.automationSuccessRate}%
              </p>
              <p className="text-xs text-green-600 mt-1">↗ +2.1% semana</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-raiô-600">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Sistemas Online
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.systemsOnline}/{stats.totalSystems}
              </p>
              <p className="text-xs text-green-600 mt-1">Todos funcionando</p>
            </div>
            <div className="p-3 bg-raiô-100 rounded-full">
              <span className="text-2xl">🔧</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Principal - Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna 1 - Solicitações Recentes */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Solicitações Recentes
            </h3>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm bg-raiô-100 text-raiô-700 rounded-lg hover:bg-raiô-200 transition-colors"
                aria-label="Ver todas as solicitações"
              >
                Todas
              </button>
              <button
                className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Ver solicitações urgentes"
              >
                Urgentes
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-raiô-500 to-raiô-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {request.employeeName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {request.employeeName}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {request.position} • {request.department}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`w-2 h-2 rounded-full ${getPriorityColor(
                          request.priority
                        )}`}
                      ></span>
                      <span className="text-xs text-gray-500 capitalize">
                        {request.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      request.status
                    )}`}
                  >
                    {request.status === "in_progress" && "🔄 Em Andamento"}
                    {request.status === "completed" && "✅ Concluído"}
                    {request.status === "pending" && "⏳ Pendente"}
                    {request.status === "failed" && "❌ Falhou"}
                    {request.status === "approved" && "✅ Aprovado"}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {request.type === "onboarding" ? "📥 Entrada" : "📤 Saída"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coluna 2 - Status dos Sistemas */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Status dos Sistemas
          </h3>

          <div className="space-y-4">
            {systemsStatus.slice(0, 6).map((system) => (
              <div
                key={system.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      system.isActive ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium text-gray-900">{system.name}</p>
                    <p className="text-xs text-gray-500">{system.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {system.successRate?.toFixed(1)}%
                  </p>
                  {system.automationEnabled && (
                    <span className="text-xs text-raiô-600">🤖 Auto</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-4 py-2 text-sm text-raiô-600 hover:bg-raiô-50 rounded-lg transition-colors"
            aria-label="Ver todos os sistemas disponíveis"
          >
            Ver Todos os Sistemas
          </button>
        </div>
      </div>

      {/* Seção Automações e Notificações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status das Automações */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Automações Ativas
            </h3>
            <span className="text-sm text-green-600 font-medium">
              🟢 {automations.filter((a) => a.isRunning).length} Executando
            </span>
          </div>

          <div className="space-y-4">
            {automations.map((automation) => (
              <div key={automation.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">
                    {automation.name}
                  </h4>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      automation.isRunning
                        ? "bg-green-500 animate-pulse"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Taxa: {automation.successRate}%</span>
                  <span>Execuções: {automation.totalExecutions}</span>
                </div>
                <div className="mt-2 bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-green-500 h-2 rounded-full transition-all duration-500 ${
                      automation.successRate > 95
                        ? "w-full"
                        : automation.successRate > 90
                        ? "w-11/12"
                        : automation.successRate > 80
                        ? "w-4/5"
                        : automation.successRate > 70
                        ? "w-3/4"
                        : "w-1/2"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notificações Importantes */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              Alertas Importantes
            </h3>
            <span className="text-sm text-red-600 font-medium">
              {notifications.length} não lidas
            </span>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-3">
                  <span className="text-lg">
                    {notification.type === "error" && "🚨"}
                    {notification.type === "warning" && "⚠️"}
                    {notification.type === "success" && "✅"}
                    {notification.type === "info" && "ℹ️"}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {notification.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </div>
                  {notification.actionRequired && (
                    <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                      Ação Necessária
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="w-full mt-4 py-2 text-sm text-raiô-600 hover:bg-raiô-50 rounded-lg transition-colors"
            aria-label="Ver todas as notificações"
          >
            Ver Todas as Notificações
          </button>
        </div>
      </div>

      {/* Gráfico de Performance (placeholder) */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Performance dos Últimos 30 Dias
          </h3>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 text-sm bg-raiô-100 text-raiô-700 rounded-lg"
              aria-label="Ver performance dos últimos 7 dias"
            >
              7 dias
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Ver performance dos últimos 30 dias"
            >
              30 dias
            </button>
            <button
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
              aria-label="Ver performance dos últimos 90 dias"
            >
              90 dias
            </button>
          </div>
        </div>

        {/* Gráfico Simulado */}
        <div className="h-64 bg-gradient-to-t from-raiô-50 to-transparent rounded-lg flex items-end justify-center">
          <div className="text-center text-gray-500">
            <span className="text-4xl">📈</span>
            <p className="mt-2">Gráfico de Performance</p>
            <p className="text-sm">
              Integração com biblioteca de gráficos em desenvolvimento
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
