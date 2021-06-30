import React from "react";

import { postRiff as api } from "../../lib/riff";
import RiffForm from "../../components/song/RiffForm";

const RiffCreateContainer = ({ match }) => {
  const handleSubmit = (e, riff, err, setErr) => {
    e.preventDefault();

    setErr({
      ...err,
      msg: "wait...",
    });

    api({
      provider: match.params.provider,
      song: match.params.song,
      riff,
    }).then((res) => {
      if (res.data.result === "success") {
        window.location.href = `/song/read/${match.params.provider}/${res.data.songId}`;
      } else if (res.data.result === "error") {
        setErr({
          ...err,
          msg: res.data.message,
        });
      }
    });
  };

  return <RiffForm match={match} handleSubmit={handleSubmit} />;
};

export default RiffCreateContainer;
