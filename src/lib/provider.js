import client from "./client";

export const getProviders = () => {
  return client.get("/api/provider/list");
};
