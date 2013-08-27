F2.Apps["com_markit_dailyactivereport"] = (function() {

    var App_Class = function(appConfig, appContent, root) {
    	// constructor
    	this.appConfig = appConfig;
    	this.appContent = appContent;
    	this.$root = $(root); //if you're using jQuery.
    };

    App_Class.prototype.init = function() {
		// The app init gets call in registerApps
		// Let's find out if we have the right app state when we get to this point.
		console.info($('#MixedMediaProject')); // We Do!


		//this.dataset = [].push(this._getActivityReportJSON());
		this._getActivityReportJSON();
		//console.info(this.dataset);
		
    };

	App_Class.prototype.start = function() {
		console.info('start it!');
	}

	App_Class.prototype._initChart = function(data) {
		var h = 400;
    	var w = 970;
		
		console.info('Do we have the app ready?');
		console.info($('div.theApp'));


        var svg = d3.select(".theApp")
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
		   .attr("cy", 150)
		   .attr("r", function(d) {
			   return 2;
		   })
		   .transition()
		   .duration(1000)
		   .attr('cx', function(d, i) {
		   		return i + 20;
		   })
		   .transition()
		   .duration(2000)
		   .attr("r", function(d) {
			   return .5*(d.count);
		   });
	}
	
	App_Class.prototype._getActivityReportJSON = function(){
		var _self = this;
		
        //F2.log('got jquery');
        
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