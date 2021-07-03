import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listChord } from "../../modules/chords";
import ChordRead from "../../components/chords/ChordsRead";

import Riff from "../../components/song/Riff";
import * as api from "../../lib/riff";

const RiffForm = ({ match, handleSubmit }) => {
  const dispatch = useDispatch();
  const chords = useSelector((state) => state.chords);

  const [riff, setRiff] = useState({
    id: undefined,
    tabs: [
      {
        chordName: "",
        beat: 8,
        subtitle: "",
        options: {
          parmMutes: [],
          rest: [],
          upPicking: [],
          turn: ">",
          vibe: [],
        },
      },
      {
        chordName: "",
        beat: 8,
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
        chordName: "",
        beat: 8,
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
        chordName: "",
        beat: 8,
        subtitle: "",
        options: {
          parmMutes: [],
          rest: [],
          upPicking: [],
          turn: "<",
          vibe: [],
        },
      },
    ],
    riffOption: {
      text: "",
    },
    memo: "",
  });

  const [err, setErr] = useState({
    msg: "",
  });

  useEffect(() => {
    dispatch(listChord(match));

    match.params.riff &&
      api.getRiff(match.params.riff).then((res) => {
        const tabs = [
          JSON.parse(res.data.tab1),
          JSON.parse(res.data.tab2),
          JSON.parse(res.data.tab3),
          JSON.parse(res.data.tab4),
        ];

        console.log(res.data.memo)

        if (res.status === 200) {
          setRiff((r) => ({ ...r, id: res.data.id, tabs, memo: res.data.memo }));
        }
      });
  }, [match, dispatch]);

  const getChord = (name) => {
    return chords.find((c) => c.name === name);
  };

  const handleChangeTab = (e, tab, field, options = null) => {
    const newTabs = Array.from(riff.tabs).map((t, i) => {
      if (i + 1 === tab) {
        let v;
        switch (field) {
          default:
            v = e.target.value;
            break;
          case "beat":
            v = parseInt(e.target.value);
            break;
          case "options":
            v = options;
            break;
        }

        return {
          ...t,
          [field]: v,
        };
      }
      return t;
    });

    setRiff({
      ...riff,
      tabs: newTabs,
    });
  };

  const handleChangeOptions = (e, field, v) => {
    setRiff({
      ...riff,
      [field]: v,
    });
  };

  const handleErr = (e) => {
    err.msg !== "wait..." && setErr({ ...err, msg: "" });
  };

  return (
    <form
      className="riff-input-form"
      onSubmit={(e) => handleSubmit(e, riff, err, setErr)}
    >
      {riff.tabs.map((t, i) => {
        return (
          <figure key={i}>
            <ChordRead chord={getChord(t.chordName)} />
            <Riff riff={t} />
          </figure>
        );
      })}

      {riff.tabs.map((t, i) => {
        const ii = i + 1;
        return (
          <fieldset key={i}>
            <label htmlFor={`chord${ii}`}>
              <span>chord</span>
              <select
                name="chord"
                id={`chord${ii}`}
                className="chord"
                onChange={(e) => handleChangeTab(e, ii, "chordName")}
                value={riff.tabs[i].chordName}
                required
              >
                <option />
                {chords.map((c, y) => (
                  <option key={y} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor={`beat${ii}`}>
              <span>beat</span>
              <select
                name="beat"
                id={`beat${ii}`}
                className={`beat${ii}`}
                onChange={(e) => handleChangeTab(e, ii, "beat")}
                value={riff.tabs[i].beat}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={16}>16</option>
              </select>
            </label>
            <label htmlFor={`turn${ii}`}>
              <span>repeat</span>
              <select
                name="turn"
                id={`turn${ii}`}
                className={`turn${ii}`}
                onChange={(e) =>
                  handleChangeTab(e, ii, "options", {
                    ...riff.tabs[i].options,
                    turn: e.target.value,
                  })
                }
                value={riff.tabs[i].options.turn}
              >
                <option value="">{""}</option>
                <option value=">">{">"}</option>
                <option value="<">{"<"}</option>
                <option value="both">both</option>
              </select>
            </label>
            <label htmlFor={`parm-mutes${ii}`}>
              <span>p-mutes</span>
              <input
                type="text"
                name={`parm-mutes${ii}`}
                id={`parm-mutes${ii}`}
                placeholder="divide by ,"
                onChange={(e) =>
                  handleChangeTab(e, ii, "options", {
                    ...riff.tabs[i].options,
                    parmMutes: [
                      ...e.target.value.split(",").map((v) => parseInt(v)),
                    ],
                  })
                }
                defaultValue={riff.tabs[i].options.parmMutes.join(",")}
              />
            </label>
            <label htmlFor={`up${ii}`}>
              <span>up pick</span>
              <input
                type="text"
                name={`up${ii}`}
                id={`up${ii}`}
                placeholder="divide by ,"
                onChange={(e) =>
                  handleChangeTab(e, ii, "options", {
                    ...riff.tabs[i].options,
                    upPicking: [
                      ...e.target.value.split(",").map((v) => parseInt(v)),
                    ],
                  })
                }
                defaultValue={riff.tabs[i].options.upPicking.join(",")}
              />
            </label>
            <label htmlFor={`rest${ii}`}>
              <span>rest</span>
              <input
                type="text"
                name={`rest${ii}`}
                id={`rest${ii}`}
                placeholder="divide by ,"
                onChange={(e) =>
                  handleChangeTab(e, ii, "options", {
                    ...riff.tabs[i].options,
                    rest: [
                      ...e.target.value.split(",").map((v) => parseInt(v)),
                    ],
                  })
                }
                defaultValue={riff.tabs[i].options.rest.join(",")}
              />
            </label>
            <label htmlFor={`vibe${ii}`}>
              <span>vibe</span>
              <input
                type="text"
                name={`vibe${ii}`}
                id={`vibe${ii}`}
                placeholder="divide by ,"
                onChange={(e) =>
                  handleChangeTab(e, ii, "options", {
                    ...riff.tabs[i].options,
                    vibe: [
                      ...e.target.value.split(",").map((v) => parseInt(v)),
                    ],
                  })
                }
                defaultValue={riff.tabs[i].options.vibe.join(",")}
              />
            </label>
          </fieldset>
        );
      })}

      <input
        className="riff-option-text"
        onChange={(e) =>
          handleChangeOptions(e, "riffOption", {
            text: e.target.value,
          })
        }
        value={riff.riffOption.text}
        placeholder="some message"
      />
      <input
        className="riff-option-memo"
        onChange={(e) =>
          handleChangeOptions(e, "memo", e.target.value)
        }
        value={riff.memo}
        placeholder="some memo"
      />

      <input type="submit" className="submit" value="submit" />

      <p className={`err ${err.msg && "active"}`} onClick={handleErr}>
        {err.msg}
      </p>
    </form>
  );
};

export default RiffForm;
