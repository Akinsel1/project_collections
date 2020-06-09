document.addEventListener("DOMContentLoaded", test);

const url = 'http://openlibrary.org/subjects/';

function test(){
    
//button invoke JSON
    var button = document.getElementById("submit")
    .addEventListener("click", function(){
        var value = document.getElementById("input").value.toLowerCase();
        value = value.replace(/\s+/g, '_');
        document.getElementById("title").innerHTML = "Number of editions in "+value;
        
        //clear graph
        document.getElementById('graph').innerHTML = "";
        //queue in data
        d3.queue()
            .defer(d3.json, url+ value + '/works.json')
            .await(ready)
        
        //document.getElementById('submit').setAttribute('disabled',true);
    })
    
}

//JSON data operations
function ready (error, dataset){
    var width = 700;  
    var height = 500;
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    
//Bubble chart set up  
    var bubble = d3.pack()
       .size([width, height])
       .padding(1.5);
    
   var svg = d3.select("#graph")
       .append("svg")
       .attr("width", 800)
       .attr("height", 600)
        .attr("transform", "translate(0,0)")
       .attr("class", "bubble");
    
//formulas
    var radiusScale = d3.scaleSqrt().domain([100,1100]).range([20, 80]);
    var fontScale= d3.scaleLinear().domain([0,80]).range([0,40]);
    var forceX = d3.forceX(width /2).strength(0.5);
    var forceY = d3.forceY(height /2).strength(0.5);
    
//simulation  
    var simulation = d3.forceSimulation()
        .force('x', forceX)
        .force('y', forceY)
        .force('collide', d3.forceCollide(function(d) {
            return radiusScale(d.edition_count)+3;
        }))
    
//Bubble
        var circles = svg.selectAll('.works')
            .data(dataset.works)
            .enter().append('circle')
            .attr('class','title')
            .attr('r', function(d) {
                if(d.edition_count < 100)
                    return 10
                else
                    return radiusScale(d.edition_count)
            })
            .style('fill', function(d, i) {
                if(d.edition_count<100)
                    return 'cyan'
                else
                    return color(i)
            })
            .on('mouseover', function(){
                tooltip.style('display', null);
            })
            .on('mouseout', function(){
                tooltip.style('display', 'none')
            })
            .on('mousemove', function(d){
                var posx = d3.mouse(this)[0] -15;
                var posy = d3.mouse(this)[1] -55;
                var index = Math.floor(Math.random() * d.subject.length);
                tooltip.attr('transform', 'translate(' +posx+ ',' +posy+ ')');
                tooltip.select('text').text('Subject:' +d.subject[index]);
                
            });
//text       
        var labels = svg.selectAll('.works')
            .data(dataset.works)
            .enter().append('text')
            .text(function(d) {
                return d.title
            })
            .style("text-anchor", "middle")
            .attr("font-family",  "Gill Sans", "Gill Sans MT")
            .attr('font-size', function(d){
                if(d.title.length > 15){
                    return 10
                }
                else{
                    return fontScale(radiusScale(d.edition_count))
                }
            }) 
        
//Tooltip
        var tooltip = svg.append('g')
            .attr("class", "tooltip")
            .style('display', 'none')
        
        tooltip.append('text')
            .attr('x', 15)
            .attr('dy', '1.2em')
            .style('font-size', '1.25em')

        console.log(dataset.works);
        
        simulation.nodes(dataset.works)
            .on('tick', ticked)
        
        function ticked(){
            circles
                .attr('cx', function(d) {
                    return d.x
                })
                .attr('cy', function(d) {
                    return d.y
                })
            labels
                .attr('x', function(d) {
                    return d.x
                })
                .attr('y', function(d){
                    return d.y
                })
        }
    
    }
//Source for Bubble Chart: https://www.youtube.com/watch?v=lPr60pexvEM
//Source for attribute and styling: https://bl.ocks.org/alokkshukla/3d6be4be0ef9f6977ec6718b2916d168      