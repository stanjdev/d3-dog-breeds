import drawDogSheddingChart from './draw/drawDogSheddingChart.js';
import { cleanedData } from '../helpers/helpers.js';

export default async function dogSheddingAmount(data) {
  const sheddingData = cleanedData(data, 'Amount Of Shedding');
  /*
    [
      {group: '1', count: 51}
      {group: '2', count: 84}
      {group: '3', count: 116}
      {group: '4', count: 91}
      {group: '5', count: 49}
    ]
  */

    drawDogSheddingChart(sheddingData);
};

    