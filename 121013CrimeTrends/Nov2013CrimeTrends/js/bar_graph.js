var totalWidth = 480;
    totalHeight = 450;

var margin = {top: 20, right: 20, bottom: 60, left: 40},
    width = totalWidth - margin.left - margin.right,
    height = totalHeight - margin.top - margin.bottom;

//Margin between individual bars
var barMarg = 0;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .15);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");


var svg = d3.select("#bar_graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//INSERT FILE URL HERE!!!
d3.csv("data/data.csv", function(error, data) {
  var legendNames = d3.keys(data[0]).filter(function(key) { return key !== "Grouping"; });

  data.forEach(function(d) {
    d.nums = legendNames.map(function(name) { return {name: name, value: +d[name]}; });
  });

  var numColors = 2;

  var color = d3.scale.ordinal()
    .range(colorScheme.Blues[numColors]);

  //INSERT THE VALUE OF THE Y-AXIS HERE!!!
  var yVal = "Number of crimes";

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return yVal + ": <span style='color:" + color(d.name) + "'>" + d.value + "</span>";
  })

  svg.call(tip);

  x0.domain(data.map(function(d) { return d.Grouping; }));
  x1.domain(legendNames).rangeRoundBands([5, x0.rangeBand()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(d.nums, function(d) { return d.value; }); })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".6em")
      .style("text-anchor", "end")
      .text(yVal);

  var group = svg.selectAll(".group")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.Grouping) + ",0)"; });

  group.selectAll("rect")
      .data(function(d) { return d.nums; })
    .enter().append("rect")
      .attr("width", x1.rangeBand() - barMarg)
      .attr("x", function(d) { return x1(d.name) + barMarg/2; })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); })
      .on('mouseover', function(d) {
        tip.show(d);
        this.style.fill = d3.rgb(color(d.name)).darker(.5); })
      .on('mouseout', function(d) {
        tip.hide(d);
        this.style.fill=color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(legendNames.slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

  var insertLinebreaks = function (d){
    var el = d3.select(this);
    var words = d.split(' ');
    el.text('');

    for (var i = 0; i < words.length; i++) {
        var tspan = el.append('tspan').text(words[i]);
        if (i > 0)
            tspan.attr('x', 0).attr('dy', '15');
    }
  };
  
  svg.selectAll('g.x.axis g text').each(insertLinebreaks);
});