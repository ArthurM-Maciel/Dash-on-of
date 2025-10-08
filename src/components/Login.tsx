import { useState, FC } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, Lock, AlertCircle } from "lucide-react";

const Login: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (!success) {
      setError("Email ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center">
            <img src="/raio-logo.svg" alt="Raiô Logo" className="h-16 w-16" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Raiô Dashboard
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Automação de Onboarding e Offboarding
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10"
                  placeholder="seu@email.com"
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10"
                  placeholder="••••••••"
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-danger-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full py-3 text-base"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            Usuários de demonstração:
          </h3>
          <div className="space-y-1 text-xs text-gray-600">
            <div>
              <strong>Admin:</strong> admin@empresa.com / 123456
            </div>
            <div>
              <strong>RH:</strong> rh@empresa.com / 123456
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
