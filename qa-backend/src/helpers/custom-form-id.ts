const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const rndInt = Math.floor(Math.random() * 6) + 1;

export const customUUID = (total: number): string => {
  let formId = ``;
  for (let i = 0; i < 2; i++) {
    const rand = Math.floor(Math.random() * 25) + 1;
    formId += alphabet[rand];
  }

  return `${formId}${total + 1}`;
};
