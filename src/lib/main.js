import client from "./client";

export const login = (user) => {
  return client.post(`/account/login`, {
    id: user.id,
    pass: user.pass,
  });
};

export const logout = () => {
  return client.get(`/account/logout`);
}