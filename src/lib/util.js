export const getStartFrame = (chord) => {
  const min = Math.min(
    ...chord.strings.filter((s) => s !== false && s !== true)
  );
  return min !== Infinity ? min : 1;
};

export const addTime = (t, add) => {
  return new Date(new Date(t).setHours(t.getHours() + add));
};
