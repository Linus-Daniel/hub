export interface User {
  id: string;
  email: string;
  name: string;
  role?: "student" | "alumni" | "recruiter";
  createdAt: Date;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: "student" | "alumni" | "recruiter";
  acceptTerms: boolean;
}

export interface ResetPasswordCredentials {
  email: string;
}
