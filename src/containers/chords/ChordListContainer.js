import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listChord } from "../../modules/chords";
import ChordRead from "../../components/chords/ChordsRead";

const ChordListContainer = ({ match }) => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.chords);
  useEffect(() => {
    dispatch(listChord(match));
  }, [dispatch, match]);

  return chords.length >= 1 ? (
    <>
      {chords.map((c, i) => (
        <a href={`/chord/read/${match.params.provider}/${c.id}`} key={i}>
          <ChordRead chord={c} />
        </a>
      ))}
    </>
  ) : (
    <></>
  );
};

export default ChordListContainer;
