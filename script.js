/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
marginLeft = 40

// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height)

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (rows) => {
    let arrGoal = []
    rows.map( row => {
      row.GoalsScored = +row.GoalsScored
      arrGoal.push(row.GoalsScored)
    })
    redraw(arrGoal)
  })
}
// redraw function
let redraw = (data) => {
  // Your data to graph here
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, height])

  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('fill', 'teal')
    .attr('x', (d, i) => {
      return i * 22
    })
    .attr('y', (d) => {
      
      return 300 - yScale(d)
    })
    .attr('width', 20)
    .attr('height', (d) => {
      return yScale(d)
    })
}

reload()
