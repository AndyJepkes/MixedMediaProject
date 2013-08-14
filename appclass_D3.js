F2.Apps["com_markit_dailyactivereport"] = (function() {

    var App_Class = function(appConfig, appContent, root) {
    	// constructor
    	this.appConfig = appConfig;
    	this.appContent = appContent;
    	this.$root = $(root); //if you're using jQuery.
    };

    App_Class.prototype.init = function() {
		F2.log('init class now');
    	//this.dataset = [].push(this._getActivityReportJSON());
		this._getActivityReportJSON();
		//console.info(this.dataset);
		
    };

	App_Class.prototype._initChart = function(data) {
		var h = 400;
    	var w = 800;

        var svg = d3.select(".mmp")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

		svg.selectAll("circle")
		   .data(data)
		   .enter()
		   .append("circle")
		   .attr("cx", function(d, i) {
		   		return 40 + i * 40;
		   })
		   .attr("cy", h)
		   .attr("r", function(d) {
			   return d.count;
		   })
		   .transition()
		   .duration(2000)
		   .attr("cy", function(d) {
			   return d.y;
		   });
	}
	
	App_Class.prototype._getActivityReportJSON = function(){
		var _self = this;
		
		$.ajax({
			dataType: "jsonp",
			async: false,
			jsonpCallback: 'jsonCallback',
			contentType: "application/json",
			url: "http://andyjepkes.com/API/?type=jsonp",
			success: function(data){ _self._initChart(data); },
			error: function(){console.log("error");}
		});
	};

    return App_Class;
})();