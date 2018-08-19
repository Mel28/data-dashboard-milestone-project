queue()
   .defer(d3.csv, "data/wise.csv")
   .await(makeGraphs);
   
function makeGraphs(error, wiseData) {
    var ndx = crossfilter(wiseData);
       
    show_discoveryYear(ndx);
    show_PHA_data(ndx);
       
    show_hMag_to_period_correlation(ndx);
    
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
      .width(400)
      .height(300)
      .margins({top: 10, right: 50, bottom: 30, left: 50})
      .dimension(dim)
      .group(group)
      .transitionDuration(500)
      .x(d3.scale.ordinal())
      .xUnits(dc.units.ordinal)
      .xAxisLabel("PHA")
      .yAxis().ticks(20);
}
   
function show_hMag_to_period_correlation(ndx) {
    
     var PHAColors = d3.scale.ordinal()
        .domain(["Y", "N", "n/a"])
        .range(["red", "green", "yellow"]);
    var periodDim = ndx.dimension(dc.pluck('period'));
     var period_dim = ndx.dimension(function(d){
        return [d.hMag, d.period, d.PHA];
    });
    
   var periodGroup = periodDim.group();
    var min_period = periodDim.bottom(1)[0].period;
    var max_period = periodDim.top(1)[0].period;
    
     /**var hMagDim = ndx.dimension(dc.pluck('hMag'));
     var hMag_dim = ndx.dimension(function(d){
        return [d.hMag, d.period, d.PHA];
    });
     var hMagGroup = hMagDim.group();
    var min_hMag = hMagDim.bottom(1)[0].hMag;
    var max_hMag = hMagDim.top(1)[0].hMag;**/

    dc.scatterPlot("#orbit-correlation")
        .width(768)
        .height(480)
        .x(d3.time.scale().domain([min_period,max_period]))
        /**.y(d3.scale.linear().domain([min_hMag,max_hMag]))**/
        .brushOn(false)
        .symbolSize(8)
        .clipPadding(10)
        .yAxisLabel("H Magnitude")
        .xAxisLabel("Orbital Period")
        .dimension(period_dim)
        .group(group)
}

function show_class(ndx){

var class_dim = ndx.dimension(dc.pluck('class'));
var total_asterids_per_class = class_dim.group();
dc.pieChart('#orbit-class-chart')
            .height(330)
            .radius(90)
            .transitionDuration(1500)
            .dimension(class_dim)
            .group(total_asterids_per_class);

}



