const margins = { top: 40, right: 30, bottom: 50, left: 70};
const width = 900;
const height = 600;
const innerWidth = width - margins.left - margins.right;
const innerHeight = height - margins.top - margins.bottom;

let innerChartS;

const tooltipWidth = 65;
const tooltipHeight = 32;

//Set up colours globally
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

//Set up scales
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

const yScaleS = d3.scaleLinear();
const xScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal()


//Create a bin generator
const binGenerator = d3.bin()
    .value(d => d.energyConsumption)

const filters_screen = [
    {id: "all", label: "All", isActive: true},
    {id: "LED", label: "LED", isActive: false},
    {id: "LCD", label: "LCD", isActive: false},
    {id: "OLED", label: "OLED", isActive: false}
]