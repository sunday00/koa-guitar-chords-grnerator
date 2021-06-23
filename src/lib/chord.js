import client from "./client";

// export const getInitialTags = (params) => {
//   return client.get("/api/search/initialTags");
// };

export const getChord = ({params}) => {
  if (params) {
    return client.get(`/api/chord/read?provider=${params.provider}&id=${params.id}`);
  }
  return client.get("/api/chord/read");
};

export const getChords = ({params}) => {
  if (params) {
    return client.get(`/api/chord/list?provider=${params.provider}`);
  }
  return client.get("/api/chord/list");
};
