export default function drawDogSheddingChart(sheddingData) {
  const width = 900;
  const height = 450;
  const margin = 40;
  const sheddingGroup = sheddingData.map((line) => line.group).sort();

  const color = d3.scaleOrdinal()
    .domain(sheddingGroup)
    .range(['#4B2D2F'])
  
  const xscale = d3.scaleBand()
    .domain(sheddingGroup)
    .range([margin, width])
    .padding(0.05)

  const groupExtent = d3.extent(sheddingData, (d) => d.count);
  const yscale = d3.scaleLinear()
    .domain([0, 120])
    // .domain(groupExtent)
    // .domain([0, groupExtent[1]])
    .range([height, margin])

  const svg = d3.select('#svg_dog_shedding')
    .style('margin-top', margin)
    .style('border', 'solid 1px')

  const title = svg
    .append('g')
  
  title
    .append('text')
    .text('Of 391 Dog Breeds, Are There More Dogs That Shed Than Do Not Shed?')
    .attr('transform', `translate(${width / 3.8}, 20)`)
    .attr('class', 'labelText')

  const leftLabel = svg.append('g')
  leftLabel
    .append('text')
    .text('Shed Very Little')
    .attr('transform', `translate(${80}, ${height + 35})`)
    .attr('class', 'labelText')

  const rightLabel = svg.append('g')
  rightLabel
    .append('text')
    .text('Shed A Lot')
    .attr('transform', `translate(${width / 1.16}, ${height + 35})`)
    .attr('class', 'labelText')
  
  const bottomAxis = d3.axisBottom(xscale);

  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis)

  const leftAxis = d3.axisLeft(yscale);

  svg
    .append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(leftAxis)

  svg.append('g')
    .selectAll('rect')
    .data(sheddingData)
    .enter()
    .append('rect')
    .attr('fill', (d, i) => color(i))
    .attr('x', (d, i) => xscale(d.group))
    .attr('y', (d) => yscale(d.count))
    .attr('width', xscale.bandwidth())
    .attr('height', (d) => height - yscale(d.count))
};
