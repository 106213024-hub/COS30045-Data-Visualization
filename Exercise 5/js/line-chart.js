d3.csv("data/ARE_Spot_Prices.csv", d => {
    return {
        Year: +d.Year,
        Average_Price: +d["Average Price (notTas-Snowy)"]
    }
}).then(data => {
    data.sort((a, b) => a.Year - b.Year);
    console.log(data);
    drawLineChart(data);
})

const drawLineChart = (data) => {
    const margin = {top: 40, right: 170, bottom: 25, left: 40};
    const width = 1000;
    const height = 500;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Year))
        .range([0, innerWidth]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Average_Price)])
        .range([innerHeight, 0]);

    const bottomAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"));
    
    const leftAxis = d3.axisLeft(yScale);

    const svg = d3.select("#line-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    innerChart
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis)

    innerChart
        .append("g")
        .call(leftAxis);
    
    innerChart
        .append("text")
        .text("Average Price")
        .attr("x", -margin.left)
        .attr("y", -10)
        .attr("text-anchor", "start")

    innerChart
        .selectAll(".label")
        .data(data)
        .join("text")
        .attr("class", "label")
        .attr("x", d => xScale(d.Year))
        .attr("y", d => yScale(d.Average_Price) - 10)
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black")
        .text(d => Math.round(d.Average_Price));

    const lineGenerator = d3.line()
        .x(d => xScale(d.Year))
        .y(d => yScale(d.Average_Price));
    
    innerChart
        .append("path")
        .attr("d", lineGenerator(data))
        .attr("fill", "none")
        .attr("stroke", "green")

}