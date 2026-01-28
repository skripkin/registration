export type Role = 'CUSTOMER' | 'CARRIER' | 'ADMIN';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  email: string;
  iin: string;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export type VerifyPhoneRequest = {
  phone: string;
  code: string;
};

export type VerifyPhoneResponse = {
  success: boolean;
};
