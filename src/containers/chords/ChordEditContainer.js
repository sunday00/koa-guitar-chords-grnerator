import React, { useEffect, useState } from "react";
import ChordRead from "../../components/chords/ChordsRead";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";

import * as util from "../../lib/util";
import * as api from "../../lib/chord";

const ChordEditContainer = ({ match }) => {
  const [chord, setChord] = useState({
    id: undefined,
    name: "",
    strings: [],
    memo: "",
  });

  const [checkIcon, setCheckIcon] = useState([
    faCheckSquare,
    faCheckSquare,
    faCheckSquare,
    faCheckSquare,
    faCheckSquare,
    faCheckSquare,
  ]);

  const initChecked = (data) => {
    let newChecked = [];
    data.strings.forEach((s, i) => {
      const tORf = s !== false;
      document.querySelector(`[name="string${i + 1}"]`).checked = tORf;
      newChecked.push(tORf ? faCheckSquare : faSquare);
    });
    setCheckIcon(newChecked);
  };

  useEffect(() => {
    api.getChord(match).then((res) => {
      if (res.status === 200) {
        setChord(res.data);
        initChecked(res.data);
      }
    });
  }, [match]);

  const [err, setErr] = useState({
    msg: "",
  });

  const handleChangeStart = (e) => {
    if (e.target.value === "") return;

    let newStrings = Array.from(chord.strings).map((s) => {
      switch (s) {
        default:
          return parseInt(e.target.value);
        case true:
          return true;
        case false:
          return false;
      }
    });

    setChord({
      ...chord,
      strings: newStrings,
    });
  };

  const handleChangeMemo = (e) => {
    setChord({
      ...chord,
      memo: e.target.value,
    });
  };

  const handleChangeName = (e) => {
    setChord({
      ...chord,
      name: e.target.value,
    });
  };

  const handleCheck = (e) => {
    let newChecked = Array.from(checkIcon);

    let newStrings = Array.from(chord.strings).map((s, i) => {
      if (i + 1 === parseInt(e.target.dataset.no)) {
        newChecked[i] = e.target.checked ? faCheckSquare : faSquare;
        return e.target.checked;
      }
      return s;
    });

    setChord({
      ...chord,
      strings: newStrings,
    });

    setCheckIcon(newChecked);
  };

  const handleClick = (e, r, f) => {
    let newStrings = Array.from(chord.strings);
    newStrings[r] = f + util.getStartFrame(chord) - 1;

    if (newStrings[r] === Infinity) {
      newStrings[r] = 1;
    }

    document.querySelector(`[name="string${r + 1}"]`).checked = true;
    let newChecked = Array.from(checkIcon);
    newChecked[r] = faCheckSquare;
    setCheckIcon(newChecked);

    setChord({
      ...chord,
      strings: newStrings,
    });
  };

  const handleSubmit = (e) => {
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

  const handleErr = (e) => {
    err.msg !== "wait..." && setErr({ ...err, msg: "" });
  };

  return (
    <form className="chord-input-form" onSubmit={handleSubmit}>
      <ChordRead chord={chord} className="input" />

      <div className="svgOverWrap">
        <div className="outer">
          <div className="checks">
            <label htmlFor="string6">
              <FontAwesomeIcon icon={checkIcon[5]} />
            </label>
            <label htmlFor="string5">
              <FontAwesomeIcon icon={checkIcon[4]} />
            </label>
            <label htmlFor="string4">
              <FontAwesomeIcon icon={checkIcon[3]} />
            </label>
            <label htmlFor="string3">
              <FontAwesomeIcon icon={checkIcon[2]} />
            </label>
            <label htmlFor="string2">
              <FontAwesomeIcon icon={checkIcon[1]} />
            </label>
            <label htmlFor="string1">
              <FontAwesomeIcon icon={checkIcon[0]} />
            </label>

            <input
              type="checkbox"
              name="string6"
              data-no="6"
              defaultChecked={true}
              onChange={handleCheck}
              id="string6"
            />
            <input
              type="checkbox"
              name="string5"
              data-no="5"
              defaultChecked={true}
              onChange={handleCheck}
              id="string5"
            />
            <input
              type="checkbox"
              name="string4"
              data-no="4"
              defaultChecked={true}
              onChange={handleCheck}
              id="string4"
            />
            <input
              type="checkbox"
              name="string3"
              data-no="3"
              defaultChecked={true}
              onChange={handleCheck}
              id="string3"
            />
            <input
              type="checkbox"
              name="string2"
              data-no="2"
              defaultChecked={true}
              onChange={handleCheck}
              id="string2"
            />
            <input
              type="checkbox"
              name="string1"
              data-no="1"
              defaultChecked={true}
              onChange={handleCheck}
              id="string1"
            />
          </div>
        </div>
        <div className="outer middle">
          <div className="inner top">
            <div className="start-set">
              <input
                className="start"
                name="start"
                onChange={(e) => handleChangeStart(e)}
                type="number"
                min="1"
                max="24"
                value={util.getStartFrame(chord)}
                required
              />
              <span>fr</span>
            </div>
            <fieldset className="memo-set">
              <legend className="memo-legend">memo</legend>
              <textarea
                className="memo"
                name="memo"
                onChange={(e) => handleChangeMemo(e)}
                value={chord.memo || ""}
              />
            </fieldset>
          </div>
          <div className="inner middle">
            {[...Array(6).keys()].map((r) =>
              [...Array(5).keys()].map((f) => (
                <p
                  data-n={`${r}${f + 1}`}
                  key={`${r}${f + 1}`}
                  onClick={(e) => handleClick(e, r, f + 1)}
                ></p>
              ))
            )}
          </div>
          <div className="inner">
            <fieldset>
              <legend> chord name </legend>
              <input
                className="name"
                name="name"
                onChange={(e) => handleChangeName(e)}
                type="text"
                maxLength="8"
                value={chord.name}
                placeholder="ex) g7"
                required
              />
            </fieldset>

            <input type="submit" className="submit" value="submit" />
          </div>
        </div>
        <div className="outer"></div>
      </div>

      <p className={`err ${err.msg && "active"}`} onClick={handleErr}>
        {err.msg}
      </p>
    </form>
  );
};

export default ChordEditContainer;
