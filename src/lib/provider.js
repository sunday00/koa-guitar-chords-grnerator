import client from "./client";

export const getProviders = ({ params }) => {
  if (params) {
    return client.get(`/api/provider/list`);
  }
  return client.get("/api/provider/list");
};
