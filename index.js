import dogBreedGroups from './js/dogBreedGroups.js';
import dogSize from './js/dogSize.js';
import dogSheddingAmount from './js/dogSheddingAmount.js';

async function handleData() {
  const data = await d3.csv('dogs_cleaned.csv');
  dogBreedGroups(data);
  dogSize(data);
  dogSheddingAmount(data);
};

handleData();
