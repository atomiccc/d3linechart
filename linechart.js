function num(max) {
	return Math.abs(Math.floor(Math.random() * max) + (max - 200));
}

var data = [];

d3.timeDay.range(new Date(2015, 0, 1), new Date(2016, 0, 1), 1).forEach(function(date) {
	data.push({
		date: date,
		similarityRed: num(100), 
		similarityOrange: num(200), 
		similarityYellow: num(300), 
		similarityBlue: num(400), 
		similarityGreen: num(700)
	});
});

// var data = [
// 	{ date: '2015-09-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2015-10-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2015-11-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2015-12-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-01-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-02-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-03-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-04-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-05-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-06-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-07-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-08-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-09-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-10-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-11-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2016-12-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-01-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-02-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-03-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-04-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-05-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-06-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-07-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-08-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// 	{ date: '2017-09-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
// ];

var svg = d3.select('#linechart').append('svg').attr('height', '300px').attr('width', '500px');

var xExtent = d3.extent(data, function(d, i) { return d.date; });

var yValues = [];

data.forEach(function(d) {
	for (key in d) {
		if (key !== 'date') {
			yValues.push(d[key]);
		}
	}	
});

var yMin = d3.min(yValues, function(d, i) { return d; });
var yMax = d3.max(yValues, function(d, i) { return d; });

var xOrigScale = d3.scaleTime()
	.domain([ new Date(xExtent[0]), new Date(xExtent[1]) ])
	.range([40,495]);

var xScale = xOrigScale.copy();

var yScale = d3.scaleLinear()
	.domain([yMin, yMax])
	.range([220,2]);


var xAxis = d3.axisBottom(xScale).ticks(6);
var yAxis = d3.axisLeft(yScale);

var xAxisG = svg.append('g')
	.attr('id', 'xAxisG')
	.attr('transform', 'translate(0,220)')
	.call(xAxis);

var yAxisG = svg.append('g')
	.attr('id', 'yAxisG')
	.attr('transform', 'translate(40,0)')
	.call(yAxis);


var color = d3.scaleOrdinal()
    .range(['#FF4848', '#FF9C42', '#FFF06A', '#24E0FB', '#36F200']);

var linesG = svg.append('g');

var legend = svg.append('g')
	.attr('id', 'legend')
	.attr('transform', 'translate(60, 250)')
	.style('opacity', '0');


var dateText = legend.append('text')
	.attr('id', 'date-text')
	.attr('class', 'legend-text')
	.attr('x', 0)
	.attr('y', 20);

var lines = {};
var paths = {};
var index = Object.keys(data[0]).length - 1;

for (key in data[0]) {

	if (key !== 'date') {

		var line = d3.line()
			.x(function(d) {
				return xScale(new Date(d.date));
			})
			.y(function(d) {
				return yScale(d[key]);
			})
			.curve(d3.curveCatmullRom.alpha(0.5));

		lines[key] = line;

		path = linesG.append('path')
			.attr('d', line(data))
			.attr('id', key)
			.attr('fill', 'none')
			.attr('stroke', function(d) { return color(key); })
			.attr('stroke-width', 2);

		var totalLength = path.node().getTotalLength();

		path
			.attr('stroke-dasharray', totalLength + ' ' + totalLength)
			.attr('stroke-dashoffset', totalLength)
			.transition()
			.duration(2000)
		    .ease(d3.easeCubicInOut)
			.attr('stroke-dashoffset', 0);

		paths[key] = path;


		legend.append('rect')
			.attr('class', 'legend-text')
			.attr('fill', color(key))
			.attr('x', function() {
				return 60 * index + 70;
			})
			.attr('height', 20)
			.attr('width', 20)
			.attr('y', 5);

		legend.append('text')
			.attr('id', 'text' + key)
			.attr('class', 'legend-text')
			.attr('fill', 'black')
			.attr('x', function() {
				return 60 * index + 93;
			})
			.attr('y', 20);

		index--;
	}
}

var clipPath = svg.append('clipPath')
  	.attr('id', 'clip')
  	.append('rect')
    .attr('x', 40)
    .attr('y', 0)
    .attr('height', 240)
    .attr('width', 500);

var focus = svg.append('g')
	.attr('class', 'focus')
	.style('display', 'none');

focus.append('line')
	.attr('id', 'dotted-line')
	.attr('x1', 0)
	.attr('y1', 0)
	.attr('x2', 0)
	.attr('y2', 220)
	.attr('stroke', 'black')
	.attr('stroke-dasharray', '1, 2');


svg.append("rect")
	.attr("class", "overlay")
	.attr("width", 500)
	.attr("height", 240)
	.on("mouseout", function() { 
		focus.style('display', 'none');
		legend
			.transition()
			.duration(100)
			.style('opacity', '0');
	})
	.on("mousemove", mousemove)
	.style('cursor', 'move')
	.attr('clip-path', 'url(#clip)');


var zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on('zoom', zoomed);

svg.call(zoom);

function zoomed() {
	console.log('zoomed');

	xScale = d3.event.transform.rescaleX(xOrigScale);

	xAxisG.call(xAxis.scale(d3.event.transform.rescaleX(xOrigScale)));

	for (key in data[0]) {
  		if (key !== 'date') {

  			line = lines[key];
  			path = paths[key];

  			totalLength = path.node().getTotalLength();

  			path
  				.attr('stroke-dasharray', totalLength + ' ' + totalLength)
  				.attr('stroke-dashoffset', totalLength)
  				.attr('stroke-dashoffset', 0);

  			path.attr('d', line(data));
  			path.attr('clip-path', 'url(#clip)');

  		}
  	}
	
}


var bisectDate = d3.bisector(function(d) { return new Date(d.date); }).left;

function mousemove() {
	var x = d3.mouse(this)[0];

	var x0 = xScale.invert(d3.mouse(this)[0]),
		i = bisectDate(data, x0, 1),
		d0 = data[i - 1],
		d1 = data[i],
		d = x0 - d0.date > d1.date - x0 ? d1 : d0;

	focus.style('display', 'block');
	dateText.style('display', 'block');
	legend
		.transition()
		.duration(90)
		.style('opacity', '1');

	focus.attr("transform", "translate(" + xScale( new Date(d.date)) + ",0)");

	var date = new Date(d.date);
	date = date.toUTCString().split(' ');
	date = date[0] + ' ' + date[1] + ' ' + date[2] + ' ' + date[3];

	dateText.text(date);

	for (key in data[0]) {
	  	if (key !== 'date') {
	  		svg.select('#text' + key)
	  			.text(Number(d[key]).toLocaleString());

		}
	}
}
