import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { mockAccessRequests, mockNotifications } from "../data/mockData";

interface NewEmployeeForm {
  name: string;
  email: string;
  department: string;
  position: string;
  startDate: string;
  manager: string;
  systems: string[];
}

interface OffboardingForm {
  employeeId: string;
  name: string;
  department: string;
  endDate: string;
  reason: string;
  manager: string;
}

const HRDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboardingForm, setShowOnboardingForm] = useState(false);
  const [showOffboardingForm, setShowOffboardingForm] = useState(false);

  const [onboardingForm, setOnboardingForm] = useState<NewEmployeeForm>({
    name: "",
    email: "",
    department: "",
    position: "",
    startDate: "",
    manager: "",
    systems: [],
  });

  const [offboardingForm, setOffboardingForm] = useState<OffboardingForm>({
    employeeId: "",
    name: "",
    department: "",
    endDate: "",
    reason: "",
    manager: "",
  });

  // Filtrar dados para RH
  const hrStats = {
    pendingOnboarding: mockAccessRequests.filter(
      (r) => r.type === "onboarding" && r.status === "pending"
    ).length,
    pendingOffboarding: mockAccessRequests.filter(
      (r) => r.type === "offboarding" && r.status === "pending"
    ).length,
    completedThisMonth: mockAccessRequests.filter(
      (r) => r.status === "completed"
    ).length,
    needsAttention: mockAccessRequests.filter((r) => r.status === "failed")
      .length,
  };

  const recentRequests = mockAccessRequests.slice(0, 5);
  const urgentNotifications = mockNotifications.filter(
    (n) => !n.isRead && (n.priority === "high" || n.actionRequired)
  );

  const availableSystems = [
    "Active Directory",
    "Office 365",
    "Slack",
    "GitHub",
    "Jira",
    "Confluence",
    "Figma",
    "AWS Console",
  ];

  const handleOnboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria enviado para a API
    console.log("Novo funcionário:", onboardingForm);
    alert(
      `Solicitação de onboarding criada para ${onboardingForm.name}! A automação será iniciada em breve.`
    );
    setShowOnboardingForm(false);
    setOnboardingForm({
      name: "",
      email: "",
      department: "",
      position: "",
      startDate: "",
      manager: "",
      systems: [],
    });
  };

  const handleOffboardingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Desligamento:", offboardingForm);
    alert(
      `Solicitação de offboarding criada para ${offboardingForm.name}! A revogação de acessos será processada.`
    );
    setShowOffboardingForm(false);
    setOffboardingForm({
      employeeId: "",
      name: "",
      department: "",
      endDate: "",
      reason: "",
      manager: "",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "in_progress":
        return "🔄";
      case "pending":
        return "⏳";
      case "failed":
        return "❌";
      case "approved":
        return "✅";
      default:
        return "❓";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header RH */}
      <div className="bg-gradient-to-r from-green-500 to-raiô-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Olá, {user?.name}! 👨‍💼</h1>
            <p className="text-green-100 mt-2">
              Painel de Recursos Humanos - Gerencie onboarding e offboarding
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-sm font-medium">
                    Nível {user?.level || 1}
                  </p>
                  <p className="text-xs text-green-200">
                    {user?.points || 0} XP
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <p className="text-sm font-medium">
                    {user?.badges?.length || 0} Badges
                  </p>
                  <p className="text-xs text-green-200">Conquistadas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <button
              onClick={() => setShowOnboardingForm(true)}
              className="w-full px-4 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              ➕ Novo Funcionário
            </button>
            <button
              onClick={() => setShowOffboardingForm(true)}
              className="w-full px-4 py-2 bg-green-400 text-white rounded-lg font-medium hover:bg-green-500 transition-colors"
            >
              ➖ Desligamento
            </button>
          </div>
        </div>
      </div>

      {/* Métricas RH */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Onboarding Pendente
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {hrStats.pendingOnboarding}
              </p>
              <p className="text-xs text-green-600 mt-1">Aguardando ação</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">📥</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Offboarding Pendente
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {hrStats.pendingOffboarding}
              </p>
              <p className="text-xs text-orange-600 mt-1">Para processar</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <span className="text-2xl">📤</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-raiô-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Concluídos</p>
              <p className="text-3xl font-bold text-gray-900">
                {hrStats.completedThisMonth}
              </p>
              <p className="text-xs text-raiô-600 mt-1">Este mês</p>
            </div>
            <div className="p-3 bg-raiô-100 rounded-full">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Problemas</p>
              <p className="text-3xl font-bold text-gray-900">
                {hrStats.needsAttention}
              </p>
              <p className="text-xs text-red-600 mt-1">Requer atenção</p>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <span className="text-2xl">🚨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "overview"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              📋 Visão Geral
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === "notifications"
                  ? "border-green-500 text-green-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              🔔 Alertas ({urgentNotifications.length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Solicitações Recentes
              </h3>

              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-raiô-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {request.employeeName.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {request.employeeName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {request.position} • {request.department}
                        </p>
                        <p className="text-xs text-gray-500">
                          Solicitado por: {request.requestedBy}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-lg">
                          {getStatusIcon(request.status)}
                        </span>
                        <span className="text-sm font-medium capitalize">
                          {request.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {request.type === "onboarding"
                          ? "📥 Entrada"
                          : "📤 Saída"}
                      </div>
                      {request.status === "failed" && (
                        <button className="mt-2 px-3 py-1 text-xs bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors">
                          Ver Problema
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Alertas que Requerem Atenção
              </h3>

              {urgentNotifications.length === 0 ? (
                <div className="text-center py-12">
                  <span className="text-6xl">🎉</span>
                  <h3 className="text-lg font-medium text-gray-900 mt-4">
                    Tudo em ordem!
                  </h3>
                  <p className="text-gray-600">
                    Não há alertas urgentes no momento.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {urgentNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="border border-red-200 rounded-lg p-4 bg-red-50"
                    >
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">🚨</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-gray-700 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(notification.createdAt).toLocaleString(
                              "pt-BR"
                            )}
                          </p>
                        </div>
                        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                          Resolver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal Onboarding */}
      {showOnboardingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ➕ Novo Funcionário
              </h2>
              <button
                onClick={() => setShowOnboardingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOnboardingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={onboardingForm.name}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Corporativo
                  </label>
                  <input
                    type="email"
                    required
                    value={onboardingForm.email}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="joao.silva@empresa.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <select
                    required
                    value={onboardingForm.department}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    title="Selecionar departamento do funcionário"
                    aria-label="Departamento do funcionário"
                  >
                    <option value="">Selecione...</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Design">Design</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cargo
                  </label>
                  <input
                    type="text"
                    required
                    value={onboardingForm.position}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        position: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Ex: Desenvolvedor Frontend"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Início
                  </label>
                  <input
                    type="date"
                    required
                    value={onboardingForm.startDate}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        startDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    title="Selecionar data de início do funcionário"
                    aria-label="Data de início do funcionário"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gestor Direto
                  </label>
                  <input
                    type="text"
                    required
                    value={onboardingForm.manager}
                    onChange={(e) =>
                      setOnboardingForm({
                        ...onboardingForm,
                        manager: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                    placeholder="Nome do gestor"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sistemas Necessários
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableSystems.map((system) => (
                    <label key={system} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={onboardingForm.systems.includes(system)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setOnboardingForm({
                              ...onboardingForm,
                              systems: [...onboardingForm.systems, system],
                            });
                          } else {
                            setOnboardingForm({
                              ...onboardingForm,
                              systems: onboardingForm.systems.filter(
                                (s) => s !== system
                              ),
                            });
                          }
                        }}
                        className="rounded text-green-600"
                      />
                      <span className="text-sm">{system}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowOnboardingForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Iniciar Onboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Offboarding */}
      {showOffboardingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                ➖ Desligamento de Funcionário
              </h2>
              <button
                onClick={() => setShowOffboardingForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOffboardingSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ID do Funcionário
                  </label>
                  <input
                    type="text"
                    required
                    value={offboardingForm.employeeId}
                    onChange={(e) =>
                      setOffboardingForm({
                        ...offboardingForm,
                        employeeId: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Ex: EMP001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={offboardingForm.name}
                    onChange={(e) =>
                      setOffboardingForm({
                        ...offboardingForm,
                        name: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Nome do funcionário"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    required
                    value={offboardingForm.department}
                    onChange={(e) =>
                      setOffboardingForm({
                        ...offboardingForm,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Nome do departamento"
                    title="Departamento do funcionário"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de Desligamento
                  </label>
                  <input
                    type="date"
                    required
                    value={offboardingForm.endDate}
                    onChange={(e) =>
                      setOffboardingForm({
                        ...offboardingForm,
                        endDate: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    title="Selecionar data de desligamento do funcionário"
                    aria-label="Data de desligamento do funcionário"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Motivo do Desligamento
                  </label>
                  <select
                    required
                    value={offboardingForm.reason}
                    onChange={(e) =>
                      setOffboardingForm({
                        ...offboardingForm,
                        reason: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    title="Selecionar motivo do desligamento"
                    aria-label="Motivo do desligamento"
                  >
                    <option value="">Selecione...</option>
                    <option value="Pedido de demissão">
                      Pedido de demissão
                    </option>
                    <option value="Demissão sem justa causa">
                      Demissão sem justa causa
                    </option>
                    <option value="Demissão com justa causa">
                      Demissão com justa causa
                    </option>
                    <option value="Fim de contrato">Fim de contrato</option>
                    <option value="Aposentadoria">Aposentadoria</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gestor Responsável
                  </label>
                  <input
                    type="text"
                    required
                    value={offboardingForm.manager}
                    onChange={(e) =>
                      setOffboardingForm({
                        ...offboardingForm,
                        manager: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Nome do gestor que autoriza"
                  />
                </div>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex">
                  <span className="text-orange-600 text-lg mr-3">⚠️</span>
                  <div>
                    <h4 className="font-medium text-orange-800">Atenção</h4>
                    <p className="text-sm text-orange-700 mt-1">
                      Esta ação irá revogar todos os acessos do funcionário nos
                      sistemas da empresa. Certifique-se de que todos os dados
                      importantes foram salvos antes de prosseguir.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowOffboardingForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Iniciar Offboarding
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
