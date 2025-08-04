export const formatReleaseDate = (date) => {
  if (!date) return "Unknown Release Date";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};
