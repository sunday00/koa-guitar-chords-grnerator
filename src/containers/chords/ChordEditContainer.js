import React from "react";
import * as api from "../../lib/chord";

import ChordForm from "../../components/chords/ChordForm";

const ChordEditContainer = ({ match }) => {
  const handleSubmit = (e, chord, err, setErr) => {
    e.preventDefault();

    if (!chord.strings.filter((s) => s !== false).length) {
      setErr({
        ...err,
        msg: "At least one Open stroke needed",
      });
    }

    setErr({
      ...err,
      msg: "wait...",
    });

    api
      .patchChord({
        provider: match.params.provider,
        chord: chord,
      })
      .then((res) => {
        if (res.data.result === "success") {
          window.location.href = `/chord/read/${match.params.provider}/${res.data.id}`;
        } else if (res.data.result === "error") {
          setErr({
            ...err,
            msg: res.data.message,
          });
        }
      });
  };

  return <ChordForm match={match} handleSubmit={handleSubmit} />;
};

export default ChordEditContainer;
