export const getStartFrame = (chord) => {
  const min = Math.min(
    ...chord.strings.filter((s) => s !== false && s !== true)
  );
  return min !== Infinity ? min : 1;
};
