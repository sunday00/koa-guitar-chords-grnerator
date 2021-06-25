import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readChord } from "../../modules/chords";
import ChordRead from "../../components/chords/ChordsRead";

const ChordReadContainer = ({ match }) => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.chords);

  useEffect(() => {
    dispatch(readChord(match));
  }, [dispatch, match]);

  return chords[0] && chords[0].strings ? (
    <ChordRead chord={chords[0]} className="read" />
  ) : (
    <></>
  );
};

export default ChordReadContainer;
