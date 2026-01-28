import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { RegistrationStep, type RegistrationData } from '../types/registration';
import type { Role } from '../types/auth';

interface RegistrationState {
  step: RegistrationStep;
  data: RegistrationData;
}

const loadFromSession = (): RegistrationState => {
  try {
    const storedStep = sessionStorage.getItem('registrationStep');
    const storedData = sessionStorage.getItem('registrationData');

    return {
      step: storedStep
        ? (storedStep as RegistrationStep)
        : RegistrationStep.Phone,
      data: storedData
        ? (JSON.parse(storedData) as RegistrationData)
        : {
            phone: '',
            isPhoneVerified: false,
            role: undefined,
            firstName: '',
            lastName: '',
            patronymic: '',
            email: '',
            password: '',
            iin: '',
          },
    };
  } catch (e) {
    console.warn('Ошибка при загрузке данных регистрации из sessionStorage', e);
    return {
      step: RegistrationStep.Phone,
      data: {
        phone: '',
        isPhoneVerified: false,
        role: undefined,
        firstName: '',
        lastName: '',
        patronymic: '',
        email: '',
        password: '',
        iin: '',
      },
    };
  }
};

const initialState: RegistrationState = loadFromSession();

export const storageSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<RegistrationStep>) {
      state.step = action.payload;
      sessionStorage.setItem('registrationStep', state.step);
    },

    nextStep(state) {
      switch (state.step) {
        case RegistrationStep.Phone:
          state.step = RegistrationStep.VerifyPhone;
          break;
        case RegistrationStep.VerifyPhone:
          state.step = RegistrationStep.Role;
          break;
        case RegistrationStep.Role:
          state.step = RegistrationStep.Profile;
          break;
        default:
          break;
      }
      sessionStorage.setItem('registrationStep', state.step);
    },

    prevStep(state) {
      switch (state.step) {
        case RegistrationStep.Profile:
          state.step = RegistrationStep.Role;
          break;
        case RegistrationStep.Role:
          state.step = RegistrationStep.VerifyPhone;
          break;
        case RegistrationStep.VerifyPhone:
          state.step = RegistrationStep.Phone;
          break;
        default:
          break;
      }
      sessionStorage.setItem('registrationStep', state.step);
    },

    resetRegistration() {
      sessionStorage.removeItem('registrationData');
      sessionStorage.removeItem('registrationStep');
      return {
        step: RegistrationStep.Phone,
        data: {
          phone: '',
          isPhoneVerified: false,
          role: undefined,
          firstName: '',
          lastName: '',
          patronymic: '',
          email: '',
          password: '',
          iin: '',
        },
      };
    },

    setPhone(state, action: PayloadAction<string>) {
      state.data.phone = action.payload;
      sessionStorage.setItem('registrationData', JSON.stringify(state.data));
    },

    verifyPhone(state, action: PayloadAction<boolean>) {
      state.data.isPhoneVerified = action.payload;
      sessionStorage.setItem('registrationData', JSON.stringify(state.data));
    },

    setRole(state, action: PayloadAction<Role>) {
      state.data.role = action.payload;
      sessionStorage.setItem('registrationData', JSON.stringify(state.data));
    },

    updateProfile(state, action: PayloadAction<Partial<RegistrationData>>) {
      state.data = { ...state.data, ...action.payload };
      sessionStorage.setItem('registrationData', JSON.stringify(state.data));
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  resetRegistration,
  setPhone,
  verifyPhone,
  setRole,
  updateProfile,
} = storageSlice.actions;

export const storageReducer = storageSlice.reducer;
