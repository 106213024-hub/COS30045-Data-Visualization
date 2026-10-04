const populateFilters = (data) => {

    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {

            filters_screen.forEach(filter => {
                filter.isActive = filter.id === d.id ? true : false;
            });

            d3.selectAll("#filters_screen .filter")
                .classed("active", filter => filter.id === d.id ? true : false);

            updateHistogram(d.id, data);
        });

    const updateHistogram = (filterId, data) => {
        const updatedData = filterId === "all" ? data : data.filter(tv => tv.screenTech === filterId)

            const updatedBins = binGenerator(updatedData);
            
            const newMax = d3.max(updatedBins, d => d.length);
            yScale
            .domain([0, newMax])
            .nice();
            
            d3.select("#histogram")
                .selectAll("rect")
                .data(updatedBins)
                .transition()
                    .duration(500)
                    .ease(d3.easeCubicInOut)
                    .attr("y", d => yScale(d.length))
                    .attr("height", d => innerHeight - yScale(d.length));
    };

}