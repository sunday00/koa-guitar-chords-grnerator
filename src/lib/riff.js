import client from "./client";

export const getRiff = (param) => {
  return client.get(`/api/riff/read/${param}`);
};

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

export const patchRiff = (params) => {
  return client.patch(`/api/riff/update`, {
    provider: params.provider,
    song: params.song,
    riff: params.riff,
  });
};
