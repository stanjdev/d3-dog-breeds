export default function drawBreedGroupsChart(breedGroupsData) {
  const width = 900;
  const height = 450;
  const margin = 40;
  const breedGroupNames = breedGroupsData.map((line) => line.group);

  const color = d3.scaleOrdinal()
    .domain(breedGroupNames)
    .range(['#2B2D2F'])
  
  const xscale = d3.scaleBand()
    .domain(breedGroupNames)
    .range([margin, width])
    .padding(0.05) // space between the bars

  const groupExtent = d3.extent(Object.values(breedGroupsData), (d) => d);
  const yscale = d3.scaleLinear()
    .domain([0, 125])
    // .domain(groupExtent)
    .range([height, margin])

  const svg = d3.select('#svg_breed_groups')
    .style('margin-top', margin)
    .style('border', 'solid 1px')

  const title = svg
    .append('g')
  
  title
    .append('text')
    .text('Which Dog Breed Groups are the Most and Least Common?')
    .attr('transform', `translate(${width / 3.7}, 20)`)
    .attr('class', 'labelText')

  const bottomAxis = d3.axisBottom(xscale)

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis)

  const leftAxis = d3.axisLeft(yscale)

  svg
    .append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(leftAxis)

  svg.append('g')
    .selectAll('rect')
    .data(breedGroupsData)
    .enter()
    .append('rect')
    .attr('fill', (d, i) => color(i))
    .attr('x', (d, i) => xscale(d.group))
    .attr('y', (d) => yscale(d.count))
    .attr('width', xscale.bandwidth())
    .attr('height', (d) => height - yscale(d.count))
};
