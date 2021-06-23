import React from "react";

const GString = ({ s, i, start }) => {
  return (
    <>
      <line
        key={i}
        x1="35"
        x2="370"
        y1={i * 30 + 100}
        y2={i * 30 + 100}
        strokeWidth={i + 3}
        stroke="#000"
      />

      {s === false ? (
        <text x="15" y={i * 30 + 105} fill="#ED6E46" font-size="15">
          X
        </text>
      ) : (
        <>
          <text x="15" y={i * 30 + 105} fill="#ED6E46" font-size="15">
            O
          </text>

          {s !== true && (
            <circle
              cx={(s - start + 1) * 65 + 8}
              cy={i * 30 + 100}
              r="10"
              fill="#5faef2"
            />
          )}
        </>
      )}
    </>
  );
};

const ChordRead = () => {
  const chord = {
    name: "g7",
    strings: [false, true, false, 17, 18, 17],
    tags: [false, false, false, false, false, false],
  };

  const start = Math.min(
    ...chord.strings.filter((s) => s !== false && s !== true)
  );

  return (
    <svg
      viewBox="0 0 400 400"
      width={400}
      height={400}
      preserveAspectRatio="xMinYMin meet"
      className="tab"
    >
      <rect fill="#fff" x="0" y="0" width="400" height="400" />
      {chord.strings.map((s, i) => (
        <GString s={s} i={i} start={start} />
      ))}

      <text
        x="45"
        y="65"
        fill="#ED6E46"
        font-size="30"
        fontWeight="bold"
        className="start"
      >
        {start} fr
      </text>

      {/* TODO: parm must or stroke, arpezio mark */}

      <text
        x="180"
        y="320"
        fill="#ED6E46"
        font-size="40"
        fontWeight="bold"
        className="chord name"
      >
        {chord.name}
      </text>

      {[...Array(6).keys()].map((f, i) => (
        <line
          key={i}
          y1="100"
          y2="250"
          x1={i * 65 + 40}
          x2={i * 65 + 40}
          strokeWidth={3}
          stroke="#9e9e9e"
        />
      ))}
    </svg>
  );
};

export default ChordRead;
