chart = (elem)->
  margin = {top: 20, right: 100, bottom: 50, left: 50}
  width = 960 - margin.left - margin.right
  height = 500 - margin.top - margin.bottom
  maxDays = 8
  minDays = 4

  x = d3.scale.linear().range([0, width])

  y = d3.scale.linear().range([height, 0])

  color = d3.scale.category10()

  xAxis = d3.svg.axis()
    .scale(x)
    .tickFormat((d)-> if Math.floor(d) != d then return else 'day ' + d)
    .orient("bottom")

  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")

  line = d3.svg.line()
    .interpolate("linear") 
    .x((d)-> x(d.day))
    .y((d)-> y(d.temp))  

  zoom = d3.behavior.zoom()
    .x(x)
    .scaleExtent([1, 2])
    .on 'zoom', ->
      tx = d3.event.translate[0]
      ty = d3.event.translate[1]
      tx = Math.min(1, Math.max(tx, width - Math.round(x(maxDays) - x(1)), width - Math.round(x(maxDays) - x(1)) * d3.event.scale))
      zoom.translate([tx, ty])
  
      svg.select('.x.axis')
        .call(xAxis)

      svg.selectAll('.line')
        .attr("d", (d)->
          line(d.temps))
        .style("stroke", (d)-> color(d.name))
        
      svg.selectAll('circle.dot')
        .attr('cy', (d)-> y(d.temp))
        .attr('cx', (d)-> x(d.day))
        .attr('r', 5)


  svg = d3.select(elem).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(#{margin.left},#{margin.top})")

  # zoom panel
  svg.append("rect")
    .attr('class', 'zoom-panel')
    .attr("width", width)
    .attr("height", height)
    .call(zoom)

  # clip path  
  defs = svg
    .append('svg')
      .attr('width', 0)
      .attr('height', 0)
    .append('defs')
  
  defs.append('clipPath')
      .attr('id', 'clipper')
    .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width)
      .attr('height', height)

  # x axis
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,#{height})")
    .call(xAxis)
  
  # y axis
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0,0)")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr('x', -180)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature")

  (data)->
  
    # x and y domains
    maxDays = d3.max(data, (m)-> d3.max(m.temps, (d)-> d.day))
    x.domain([1, maxDays])
    y.domain([
      d3.min(data, (d)-> d3.min(d.temps, (t)-> t.temp)),
      d3.max(data, (d)-> d3.max(d.temps, (t)-> t.temp))
    ])
    
    # zoom factor
    zoom.scaleExtent([1, maxDays / minDays])

    svg.selectAll('.x.axis')
      .transition()
      .duration(500)
      .call(xAxis)
    svg.selectAll('.y.axis')
      .transition()
      .duration(500)
      .call(yAxis)

    city = svg.selectAll(".city")
      .data(data, (c)-> c.id)
  
    cityEnter = city.enter().append("g")
        .attr("class", "city")
    
    # line chart: lines  
    cityEnter.append("path")
      .attr('clip-path', 'url(#clipper)')
      .attr("class", "line")

    city.select('path')
      .transition()
      .duration(500)
      .attr("d", (d)-> line(d.temps))
      .style("stroke", (d)-> color(d.name))
    
    # line chart: dots
    cityEnter.append('g')
      .attr('class', 'dots')
      .attr('clip-path', 'url(#clipper)')
      .selectAll('circle')
      .data((d)-> d.temps)
      .enter()
        .append('circle')
        .attr('class', 'dot')

    city.select('.dots')
      .style('stroke', (d)-> color(d.name))
      .selectAll('circle')
        .transition()
        .duration(500)
        .attr('cy', (d)-> y(d.temp))
        .attr('cx', (d)-> x(d.day))
        .attr('r', 5)

    # legend: city name
    cityEnter.append("text")
        .attr('class', 'city-name')

    city.select("text.city-name")
        .attr("x", width + 20)
        .attr("y", (d, i)-> i * 20)
        .attr("dy", ".35em")
        .text((d)-> d.name)

    # legend: movie dot color
    cityEnter.append('circle')
        .attr('class', 'city-dot')

    city.select('circle.city-dot')
        .attr('cx', width + 10)
        .attr('cy', (d, i)-> i * 20)
        .attr('r', 5)
        .style('fill', (d)-> color(d.name))

    # exit 
    city.exit().remove()
  
    zoom.x(x)

# driver part

dataGen = (->
  do (id = 1)->
    ->
      nums = Math.ceil(Math.random() * 11) + 4
      tempSeed = Math.round(Math.random() * 30)
      data = {
        id: id
        name: "City #{id}"
        temps:
          {day: j, temp: tempSeed + Math.round(Math.random() * 5)} for j in [1..nums]
      }
      id = id + 1
      data
  )()

data = []
for i in [1..3]
  data.push dataGen()

c = chart('#chart')
c(data)

addButton = document.getElementById('add')
addButton.addEventListener 'click', ->
  data.push dataGen()
  c(data)
  
removeButton = document.getElementById('remove')
removeButton.addEventListener 'click', ->
  index = Math.floor(Math.random() * data.length)
  data.splice(0, 1)
  c(data)
  
