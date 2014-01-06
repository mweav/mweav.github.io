var size = 500;
var transTime = 1500;
var pauseTime = 100;

var width = size;
    height = size;

var margin = {top: 50, right: 50, bottom: 50, left: 50};

var color = d3.scale.ordinal()
  .range(colorbrewer.RdYlBu[3]);
var loc = 0;

var data1 = [ [ [.067, .25], [.5, 0], [.5, .5] ],       //Top Left
  [ [.933, .25], [.5, 0], [.5, .5] ],                   //Top Right
  [ [.067, .25], [.067, .75], [.5, .5] ],               //Mid Left
  [ [.933, .25], [.933, .75], [.5, .5] ],               //Mid Right
  [ [.067, .75], [.5, 1], [.5, .5] ],                   //Bottom Left
  [ [.933, .75], [.5, 1], [.5, .5] ] ];                 //Bottom Right

var data2 = [ [ [.125, .284], [.5, .5], [.5, .5] ],      //Top Left
  [ [.875, .284], [.5, .5], [.5, .5] ],                  //Top Right
  [ [.125, .284], [.5, .5], [.5, .5] ],                  //Mid Left
  [ [.875, .284], [.5, .5], [.5, .5] ],                  //Mid Right
  [ [.5, .5], [.5, .933], [.5, .5] ],                      //Bottom Left
  [ [.5, .5], [.5, .933], [.5, .5] ] ];                    //Bottom Right

var data3 = [ [ [.5, .5], [.5, .067], [.5, .5] ],          //Top Left
  [ [.5, .5], [.5, .067], [.5, .5] ],                      //Top Right
  [ [.5, .5], [.125, .716], [.5, .5] ],                  //Mid Left
  [ [.5, .5], [.875, .716], [.5, .5] ],                  //Mid Right
  [ [.125, .716], [.5, .5], [.5, .5] ],                  //Bottom Left
  [ [.875, .716], [.5, .5], [.5, .5] ] ];                //Bottom Right

var dbool = false;

var svg = d3.select("#flexagon").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  svg.selectAll(".tri")
    .data(data1)
  .enter().append("polygon")
    .attr("class", ".tri")
    .attr("points", function (d) {
      var t = "";
      for(var i = 0; i < 3; i++)
        t += (d[i][0]*size + "," + d[i][1]*size + " ");
      return t;
    })
    .style("fill", color(loc))
    .style("stroke", "#000000")
    .style("stroke-width", "1")
    .on("click", function (d) {
      var dat = data2;
      if(dbool == true)
      {
        dat = data3;
        dbool = false;
      }
      else
        dbool = true;

      svg.selectAll("polygon")
        .data(dat)
      .transition()
        .attr("points", function (d) {
          var t = "";
          for(var i = 0; i < 3; i++)
            t += (d[i][0]*size + "," + d[i][1]*size + " ");
          return t;
        })
        .style("fill", color(loc))
        .duration(transTime);

      loc++;
      loc %= 3;

       svg.selectAll("polygon")
         .data(dat)
       .transition()
        .attr("points", function (d) {
          var t = "";
          for(var i = 0; i < 3; i++)
            t += (d[i][0]*size + "," + d[i][1]*size + " ");
          return t;
        })
        .style("fill", color(loc))
        .delay(transTime)
        .duration(pauseTime);

      svg.selectAll("polygon")
        .data(data1)
      .transition()
        .attr("points", function (d) {
          var t = "";
          for(var i = 0; i < 3; i++)
            t += (d[i][0]*size + "," + d[i][1]*size + " ");
          return t;
        })
        .style("fill", color(loc))
        .delay(transTime + pauseTime)
        .duration(transTime);        
    });

var text = ["Click below to transform the tri-hexaflexagon"];

svg.selectAll(".title")
  .data(text)
.enter().append("text")
  .attr("x", size/2)
  .attr("y", -20)
  .attr("text-anchor", "middle")
  .text(function (d) { return d; } )