const drawHistogram = (data) => {
    //Set the dimensions and margins of the chart area
    const svg = d3.select("#histogram")
        .append("svg")
        .attr("viewBox", `0 0 ${width} ${height}`)

    //Create inner chart group with margins
    const innerChart = svg.append("g")
        .attr("transform", `translate(${margins.left}, ${margins.top})`);
    
    const bins = binGenerator(data);

    console.log(bins);

    const minEng = bins[0].x0;
    const maxEng = bins[bins.length - 1].x1;

    const binsMaxLength = d3.max(bins, d => d.length);

    console.log("MinEng:", minEng, "MaxEng:", maxEng, "BinsMaxLength:", binsMaxLength);

    xScale
        .domain([minEng, maxEng])
        .range([0, innerWidth]);

    yScale
        .domain([0, binsMaxLength])
        .range([innerHeight, 0])
        .nice();

    innerChart
        .selectAll("rect")
        .data(bins)
        .join("rect")
            .attr("x", d => xScale(d.x0))
            .attr("y", d => yScale(d.length))
            .attr("width", d => Math.max(0, xScale(d.x1) - xScale(d.x0)))
            .attr("height", d => innerHeight - yScale(d.length))
            .attr("fill", barColor)
            .attr("stroke", bodyBackgroundColor)
            .attr("stroke-width", 2);
    
    const bottomAxis = d3.axisBottom(xScale);
    innerChart.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .call(bottomAxis);
    
    const leftAxis = d3.axisLeft(yScale);
    innerChart.append("g")
        .call(leftAxis);
};



