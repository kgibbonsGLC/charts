var ColorPicker = {
    heading1: '#2271a2', //getColor(34, 113, 162),
    heading2: '#314766', //getColor(49, 71, 102),
    heading3: '#2271a2', //getColor(34, 113, 162),
    heading4: '#2271a2', //getColor(34, 113, 162),
    heading5: '#333333', //getColor(51, 51, 51),
    heading6: '#314766', //getColor(49, 71, 102),
    body: '#333333', //getColor(51, 51, 51),
    body_resource: '#333333', //getColor(51, 51, 51),

    blue_header: '#2b4e7c', //getColor(43, 78, 124),
    green_selection_whtbg: '#6db227', //getColor(109, 178, 39),
    green_selection_dkbg: '#b8e986', //getColor(184, 233, 134),
    orange_selection: '#f7b141', //getColor(247, 177, 65),
    grey_menu: '#dddddd', //getColor(221, 221, 221),
    infographic_bg: '#d8e2db', //getColor(216, 226, 235),
    slideshow_arrow: '#9b9b9b', //getColor(155, 155, 155),

    blue1: '#1c2d5a', //getColor(28, 45, 90),
    blue2: '#afdfe4', //getColor(175, 223, 228),
    blue3: '#7eb4d2', //getColor(126, 111, 247),
    blue4: '#7ed3f7', //getColor(126, 211, 247),
    blue5: '#188ccc', //getColor(24, 140, 204),
    blue6: '#00b0e6', //getColor(0, 176, 230),
    blue7: '#1b75ba', //getColor(30, 117, 186),

    target_red: '#ff0000', //getColor(206, 0, 0),
};

var xAxis = ["2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016"];

var metrics = {
    "TP_L": "Annual TP Loading",
    "DRP_L": "Annual DRP Loading",
    "TP_FWMC": "Annual TP FWMC",
    "DRP_FWMC": "Annual DRP FWMC",
    "Discharge": "Annual Discharge",
    "TP_L_S": "Spring TP Loading",
    "DRP_L_S": "Spring DRP Loading",
    "TP_FWMS_S": "Spring TP FWMC",
    "DRP_FWMC_S": "Spring DRP FWMC",
    "Discharge_S": "Spring Discharge"
}

var units = {
    "TP_L": "Metric Tons",
    "DRP_L": "Metric Tons",
    "TP_FWMC": "milligrams / liter",
    "DRP_FWMC": "milligrams / liter",
    "Discharge": "million cubic meters",
    "TP_L_S": "Metric Tons",
    "DRP_L_S": "Metric Tons",
    "TP_FWMS_S": "milligrams / liter",
    "DRP_FWMC_S": "milligrams / liter",
    "Discharge_S": "million cubic meters"
}

var maumee_targets = {
    "DRP_L_S": 186,
}

function BA_Charts(){}
// BA_Charts.prototype.data;

BA_Charts.prototype.init = function(filename){
    var watershed = {
        name: name,
        TPloading: {
            name: 'Annual TP Loading',
            unit: 'Metric Tons',
            series: []
        },
        DRPloading: {
            name: 'Annual DRP Loading',
            unit: 'Metric Tons',
            series: []
        },
        TPFWMC: {
            name: 'Annual TP FWMC',
            unit: 'mg/L',
            series: []
        },
        DRPFWMC: {
            name: 'Annual DRP FWMC',
            unit: 'mg/L',
            series: []
        },
        discharge: {
            name: 'Annual Discharge',
            unit: 'Million Cubic Meters',
            series: []
        },
        TPloading_S: {
            name: 'Spring TP Loading',
            unit: 'Metric Tons',
            series: []
        },
        DRPloading_S: {
            name: 'Spring DRP Loading',
            unit: 'Metric Tons',
            series: []
        },
        TPFWMC_S: {
            name: 'Spring TP FWMC',
            unit: 'mg/L',
            series: []
        },
        DRPFWMC_S: {
            name: 'Spring DRP FWMC',
            unit: 'mg/L',
            series: []
        },
        discharge_S: {
            name: 'Spring Discharge',
            unit: 'Million Cubic Meters',
            series: []
        },
        addToFraction: function (name, year, val) {
            switch (name) {
                case this.TPloading.name:
                    this.TPloading.series.splice(year - 2008, 0, (val));
                    break;
                case this.DRPloading.name:
                    this.DRPloading.series.splice(year - 2008, 0, (val));
                    break;
                case this.TPFWMC.name:
                    this.TPFWMC.series.splice(year - 2008, 0, (val));
                    break;
                case this.DRPFWMC.name:
                    this.DRPFWMC.series.splice(year - 2008, 0, (val));
                    break;
                case this.discharge.name:
                    this.discharge.series.splice(year - 2008, 0, (val));
                    break;
                case this.TPloading_S.name:
                    this.TPloading_S.series.splice(year - 2008, 0, val);
                    break;
                case this.DRPloading_S.name:
                    this.DRPloading_S.series.splice(year - 2008, 0, val);
                    break;
                case this.TPFWMC_S.name:
                    this.TPFWMC_S.series.splice(year - 2008, 0, val);
                    break;
                case this.DRPFWMC_S.name:
                    this.DRPFWMC_S.series.splice(year - 2008, 0, val);
                    break;
                case this.discharge_S.name:
                    this.discharge_S.series.splice(year - 2008, 0, val);
                    break;
                default:
                    alert(name + ' ' + year + ' ' + val);
            }
        }
    };

    d3.csv(filename, function (in_file) {
        in_file.forEach(function (obj) {
            watershed.addToFraction(obj.Fraction, parseInt(obj.Year), parseFloat(obj.Value));
        });
        var chart;
        switch (chartType) {
            case 'line':
                /**
                 * Default starting value for line chart is 0
                 */
                chart = createLineChart(eleID, watershed.name, watershed[fraction], ColorPicker.blue7, bgimage);
                // chart = createLineChart(eleID, watershed[fraction].series, watershed[fraction].name, watershed[fraction].unit, watershed[fraction].name, watershed[fraction].unit, ColorPicker.blue1);
                // if(startingVal!==undefined){
                //     chart = createLineChart_start(eleID, watershed.name, watershed[fraction], ColorPicker.blue7, startingVal);
                // }else{
                //     chart = createLineChart(eleID, watershed.name, watershed[fraction], ColorPicker.blue7);
                // }
                break;
            case 'column':
                // chart = createColumnChart(eleID, watershed[fraction].series, watershed[fraction].name, watershed[fraction].unit, watershed[fraction].name, watershed[fraction].unit, ColorPicker.blue2);
                chart = createColumnChart2(eleID, watershed.name, watershed[fraction], ColorPicker.blue7, bgimage);
                break;
            // case '':
            //     chart = createColumnChart2(eleID, watershed.name, watershed[fraction], ColorPicker.blue3);
            //     break;
        }
        ;
        if (target) {
            addTargetLine(chart, target, 'line');
        }
    });
    return watershed;
}

function loadWatershedsData(filename){
    var data;

    /// NEED TO CHANGE THE DATASET. COMBINE ALL FOUR WATERSHED DATA THEN CONVERT TO A JSON
    $.getJSON("data/all_data.json", function(d){
       data = d;
    });

    return data;
}

function getWatershedMetric(in_data, w_name, metric){
    var vals = $(in_data).filter(function(i, n){
        return n.River===w_name && n.Fraction===metric
    })
    vals.sort(function(a, b){
        return (a.Year > b.Year) ? 1 : ((a.Year < b.Year) ? -1 : 0);
    });
    return vals;
}

function createChart(div, type, series_name, data, color, title, unit, isBgImg=1, target=0, target_color=ColorPicker.target_red){
    var o = createOptions(type, series_name, data, color, title, unit, isBgImg);
    var chart = Highcharts.chart(div, o);
    if(target){
        addTargetLine(chart, target, target_color);
    }
    return chart;
}

function createColumnChart(){

}

function createOptions(type, series_name, data, color, title, unit, isBgImg){
    Highcharts.setOptions({
        lang: {
            numericSymbols: null,
            thousandsSep: ','
        }

    });
    return {
        chart: {
            type: type,
            width: undefined, //chart_width,
            height: undefined, //chart_height,
            style: {
                fontFamily: 'Montserrat, sans-serif',
                color: ColorPicker.body
            },
            // backgroundColor: '#00ff00'
            /**
             * The following events is for watermark
             */
            events: {
                load: function () {
                    // this.renderer.image("https://c1.staticflickr.com/5/4382/36578347693_3c6032000b_o.png", 0, 0, chart_width, chart_height).add();   //red watermark
                    if (isBgImg) {
                        this.renderer.image("https://c1.staticflickr.com/5/4514/23628988768_984b3f3343_o.png", this.plotLeft, this.plotTop, this.plotWidth, this.plotHeight).add(); //grey watermark
                    }
                }
            }
        },
        title: {
            text: title,
            style: {
                color: ColorPicker.body
            }
        },
        credits: {
            enabled: false,
            // href: "http://www.glc.org",
            // text: "Great Lakes Commission"
        },
        xAxis: {
            categories: xAxis,
            title: {
                text: 'Year',
                style: {
                    color: ColorPicker.body
                }
            },
            // lineColor: '#ff0000'
        },
        yAxis: {
            title: {
                text: unit,
                style: {
                    color: ColorPicker.body
                }
            },
            // lineColor: '#ff0000',
            // lineWidth: 2
        },
        series: [{
            name: series_name,
            unit: unit,
            data: data,
            color: color
        }],

    };
}

function addTargetLine(chart, target, color) {
    chart.addSeries({
        type: 'line',
        data: createTargetSeries(target),
        name: 'Target',
        color: color,
        lineWidth: 3,
        marker: {
            radius: 0
        },
    })
};

function createTargetSeries(val) {
    var s = [];
    xAxis.map(function () {
        s.push(val)
    });
    return s;
};