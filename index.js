import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";


console.log("test");

// Setting up the svg element for D3 to draw in
let width = window.innerWidth;
let height = window.innerHeight;
let svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height);

let europeProjection = d3.geoMercator()
  .center([4, 50.9])
  .scale([width / 0.16])
  .translate([width / 2, height / 2]);



let pathGenerator = d3.geoPath().projection(europeProjection)

d3.json("nutsrg_0.json").then(geojson => {
  // Tell D3 to render a path for each GeoJSON feature

  // let geojson2 = geojson.features.filter( function(d){return d.properties.LEVL_CODE ==1} )
  // console.log(geojson2)
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "#399AAA");

  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator) // This is where the magic happens
    .attr("stroke", function (d) {
      if (d.properties.id.includes('BE') && d.properties.id.length != 2) {
        return 'white';
      }
      else {
        return "grey"
      }
    }) // Color of the lines themselves
    .attr("stroke-width", 1)
    .attr("fill", function (d) {
      if (d.properties.id == "BE22") {
        return "red";
      }
      if (d.properties.id.includes('BE') && d.properties.id.length != 2) {
        return 'white';
      }
      else if (d.properties.id.includes('BE') && d.properties.id.length == 2) {
        return 'none'
      }
      else {
        return "white"
      }
    })
});



let pathGenerator2 = d3.geoPath().projection(europeProjection)

d3.json("ods124_live_load.json").then(geojson => {
  // Tell D3 to render a path for each GeoJSON feature
  console.log(geojson)

  // let geojson2 = geojson.features.filter( function(d){return d.properties.LEVL_CODE ==1} )
  // console.log(geojson2)




  // console.log(element.assetgeographiclocation.geometry.coordinates)
  // console.log(europeProjection2(element.assetgeographiclocation.geometry.coordinates[0]))
  // console.log(europeProjection2(element.assetgeographiclocation.geometry.coordinates[1]))

  // svg2.append("polyline")
  // .attr("points",europeProjection2())
  // .style("stroke", "black");

  let features = [];
  geojson.forEach(element => {
    features.push(element.assetgeographiclocation);
  });
  console.log(features);

  svg.append("g").selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", pathGenerator2)
    .attr("stroke", "green") // Color of the lines themselves
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", ("5,3"))
    .attr("fill", "none") // Color uses to fill in the lines


  // console.log(geojson.length)

});





