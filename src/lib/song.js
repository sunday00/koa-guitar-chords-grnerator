import client from "./client";

export const getSongs = (params) => {
  return client.get(`/api/song/list/${params}`);
};

export const postSong = (params) => {
  return client.post(`/api/song/create`, {
    providerId: params.provider,
    song: params.song,
  });
};
