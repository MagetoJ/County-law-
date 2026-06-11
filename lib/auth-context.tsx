'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, LoginRequest, AuthResponse } from './types';
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, API_ENDPOINTS } from './constants';
import { apiClient } from './api-client';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const savedUser = localStorage.getItem(AUTH_USER_KEY);
        const token = localStorage.getItem(AUTH_TOKEN_KEY);

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('[v0] Auth initialization error:', error);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Mock authentication - validate demo credentials
      const mockUsers = {
        'commander@police.ke': { id: '1', email: 'commander@police.ke', role: 'commander', name: 'Commander User' },
        'officer@police.ke': { id: '2', email: 'officer@police.ke', role: 'officer', name: 'Officer User' },
        'governor@police.ke': { id: '3', email: 'governor@police.ke', role: 'governor', name: 'Governor User' },
      };

      const mockUser = mockUsers[email as keyof typeof mockUsers];
      if (!mockUser || password !== 'password') {
        throw new Error('Invalid email or password');
      }

      const token = 'mock-jwt-token-' + Date.now();
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(mockUser));
      setUser(mockUser as User);
    } catch (error) {
      console.error('[v0] Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    // Mock logout - just clear localStorage
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    // Mock refresh - just read from localStorage
    const savedUser = localStorage.getItem(AUTH_USER_KEY);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      logout();
    }
  }, [logout]);

  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!user) return false;
    const roles = Array.isArray(role) ? role : [role];
    return roles.includes(user.role);
  }, [user]);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    refreshUser,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
