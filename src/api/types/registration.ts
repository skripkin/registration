import type { Role } from './auth';

export enum RegistrationStep {
  Phone = 'PHONE',
  VerifyPhone = 'VERIFY_PHONE',
  Role = 'ROLE',
  Profile = 'PROFILE',
}

export interface RegistrationData {
  phone?: string;
  isPhoneVerified: boolean;

  role?: Role;

  firstName?: string;
  lastName?: string;
  patronymic?: string;
  email?: string;
  password?: string;
  iin?: string;
}
