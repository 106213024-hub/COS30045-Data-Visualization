const drawScatterplot = (data) => {
    const svg = d3.select("#scatterplot")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)

    innerChartS = svg
        .append("g")
        .attr("transform", `translate(${margins.left}, ${margins.top})`);
    
    const maxStarRating = d3.max(data, d => +d.star);
    const maxEnergyConsumption = d3.max(data, d => +d.energyConsumption);

    xScaleS
        .domain([0, maxStarRating])
        .range([0, innerWidth]);

    yScaleS
        .domain([0, maxEnergyConsumption])
        .range([innerHeight, 0])
        .nice();

    colorScale
        .domain(data.map(d => d.screenTech))
        .range(d3.schemeCategory10);

    innerChartS
        .selectAll("circle")
        .data(data)
        .join("circle")
            .attr("cx", d => xScaleS(d.star))
            .attr("cy", d => yScaleS(d.energyConsumption))
            .attr("r", 5)
            .attr("fill", d => colorScale(d.screenTech))
            .attr("opacity", 0.5);

            const bottomAxis = d3.axisBottom(xScaleS);
 
    innerChartS
        .append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);

    const leftAxis = d3.axisLeft(yScaleS);
 
    innerChartS
        .append("g")
        .call(leftAxis);

    innerChartS
        .append("text")
        .attr("x", innerWidth)
        .attr("y", innerHeight + 40)
        .attr("text-anchor", "end")
        .text("Star Rating");

    innerChartS
        .append("text")
        .attr("x", -40)
        .attr("y", -15)
        .attr("text-anchor", "start")
        .text("Labelled Energy Consumption (kWh/year)");

    const legend = svg
        .append("g")
        .attr("transform", `translate(${width - 100}, ${margins.top})`)
    
    colorScale.domain().forEach((screenTech, i) => {
        const legendRow = legend
            .append("g")
            .attr("transform", `translate(0, ${i * 20})`);

        legendRow.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill", colorScale(screenTech));
        
        legendRow.append("text")
            .attr("x", 20)
            .attr("y", 10)
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle")
            .text(screenTech)
    });

}