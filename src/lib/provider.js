import client from "./client";

export const getProviders = () => {
  return client.get("/api/provider/list");
};

export const postProvider = (params) => {
  return client.post(`/api/provider/create`, {
    provider: params.provider,
  });
};
