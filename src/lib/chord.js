import client from "./client";

// export const getInitialTags = (params) => {
//   return client.get("/api/search/initialTags");
// };

export const getChord = (params) => {
  if (params) {
    return client.get("/api/chord/read", {
      params: {
        params: params,
      },
    });
  }
  return client.get("/api/chord/read");
};
