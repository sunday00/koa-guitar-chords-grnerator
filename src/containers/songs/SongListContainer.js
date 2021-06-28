import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listSongs } from "../../modules/songs";

const SongContainer = ({ match }) => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) {
      dispatch(listSongs(match.params.provider));
    }
  }, [dispatch, match, auth]);

  return (
    <>
      <ul>
        {songs &&
          songs.map((s) => (
            <li key={s.id}>
              <a href={`/song/read/${s.providerId}/${s.id}`}>{s.title}</a>
            </li>
          ))}
      </ul>
    </>
  );
};

export default SongContainer;
