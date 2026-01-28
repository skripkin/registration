import { http, HttpResponse } from 'msw';
import type {
  AuthResponse,
  LoginRequest,
  User,
  VerifyPhoneRequest,
  VerifyPhoneResponse,
} from '../api/types/auth';
import type { RegistrationData } from '../api/types/registration';

let user: User | null = null;

const VALID_SMS_CODE = '123456';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const handlers = [
  http.post('*/auth/register', async ({ request }) => {
    await delay(2000);

    const body = (await request.json()) as RegistrationData;

    if (!body.email || !body.firstName || !body.lastName || !body.password) {
      return new HttpResponse(
        JSON.stringify({ message: 'Обязательные поля не заполнены' }),
        { status: 400 },
      );
    }

    user = {
      id: crypto.randomUUID(),
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      patronymic: body.patronymic ?? '',
      role: body.role ?? 'CUSTOMER',
      phone: body.phone ?? '',
      iin: body.iin ?? '',
    };

    const response: AuthResponse = {
      user,
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
    };

    return HttpResponse.json(response, { status: 201 });
  }),

  http.post('*/auth/login', async ({ request }) => {
    await delay(1000);
    const { email, password } = (await request.json()) as LoginRequest;

    if (user && email === user.email && password === 'password') {
      const response: AuthResponse = {
        user,
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
      };
      return HttpResponse.json(response, { status: 200 });
    }

    return new HttpResponse(
      JSON.stringify({ message: 'Неверный email или пароль' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } },
    );
  }),

  http.get('*/users/profile-info', () => {
    return HttpResponse.json(user, { status: 200 });
  }),

  http.patch('*/users', async ({ request }) => {
    await delay(2000);
    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new HttpResponse(null, { status: 401 });
    }

    const body = (await request.json()) as User;

    user = {
      ...user,
      ...body,
    };

    return HttpResponse.json(user, { status: 200 });
  }),

  http.post('*/auth/phone/verify', async ({ request }) => {
    await delay(2000);
    const body = (await request.json()) as VerifyPhoneRequest;
    if (body.code === VALID_SMS_CODE && body.phone) {
      return HttpResponse.json({ success: true } as VerifyPhoneResponse, {
        status: 200,
      });
    } else {
      return HttpResponse.json({ success: false } as VerifyPhoneResponse, {
        status: 200,
      });
    }
  }),
];
