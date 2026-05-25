import { api } from "../lib/axios";
import type {
  CreateUserPayload,
  UpdateUserPayload,
  User,
} from "../types/user.types";

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get("/users");

  return response.data;
};

export const createUser = async (payload: CreateUserPayload): Promise<User> => {
  const response = await api.post("/users", payload);

  return response.data;
};

export const updateUser = async ({
  id,
  ...payload
}: UpdateUserPayload): Promise<User> => {
  const response = await api.patch(`/users/${id}`, payload);

  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/users/${id}`);
};
