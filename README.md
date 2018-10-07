<h1> NASA's WISE Mission Data Dashboard Project</h1>
<p> Welcome to my second mile stone project. For this project, I was asked to produce
a data dashboard using data of my choice. The data was to be interactive and well visually
represented using different graphs available with d3.min.js and dc.min.js. </p>
<p> The first thing I wanted to show with the data was how many Potentially Hazardous Asteroids
were logged during the mission compared to how many non hazardous asteroids were logged. I managed 
to represent this data as a bar chart using a dc bar chart and locating  it in a graphs.js file.
I wanted to make the data more interactive so I added in a selector where you can select which year
of the mission's data you would like to look at. I achieved this by using a dc selectMenu, located in 
the graph.js file. </p>
<p> The second graph I wanted to show was the different orbital classes of the asteroids discovered.
I represented this using a dc.piechart located in the graph.js file. The pie chart also changes with 
the selector menu, so you can look at the different orbital classes of the asteroids found in a specific
year. </p>
<p> In all cases, the data used to form the graphs has been plucked from the wise.csv file, which was imported
from the NASA data portal. </p>