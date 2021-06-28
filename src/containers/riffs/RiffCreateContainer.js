import React, { useState } from "react";

// import * as util from "../../lib/util";
import { postRiff as api } from "../../lib/riff";

const RiffCreateContainer = ({ match }) => {
  const [riff, setRiff] = useState({
    tab1: {
      chordName: "",
      beat: "1/8",
      repeat: 8,
      subtitle: "",
      options: {
        parmMutes: [],
        upPicking: [],
        turn: [],
      },
    },
    tab2: {
      chordName: "",
      beat: "1/8",
      repeat: 8,
      subtitle: "",
      options: {
        parmMutes: [],
        upPicking: [],
        turn: [],
      },
    },
    tab3: {
      chordName: "",
      beat: "1/8",
      repeat: 8,
      subtitle: "",
      options: {
        parmMutes: [],
        upPicking: [],
        turn: [],
      },
    },
    tab4: {
      chordName: "",
      beat: "1/8",
      repeat: 8,
      subtitle: "",
      options: {
        parmMutes: [],
        upPicking: [],
        turn: [],
      },
    },
    riffOption: {},
    memo: "",
  });

  const [err, setErr] = useState({
    msg: "",
  });

  const handleChangeTab = (e, tab, field) => {
    setRiff({
      ...riff,
      [tab]: {
        ...riff[tab],
        [field]: e.target.value,
      },
    });
  };

  const handleChangeOptions = (e, field) => {
    setRiff({
      ...riff,
      [field]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (!riff.name) {
    //   setErr({
    //     ...err,
    //     msg: "name is required",
    //   });
    // }

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
        window.location.href = `/song/read/${match.params.provider}/${res.data.id}`;
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
    <form className="riff-input-form" onSubmit={handleSubmit}>
      <input type="submit" className="submit" value="submit" />

      <p className={`err ${err.msg && "active"}`} onClick={handleErr}>
        {err.msg}
      </p>
    </form>
  );
};

export default RiffCreateContainer;
