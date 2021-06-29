import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listChord } from "../../modules/chords";

import ChordRead from "../../components/chords/ChordsRead";
import Riff from "../../components/song/Riff";

import { readSong } from "../../modules/songs";

const SongReadContainer = ({ match }) => {
  const dispatch = useDispatch();
  const song = useSelector((state) => state.songs);
  const chords = useSelector((state) => state.chords);

  useEffect(() => {
    dispatch(listChord(match));
    dispatch(readSong(match.params));
  }, [dispatch, match]);

  const getChord = (name) => {
    return chords.find((c) => c.name === name);
  };

  return (
    <>
      <h1>{song.title}</h1>

      <ul className="song-read">
        {song.Riffs &&
          song.Riffs.map((r, i) => {
            return (
              //CONF: 코드 표현이나 좀 더 풍부한 운지법 표현 하고 싶을때
              // 버전 올리고 새로운 chord CRUD, riff CRUD 필요할지도...
              r.version === "1.0" && (
                <li key={i}>
                  {[...Array(4).keys()].map((y) => {
                    const data = JSON.parse(r[`tab${y + 1}`]);
                    const chord = getChord(data.chordName);

                    return (
                      <figure key={y}>
                        <ChordRead chord={chord} />
                        <Riff riff={data} />
                      </figure>
                    );
                  })}
                  <p className="riff-option-text">
                    {JSON.parse(r.riffOption).text}
                  </p>
                  <p className="riff-option-memo">{r.memo}</p>
                </li>
              )
            );
          })}
      </ul>
    </>
  );
};

export default SongReadContainer;
