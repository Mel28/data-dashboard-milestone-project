queue()
   .defer(d3.csv, "data/wise.csv")
   .await(makeGraphs);
   
   function makeGraphs(error, wiseData) {
       var ndx = crossfilter(wiseData);
       
       show_Discovery_Year(ndx);
       show_PHA_data(ndx);
       
       show_Orbit_Class_to_period_correlation(ndx);
       
       dc.renderAll();
   }
   
   function show_Discovery_Year(ndx) {
       dim = ndx.dimension(dc.pluck('Discovery Year'));
       group = dim.group()
       
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
   
   function  show_period_to_Orbit_Class_correlation(ndx) {
           var yearDim = ndx.dimension(dc.pluck("period"));
           var classDim = ndx.dimension(function(d) {
               return [d.period, d.class];
           });
           var OrbitClassGroup = classDim.group();
           
           var minYear = yearDim.bottom(1)[0].period;
           var maxYear = yearDim.top(1)[0].period;
           
           dc.scatterPlot("#orbit-correlation")
           .width(800)
           .height(400)
           .x(d3.scale.linear().domain([minYear, maxYear]))
           .brushOn(false)
           .symbolSize(8)
           .clipPadding(10)
           .yAxisLabel("Orbit Class")
           .title(function(d){
               return "number of yeas in a period" + d.key[0];
           })
           
   }
   
   
   
   
   
   