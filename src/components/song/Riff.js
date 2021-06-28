import React from "react";

const Riff = ({ riff, className }) => {
  return (
    <>
      <svg
        viewBox="0 0 400 200"
        preserveAspectRatio="xMinYMin meet"
        className={`tab song-tab ${className}`}
      >
        <rect fill="#fff" x="0" y="0" width="400" height="400" />

        <line x1="20" x2="380" y1="100" y2="100" stroke="#000" />

        {riff.options.turn === ">" ? (
          <>
            <line
              x1="20"
              x2="20"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="7"
            />
            <line
              x1="30"
              x2="30"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="3"
            />
            <circle cx="40" cy="88" r="3" fill="#000" />
            <circle cx="40" cy="112" r="3" fill="#000" />
          </>
        ) : riff.options.turn === "<" ? (
          <>
            <circle cx="360" cy="88" r="3" fill="#000" />
            <circle cx="360" cy="112" r="3" fill="#000" />

            <line
              x1="370"
              x2="370"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="3"
            />
            <line
              x1="380"
              x2="380"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="7"
            />
          </>
        ) : riff.options.turn === "both" ? (
          <>
            <line
              x1="20"
              x2="20"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="7"
            />
            <line
              x1="30"
              x2="30"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="3"
            />
            <circle cx="40" cy="88" r="3" fill="#000" />
            <circle cx="40" cy="112" r="3" fill="#000" />
            <circle cx="360" cy="88" r="3" fill="#000" />
            <circle cx="360" cy="112" r="3" fill="#000" />

            <line
              x1="370"
              x2="370"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="3"
            />
            <line
              x1="380"
              x2="380"
              y1="80"
              y2="120"
              stroke="#000"
              strokeWidth="7"
            />
          </>
        ) : (
          ""
        )}

        {[...Array(riff.beat).keys()].map((p, i) => {
          const isVibe = riff.options.vibe.indexOf(i + 1) > -1;
          const isUp = riff.options.upPicking.indexOf(i + 1) > -1;
          const isRest = riff.options.rest.indexOf(i + 1) > -1;

          return (
            <text
              key={i}
              x={
                isVibe ? 52 + (300 / riff.beat) * i : 60 + (300 / riff.beat) * i
              }
              y={isVibe ? 115 : 138}
              fill={isRest ? "#009688" : isUp ? "#3f51b5" : "#5faef2"}
              fontSize="60"
            >
              {isVibe ? (
                "~"
              ) : isRest ? (
                <>&#119102;</>
              ) : isUp ? (
                <>&#x2c4;</>
              ) : (
                <>&#x2c5;</>
              )}
            </text>
          );
        })}

        {[...Array(riff.beat).keys()].map((p, i) => {
          const isMute = riff.options.parmMutes.indexOf(i + 1) > -1;

          return (
            isMute && (
              <circle
                key={i}
                cx={73 + (300 / riff.beat) * i}
                cy={80}
                r="3"
                fill="#ED6E46"
              />
            )
          );
        })}
      </svg>
    </>
  );
};

export default Riff;
