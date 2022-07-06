import drawBreedGroupsChart from './draw/drawBreedGroupsChart.js';
import { cleanedData } from '../helpers/helpers.js';

export default async function dogBreedGroups(data) {
  const breedGroupsData = cleanedData(data, "Dog Breed Group");
  /*
    [
      {group: 'Mixed Breed Dogs', count: 123}
      {group: 'Companion Dogs', count: 45}
      {group: 'Hound Dogs', count: 41}
      {group: 'Terrier Dogs', count: 32}
      {group: 'Working Dogs', count: 55}
      {group: 'Sporting Dogs', count: 41}
      {group: 'Herding Dogs', count: 39}
      {group: 'Hybrid Dogs', count: 15}
    ]
  */

  drawBreedGroupsChart(breedGroupsData);
};

    