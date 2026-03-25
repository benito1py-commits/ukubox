"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { User } from "./types";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  supabaseUser: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  // Fetch user profile from our users table
  async function fetchUserProfile(authUser: SupabaseUser) {
    const { data } = await supabase
      .from("users")
      .select(
        `
        *,
        offices(name),
        us_addresses(*)
      `
      )
      .eq("id", authUser.id)
      .single();

    if (data) {
      const profile: User = {
        id: data.id,
        codigo: data.casillero_code,
        nombre: data.full_name,
        telefono: data.phone || "",
        email: authUser.email || "",
        oficina: data.offices?.name || "",
        direccion: data.local_address || "",
        direccionUS: data.us_addresses
          ? {
              nombre: data.us_addresses.name,
              address1: data.us_addresses.address1,
              address2: data.us_addresses.address2 || "",
              city: data.us_addresses.city,
              state: data.us_addresses.state,
              zipcode: data.us_addresses.zipcode,
              telefono: data.us_addresses.phone || "",
            }
          : null,
      };
      setUser(profile);
    }
  }

  useEffect(() => {
    // Check initial session
    supabase.auth.getUser().then(({ data: { user: authUser } }) => {
      if (authUser) {
        setSupabaseUser(authUser);
        fetchUserProfile(authUser);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const authUser = session?.user ?? null;
      setSupabaseUser(authUser);
      if (authUser) {
        fetchUserProfile(authUser);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return false;
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        supabaseUser,
        isAuthenticated: !!supabaseUser,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
