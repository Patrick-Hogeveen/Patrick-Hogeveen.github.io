// BarChart.js
import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Chart({ width, height, data }){
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black")
    }, [data]);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {
        
        const left_offset = 50
        const top_offset = 50;
        const bottom_offset = 50;
        const bar_width = (width-50)/data.length
        const spacing = 0.15 * bar_width;
        const bar_color= "#38CB56"
        const svg = d3.select(ref.current);
        svg.selectAll("*").remove();
        //X axis
        const scale = d3.scaleLinear()
        .domain([0, Math.max(...data)])
        .range([0, height - top_offset - bottom_offset]);

        //y axis
        const scale_y_axis = d3.scaleLinear()
            .domain([Math.max(...data), 0])
            .range([0, height -  bottom_offset]);

        function shadeColor(color, percent) {

            var R = parseInt(color.substring(1,3),16);
            var G = parseInt(color.substring(3,5),16);
            var B = parseInt(color.substring(5,7),16);
        
            R = parseInt(R * (100 + percent) / 100);
            G = parseInt(G * (100 + percent) / 100);
            B = parseInt(B * (100 + percent) / 100);
        
            R = (R<255)?R:255;  
            G = (G<255)?G:255;  
            B = (B<255)?B:255;  
        
            var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
            var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
            var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
        
            return "#"+RR+GG+BB;
        }

        

        
        
      
        

        const tooltip = d3.select("body")
            .append("div")
            .attr("class","d3-tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("padding", "15px")
            .style("background", "rgba(0,0,0,0.6)")
            .style("border-radius", "5px")
            .style("color", "#fff")
            .text("a simple tooltip");

        var selection = svg.selectAll("rect").data(data);
        var yScale = d3.scaleLinear()
                            .domain([0, d3.max(data)])
                            .range([0, height - top_offset]);
        
        selection
            .transition().duration(300)
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .style("border", "1px solid black")
            .attr("x", (d, i) => (i * bar_width)+50)
            .attr("y", (d) => height)
            .attr("width", bar_width)
            .attr("height", 0)
            .attr("fill", bar_color)
            
                .attr("height", (d) => yScale(d))
                .attr("y", (d) => height - yScale(d)-25)
            .on("mouseover", function(event, d) {
                    tooltip.html(`Data: ${d}`).style("visibility", "visible");
                    d3.select(this)
                    .attr("fill", shadeColor(bar_color, -15))
                
        
        
        }) 
            .on("mousemove", function(event){
                tooltip
                  .style("top", (event.pageY-10)+"px")
                  .style("left",(event.pageX+10)+"px");
              })
              .on("mouseout", function() {
                tooltip.html(``).style("visibility", "hidden");
                d3.select(this).attr("fill", bar_color);
              });
    
        selection
            .exit()
            .transition().duration(300)
                .attr("y", (d) => height)
                .attr("height", 0)
            .remove()

        var xAxis = svg.selectAll("g")
            .data(data)
            .enter()
            .append("text")
            .attr("dominant-baseline", "text-before-edge")
            .attr("text-anchor", "middle")
            .attr("fill", "#FFFFFF")
            .attr("x", (d, i) => left_offset + bar_width * i + bar_width/2 - spacing/2)
            .attr("y", 600 - bottom_offset + 30)
            .attr("style", "font-family:Verdana")
            .text((d,i) => i)
            .attr("font-size", '7px')
            
        var yAxis = svg.append("g")
            .attr("transform", "translate(0," + +(25) + ")")
            .attr("color", "white")
            .call(d3.axisRight(scale_y_axis));

        
        //Unimplemented Zoom function
        var zoom = d3.zoom()
                    .scaleExtent([1,20])
                    .extent([0,0],[width,height])
                    .on("zoom", updateChart);

        function updateChart(e) {

            // recover the new scale
            var newX = e.transform.rescaleX(scale);
            var newY = e.transform.rescaleY(scale_y_axis);

            // update axes with these new boundaries
            xAxis.call(d3.axisBottom(newX))
            yAxis.call(d3.axisLeft(newY))

            // update circle position
            selection
            .selectAll("rect")
            .attr('x', function(d) {return newX(d.Sepal_Length)})
            .attr('y', function(d) {return newY(d.Petal_Length)});
        }
        /*
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .attr('transform', 'translate(' + 50 + ',' + 25 + ')')
            .call(zoom);
            */
    }


    return (
        <div className="chart">
            <svg ref={ref}>
            </svg>
        </div>
        
    )

}

export default Chart;