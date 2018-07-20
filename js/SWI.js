function SWI(){
    this.swi_data;

    this.showcaseWatershed = ["04050003", "04040003", "04050006", "04090004", "04110002", "04100011", "04100009"];

    this.init = function(data){
        this.swi_data = data.map(function (d){
            d.timestamp = Date.parse(d.ActivityStartDate + " " + d["ActivityStartTime.Time"]);
            return d;
        });
        Highcharts.setOptions({
            lang: {
                numericSymbols: null,
                thousandsSep: ',',
                // viewData: null
            }
        });
        Highcharts.Chart.prototype.viewData = function () {
            if (!this.insertedTable) {
                var div = document.createElement('div');
                div.className = 'highcharts-data-table';
                // Insert after the chart container
                this.renderTo.parentNode.insertBefore(div, this.renderTo.nextSibling);
                div.innerHTML = this.getTable();
                this.insertedTable = true;
                var date_str = new Date().getTime().toString();
                var rand_str = Math.floor(Math.random() * (1000000)).toString();
                this.insertedTableID = 'div_' + date_str + rand_str
                div.id = this.insertedTableID;
            }
            else {
                $('#' + this.insertedTableID).toggle();
            }
        };
    };

    this.getMonitoringNitrateData = function(locationID){
        var result = {
            values: [],
            dates: [],
            set: []
        };
        var vals = $(this.swi_data).filter(function(i, n) {
            return n.LocID == locationID;
            // n.River===(watershedName)&& n.Fraction===metricName /*&& n.Value !== ""*/ // n.River===w_name
        });
        vals.sort(function(a, b){
            return (a.timestamp > b.timestamp) ? 1 : ((a.timestamp < b.timestamp) ? -1 : 0);
        });

        vals.map(function (v){
            // result.values.push(vals[v].ResultMeasureValue);

            // result.dates.push(Date.parse(vals[v].ActivityStartDate));
            result.set.push([vals[v].timestamp, vals[v].ResultMeasureValue])
        } );

        return result;
    };

    this.buildPopupContent = function (){
        return '<p><i><b>Watershed Name</b></i>: {HUC8Name}</p><br>' +
            '<p><i><b>HUC 8 Code</b></i>: {HUC8}</p><br>' +
            '<p><i><b>Monitoring Location ID</b></i>: {LocID}</p><br>' +
            '<p><i><b>Monitoring Location Name</b></i>: {LocName}</p>'
    }


}