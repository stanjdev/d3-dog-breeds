export const convertStrToNumber = (str) => {
  if (str) {
    return Number(str.replaceAll(',', ''));
  }
};

export const cleanedData = (data, target) => {
  const histogram = {};
  for (const line of data) {
    histogram[line[target]] ? histogram[line[target]] += 1 : histogram[line[target]] = 1;
  }
  return Object.entries(histogram).map((entry) => {
    return {group: entry[0], count: entry[1]}
  }).sort((a, b) => b.count - a.count)
};
