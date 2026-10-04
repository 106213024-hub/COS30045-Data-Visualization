d3.csv("data/Screensize_Category_Data.csv", d => {
    return {
        ScreenCategory: d.Screensize_Category,
        Count: +d.Count
    }
}).then(data => {
    console.log(data);
    drawDonutChart(data);
})

const drawDonutChart = (data) => {
    const width = 1000;
    const height = 500;
    const radius = Math.min(width, height) / 2 - 20;

    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.ScreenCategory))
        .range(d3.schemeSet2);

    const pie = d3.pie()
        .value(d => d.Count)
        .sort(null);

    const arcGenerator = d3.arc()
        .innerRadius(radius * 0.6)
        .outerRadius(radius * 1)
        .padAngle(0.02)
        .cornerRadius(6);

    const svg = d3.select("#donut-chart")
        .append("svg")
        .attr("viewBox", `0, 0, ${width}, ${height}`)
        .style("border", "1px solid black");

    const innerChart = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    innerChart
        .selectAll("path")
        .data(pie(data))
        .join("path")
            .attr("d", arcGenerator)
            .attr("fill", d => color(d.data.ScreenCategory))
            .attr("stroke", "white")
            .attr("stroke-width", 2);
    
    innerChart
        .selectAll(".label")
        .data(pie(data))
        .join("text")
            .attr("class", "label")
            .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .text(d => d.data.ScreenCategory);
}