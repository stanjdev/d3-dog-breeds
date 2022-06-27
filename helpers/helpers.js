export const convertStrToNumber = (str) => {
  if (str) {
    return Number(str.replaceAll(',', ''));
  }
};

