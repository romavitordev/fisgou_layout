"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { currentUser } from "@/data/mock";
import type { User } from "@fisgou/shared";

/**
 * Camada de autenticação.
 *
 * FASE 1 (mock): a sessão vive no localStorage e qualquer login/cadastro
 * "loga" como o usuário atual do mock. A API pública (useAuth) é estável
 * de propósito — na FASE 2 troca-se só o corpo de login/signup/logout por
 * chamadas aos Route Handlers, sem mexer nos componentes.
 */

const STORAGE_KEY = "fisgou_session";

interface AuthContextValue {
  user: User | null;
  /** true enquanto lemos a sessão persistida (evita flicker do guard). */
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  signup: (nome: string, email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Lê a sessão persistida no primeiro paint do cliente.
  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        setUser(currentUser);
      }
    } catch {
      // localStorage indisponível (SSR/privado) — segue deslogado.
    }
    setLoading(false);
  }, []);

  const persist = (u: User | null) => {
    try {
      if (u) localStorage.setItem(STORAGE_KEY, u.handle);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  // FASE 2: trocar por POST /api/auth/login.
  const login = async (_email: string, _senha: string) => {
    setUser(currentUser);
    persist(currentUser);
  };

  // FASE 2: trocar por POST /api/auth/signup.
  const signup = async (_nome: string, _email: string, _senha: string) => {
    setUser(currentUser);
    persist(currentUser);
  };

  const logout = () => {
    setUser(null);
    persist(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth precisa estar dentro de <AuthProvider>");
  return ctx;
}
