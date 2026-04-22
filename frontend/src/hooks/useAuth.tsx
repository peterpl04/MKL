import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import type { User } from "../types";
import { getCurrentUser, loginUser, registerUser } from "../services/auth.service";
import { clearToken, getToken, saveToken } from "../utils/storage";

type Credentials = {
  email: string;
  password: string;
};

type RegisterData = Credentials & {
  name: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: Credentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      const token = getToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (_error) {
        clearToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    void bootstrap();
  }, []);

  const login = async (data: Credentials) => {
    const response = await loginUser(data);
    saveToken(response.token);
    setUser(response.user);
    toast.success("Login realizado com sucesso");
  };

  const register = async (data: RegisterData) => {
    const response = await registerUser(data);
    saveToken(response.token);
    setUser(response.user);
    toast.success("Conta criada com sucesso");
  };

  const logout = () => {
    clearToken();
    setUser(null);
    toast.success("Sessão encerrada");
  };

  const refreshUser = async () => {
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
