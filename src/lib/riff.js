import client from "./client";

export const getRiffs = () => {
  return client.get("/api/riff/list");
};

export const postRiff = (params) => {
  return client.post(`/api/riff/create`, {
    provider: params.provider,
    song: params.song,
    riff: params.riff,
  });
};
