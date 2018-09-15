queue()
   .defer(d3.csv, "data/wise.csv")
  .await(makeGraphs);
  
  function makeGraphs(error, wiseData) {
    var ndx = crossfilter(wiseData);
      
    show_discoveryYear(ndx);
    show_PHA_data(ndx);
       
    show_class(ndx);
    
    dc.renderAll();
    
}
   
function show_discoveryYear(ndx) {
    dim = ndx.dimension(dc.pluck('discoveryYear'));
    group = dim.group();
    
    dc.selectMenu("#discovery-year-selector")
    .dimension(dim)
    .group(group);
}
   
function show_PHA_data(ndx) {
    var dim = ndx.dimension(dc.pluck('PHA'));
    var group = dim.group();
       
    dc.barChart("#PHA-data")
      .width(500)
      .height(400)
      .margins({top: 10, right: 50, bottom: 30, left: 50})
      .dimension(dim)
      .group(group)
      .transitionDuration(500)
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .xAxisLabel("PHA")
      .yAxis().ticks(20);
}
   


function show_class(ndx) {

var class_dim = ndx.dimension(dc.pluck('class'));
var total_asteroids_per_class = class_dim.group();
dc.pieChart('#orbit-class-chart')
            .height(530)
            .radius(290)
            .transitionDuration(1500)
            .dimension(class_dim)
            .group(total_asteroids_per_class);

}
