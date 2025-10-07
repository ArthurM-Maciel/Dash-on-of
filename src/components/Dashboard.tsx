import { FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  mockDashboardStats,
  mockAccessRequests,
  mockNotifications,
} from "../data/mockData";
import {
  Users,
  UserPlus,
  UserMinus,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  FileText,
} from "lucide-react";

const Dashboard: FC = () => {
  const { user } = useAuth();
  const stats = mockDashboardStats;
  const recentRequests = mockAccessRequests.slice(0, 5);
  const notifications = mockNotifications.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning-600 bg-warning-100";
      case "approved":
        return "text-success-600 bg-success-100";
      case "rejected":
        return "text-danger-600 bg-danger-100";
      case "in_progress":
        return "text-primary-600 bg-primary-100";
      case "completed":
        return "text-success-600 bg-success-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente";
      case "approved":
        return "Aprovado";
      case "rejected":
        return "Rejeitado";
      case "in_progress":
        return "Em Andamento";
      case "completed":
        return "Concluído";
      default:
        return status;
    }
  };

  const getTypeText = (type: string) => {
    return type === "onboarding" ? "Onboarding" : "Offboarding";
  };

  const getTypeIcon = (type: string) => {
    return type === "onboarding" ? UserPlus : UserMinus;
  };

  return (
    <div className="space-y-6">
      {/* Welcome message */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Bem-vindo, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Aqui está um resumo das atividades de on/off boarding
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <FileText className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total de Solicitações
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-warning-100 rounded-lg">
              <Clock className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pendentes</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pendingRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-success-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Concluídas</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.completedRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Taxa de Conclusão
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(
                  (stats.completedRequests / stats.totalRequests) * 100
                )}
                %
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent requests */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Solicitações Recentes
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {recentRequests.map((request) => {
              const TypeIcon = getTypeIcon(request.type);
              return (
                <div key={request.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <TypeIcon className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {request.employeeName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {request.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {getStatusText(request.status)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                    <span>{getTypeText(request.type)}</span>
                    <span>
                      {new Date(request.requestedAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Notificações</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map((notification) => (
              <div key={notification.id} className="p-6">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-2 rounded-lg ${
                      notification.type === "success"
                        ? "bg-success-100"
                        : notification.type === "warning"
                        ? "bg-warning-100"
                        : notification.type === "error"
                        ? "bg-danger-100"
                        : "bg-primary-100"
                    }`}
                  >
                    <AlertCircle
                      className={`h-4 w-4 ${
                        notification.type === "success"
                          ? "text-success-600"
                          : notification.type === "warning"
                          ? "text-warning-600"
                          : notification.type === "error"
                          ? "text-danger-600"
                          : "text-primary-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.createdAt).toLocaleDateString(
                        "pt-BR"
                      )}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <div className="h-2 w-2 bg-primary-600 rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Ações Rápidas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn btn-primary p-4 text-left">
            <UserPlus className="h-5 w-5 mb-2" />
            <div>
              <p className="font-medium">Nova Solicitação</p>
              <p className="text-sm opacity-90">Criar solicitação de acesso</p>
            </div>
          </button>

          <button className="btn btn-secondary p-4 text-left">
            <Users className="h-5 w-5 mb-2" />
            <div>
              <p className="font-medium">Gerenciar Acessos</p>
              <p className="text-sm opacity-90">
                Visualizar e aprovar solicitações
              </p>
            </div>
          </button>

          <button className="btn btn-secondary p-4 text-left">
            <FileText className="h-5 w-5 mb-2" />
            <div>
              <p className="font-medium">Relatórios</p>
              <p className="text-sm opacity-90">
                Gerar relatórios de atividades
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
