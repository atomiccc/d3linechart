function num(max) {
	return Math.abs(Math.floor(Math.random() * max) + (max - 200));
}

var data = [
	{ date: '2015-09-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2015-10-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2015-11-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2015-12-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-01-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-02-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-03-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-04-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-05-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-06-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-07-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-08-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-09-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-10-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-11-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2016-12-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-01-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-02-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-03-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-04-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-05-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-06-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-07-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-08-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
	{ date: '2017-09-01', similarityRed: num(100), similarityOrange: num(200), similarityYellow: num(300), similarityBlue: num(400), similarityGreen: num(700) },
];

var svg = d3.select('#linechart').append('svg').attr('height', '250px').attr('width', '500px');

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

var lines = {};
var paths = {};
var focii = {};
var bisects = {};

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

		path = svg.append('g').append('path')
			.attr('d', line(data))
			.attr('id', key)
			.attr('fill', 'none')
			.attr('stroke', function(d) { return color(key); }) //'#36F200')
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

		var bisectDate = d3.bisector(function(d) { return new Date(d.date); }).left;



		var focus = svg.append('g')
			.attr('class', 'focus')
			.style('display', 'none');

		focii[key] = focus;

		focus.append('circle')
			.attr('r', 3.5)
			.attr('stroke', function(d) { return color(key); })
			.attr('fill', function(d) { return color(key); });

		focus.append('text')
			.attr('x', 9)
			.attr('dy', '.35em');

		svg.append("rect")
			.attr("class", "overlay")
			.attr("width", 500)
			.attr("height", 240)
			.on("mouseover", function() { focii[key].style("display", null); })
			.on("mouseout", function() { focii[key].style("display", "none"); })
			.on("mousemove", mousemove);
	}

}


var clipPath = svg.append('clipPath')
  	.attr('id', 'clip')
  	.append('rect')
    .attr('x', 40)
    .attr('y', 0)
    .attr('height', 240)
    .attr('width', 500);

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


function mousemove() {
	for (key in data[0]) {
	  	if (key !== 'date') {

			var x0 = xScale.invert(d3.mouse(this)[0]),
				i = bisectDate(data, x0, 1),
				d0 = data[i - 1],
				d1 = data[i],
				d = x0 - d0.date > d1.date - x0 ? d1 : d0;


			var focus = focii[key];
			console.log(key, focus);
			// svg.appendChild(focus);

			focus.style('display', 'block');
			focus.attr("transform", "translate(" + xScale( new Date(d.date)) + "," + yScale(d[key]) + ")");
			focus.select("text").text(d[key]);
		}
	}
}
