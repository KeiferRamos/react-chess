export const getDirection = (current: "white" | "black") => {
  const letters = "abcdefgh";
  const Dir =
    current === "white" ? letters.split("").reverse() : letters.split("");
  return Dir;
};
