import { hashPassword, verifyPassword } from "../helpers/passwordHelpers";
import type {
  LoginPayload,
  RegisteredUser,
  RegisterPayload,
  SessionUser,
} from "../types/auth";
import { BaseService } from "./baseService";
import {
  clearSession,
  createUser,
  findUserByEmail,
  isValidEmail,
  saveSession,
} from "./userStorage";

class AuthService extends BaseService {
  async register(payload: RegisterPayload): Promise<SessionUser> {
    const firstName = payload.firstName.trim();
    const lastName = payload.lastName.trim();
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!firstName || !lastName) {
      throw new Error("Enter your first and last name");
    }

    if (!isValidEmail(email)) {
      throw new Error("Enter a valid email");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters");
    }

    if (findUserByEmail(email)) {
      throw new Error("An account with this email already exists");
    }

    const passwordHash = await hashPassword(password);
    const user: RegisteredUser = {
      id: crypto.randomUUID(),
      email,
      firstName,
      lastName,
      passwordHash,
      createdAt: new Date().toISOString(),
    };

    createUser(user);

    const session: SessionUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    saveSession(session);
    return session;
  }

  async login(payload: LoginPayload): Promise<SessionUser> {
    const email = payload.email.trim().toLowerCase();
    const password = payload.password;

    if (!isValidEmail(email)) {
      throw new Error("Enter a valid email");
    }

    if (!password) {
      throw new Error("Enter your password");
    }

    const record = findUserByEmail(email);
    if (!record) {
      throw new Error("Invalid email or password");
    }

    const valid = await verifyPassword(password, record.passwordHash);
    if (!valid) {
      throw new Error("Invalid email or password");
    }

    const session: SessionUser = {
      id: record.id,
      email: record.email,
      firstName: record.firstName,
      lastName: record.lastName,
    };

    saveSession(session);
    return session;
  }

  logout(): void {
    clearSession();
  }
}

export const authService = new AuthService();
