import { FC } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotificationProvider } from "./components/NotificationSystem";
import Login from "./components/Login";
import ModernLayout from "./components/ModernLayout";
import AdminDashboard from "./components/AdminDashboard";
import HRDashboard from "./components/HRDashboard";

const AppContent: FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <ModernLayout>
      {user.role === "admin" ? <AdminDashboard /> : <HRDashboard />}
    </ModernLayout>
  );
};

const App: FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
