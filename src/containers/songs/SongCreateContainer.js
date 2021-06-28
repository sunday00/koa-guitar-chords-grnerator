import React, { useState } from "react";

// import * as util from "../../lib/util";
import { postSong as api } from "../../lib/song";

const SongCreateContainer = ({ match }) => {
  const [song, setSong] = useState({
    title: "song title",
    description: "singer... produced at... easy or...",
  });

  const [err, setErr] = useState({
    msg: "",
  });

  const handleChange = (e, field) => {
    setSong({
      ...song,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!song.name) {
      setErr({
        ...err,
        msg: "name is required",
      });
    }

    setErr({
      ...err,
      msg: "wait...",
    });

    api({
      provider: match.params.provider,
      song,
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

  const handleErr = (e) => {
    err.msg !== "wait..." && setErr({ ...err, msg: "" });
  };

  return (
    <form className="song-input-form" onSubmit={handleSubmit}>
      <input
        name="name"
        value={song.title}
        onChange={(e) => handleChange(e, "title")}
        className="name"
      />
      <textarea
        name="description"
        onChange={(e) => handleChange(e, "description")}
        value={song.description}
        maxLength="450"
        rows="8"
        className="description"
      />

      <input type="submit" className="submit" value="submit" />

      <p className={`err ${err.msg && "active"}`} onClick={handleErr}>
        {err.msg}
      </p>
    </form>
  );
};

export default SongCreateContainer;
