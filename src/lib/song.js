import client from "./client";

export const getSongs = () => {
  return client.get("/api/song/list");
};

export const postSong = (params) => {
  return client.post(`/api/song/create`, {
    song: params.song,
  });
};
