import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listChord } from "../../modules/chords";
import ChordRead from "../../components/chords/ChordsRead";

import Riff from "../../components/song/Riff";
import { postRiff as api } from "../../lib/riff";

const RiffCreateContainer = ({ match }) => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.chords);

  useEffect(() => {
    dispatch(listChord(match));
  }, [dispatch, match]);

  const [riff, setRiff] = useState({
    tabs: [
      {
        chordName: "a",
        beat: 8,
        subtitle: "",
        options: {
          parmMutes: [],
          rest: [],
          upPicking: [1],
          turn: ">",
          vibe: [],
        },
      },
      {
        chordName: "em",
        beat: 4,
        subtitle: "",
        options: {
          parmMutes: [],
          rest: [],
          upPicking: [],
          turn: "",
          vibe: [],
        },
      },
      {
        chordName: "d",
        beat: 8,
        subtitle: "",
        options: {
          parmMutes: [6, 7],
          rest: [],
          upPicking: [],
          turn: "both",
          vibe: [3],
        },
      },
      {
        chordName: "c",
        beat: 8,
        subtitle: "",
        options: {
          parmMutes: [],
          rest: [5, 6],
          upPicking: [],
          turn: "<",
          vibe: [],
        },
      },
    ],
    riffOption: {
      text: "1~2line X 2 ? then go to 3",
    },
    memo: "",
  });

  const [err, setErr] = useState({
    msg: "",
  });

  const getChord = (name) => {
    return chords.find((c) => c.name === name);
  };

  const handleChangeTab = (e, tab, field) => {
    const newTabs = Array.from(riff.tabs).map((t, i) => {
      if (i === tab) {
        return {
          ...t,
          [field]: e.target.value,
        };
      }
      return t;
    });
    setRiff({
      ...riff,
      tabs: newTabs,
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
      {riff.tabs.map((t, i) => {
        return (
          <figure key={i}>
            <ChordRead chord={getChord(t.chordName)} />
            <Riff riff={t} />
          </figure>
        );
      })}

      <p className="riff-option-text">{riff.riffOption.text}</p>

      <input type="submit" className="submit" value="submit" />

      <p className={`err ${err.msg && "active"}`} onClick={handleErr}>
        {err.msg}
      </p>
    </form>
  );
};

export default RiffCreateContainer;
