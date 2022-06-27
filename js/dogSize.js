export default async function dogSize(data) {
  const width = 850;
  const height = 450;
  const margin = 50;

  const avgHeight = data.map((dog) => Number(dog['Avg. Height, cm']));
  const maxHeight = Math.max(...avgHeight);

  const xscale = d3.scaleLinear()
    .domain([0, maxHeight])
    .range([margin, width])
    
  const widthExtent = d3.extent(data, (d) => Number(d['Avg. Weight, kg']));
  const yscale = d3.scaleLinear()
    .domain([0, Math.max(...widthExtent)])
    .range([height, margin])

  const svg = d3.select('#svg_dog_size')
    .style('margin-top', margin)
    .style('border', 'solid 1px')
    
  const colorScale = d3.scaleOrdinal()
    .domain(widthExtent)
    .range(['tomato', 'lime', 'purple', 'cornflowerblue', 'orange',])


  const title = svg
    .append('g')
  
  title
    .append('text')
    .text('What is the Correlation Between Height and Weight of Dogs by Size?')
    .attr('transform', `translate(${width / 4}, 20)`)
    .attr('class', 'labelText')

  const bottomAxis = d3.axisBottom(xscale);
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(bottomAxis)

  const bottomLabel = svg
    .append('g')

  bottomLabel
    .append('text')
    .text('Avg. Height, cm')
    .attr('transform', `translate(${width / 2.2}, ${height + 40})`)
    .attr('class', 'labelText')

  const leftAxis = d3.axisLeft(yscale);
  svg
    .append('g')
    .attr('transform', `translate(${margin}, 0)`)
    .call(leftAxis)

  const leftLabel = svg
    .append('g')

  leftLabel
    .append('text')
    .text('Avg. Weight, kg')
    .attr('transform', `translate(${margin - 30}, ${height / 1.5}) rotate(270) `)
    .attr('class', 'labelText')

  svg
    .append('g')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d) => xscale(d['Avg. Height, cm']))
    .attr('cy', (d) => yscale(d['Avg. Weight, kg']))
    .attr('r', 3)
    .attr('fill', (d) => colorScale(d['Dog Size']))

  const dogSizes = [...new Set(data.map((line) => line['Dog Size']))]
  // const dogSizes = data.map((line) => line['Dog Size']).filter((v, i, a) => a.indexOf(v) === i)

  const labels = svg
    .append('g')

  labels
    .selectAll('circle')
    .data(dogSizes)
    .enter()
    .append('circle')
    .attr('r', '5')
    .attr('cx', 80)
    .attr('cy', (d, i) => (i * 20) + 40)
    .attr('fill', (d, i) => colorScale(i))

  labels
    .selectAll('text')
    .data(dogSizes)
    .enter()
    .append('text')
    .text((d) => `${d[0].toUpperCase() + d.slice(1)}`)
    .attr('x', 95)
    .attr('y', (d, i) => (i * 20) + 45)
    .attr('class', 'labelText')

};
