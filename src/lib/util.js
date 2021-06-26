export const getStartFrame = (chord) => {
  const min = Math.min(
    ...chord.strings.filter((s) => s !== false && s !== true)
  );
  return min !== Infinity ? min : 1;
};

export const addTime = (t, add) => {
  return new Date(new Date(t).setHours(t.getHours() + add));
};

export const checkAuth = () => {
  let storedAut = localStorage.getItem("auth");
  let storedExp = localStorage.getItem("expire");

  if (storedExp && new Date(storedExp) > new Date() && storedAut === "1") {
    return true;
  }

  return false;
}