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


var svg = d3.select('#linechart').append('svg').attr('height', '500px').attr('width', '500px');

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

var xScale = d3.scaleTime()
	.domain([ new Date(xExtent[0]), new Date(xExtent[1]) ])
	.range([40,495]);

var yScale = d3.scaleLinear()
	.domain([yMin, yMax])
	.range([460,240]);


var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg.append('g')
	.attr('id', 'xAxisG')
	.attr('transform', 'translate(0,460)')
	.call(xAxis);

svg.append('g')
	.attr('id', 'yAxisG')
	.attr('transform', 'translate(40,0)')
	.call(yAxis);

var color = d3.scaleOrdinal()
    .range(['#FF4848', '#FF9C42', '#FFF06A', '#24E0FB', '#36F200']);

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

		var path = svg.append('g').append('path')
			.attr('d', line(data))
			.attr('fill', 'none')
			.attr('stroke', function(d) { return color(key); }) //'#36F200')
			.attr('stroke-width', 2);

		var totalLength = path.node().getTotalLength();

		path
			.attr("stroke-dasharray", totalLength + " " + totalLength)
			.attr("stroke-dashoffset", totalLength)
			.transition()
			.duration(2000)
		    .ease(d3.easeCubicInOut)
			.attr("stroke-dashoffset", 0);

		svg.append('g')
			.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('fill', function(d) { return color(key); }) //'#24E0FB')
			.attr('r', 0)
			.attr('cx', function(d, i) {
				return xScale(new Date(d.date));
			})
			.attr('cy', function(d, i) {
				return yScale(d[key]);
			})
			.on('mouseover', function(d, i) {
				d3.select(this)
					.transition()
					.duration(300)
					.attr('r', 50);
			})
			.on('mouseleave', function(d, i) {
				d3.select(this)
					.transition()
					.duration(300)
					.attr('r', 2);
			})
			.transition()
			.duration(500)
			.delay(1800)
			.attr('r', 3)
			.transition()
			.duration(500)
			.attr('r', 2);
	}

}
