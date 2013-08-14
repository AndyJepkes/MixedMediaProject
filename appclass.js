F2.Apps["com_markit_dailyactivereport"] = (function() {

    var App_Class = function(appConfig, appContent, root) {
    	// constructor
    	this.appConfig = appConfig;
    	this.appContent = appContent;
    	this.$root = $(root); //if you're using jQuery.
    };

    App_Class.prototype.init = function() {
        // perform init actions
        F2.log("Init called.")
		
		this._getActivityJSON();
    };
	
	App_Class.prototype._scatterPlot = function(json){
		$('#container').highcharts({
			chart: {
				type: 'bubble',
				zoomType: 'xy'
			},
			title: {
				text: 'Live-ish Activity Report'
			},
			xAxis: {
				title: {
					text: 'Past 24 Hours'
				}
			},
			yAxis: {
				title: {
					text: 'Cumulative Activity'
				}
			},
			series: this._getSeries(json)
		});
	};
	
	App_Class.prototype._getSeries = function(json){
		var activity = [];
		console.info(json.length);

		// Get 24 hours (720 2 minute intervals)
		var hours24 = 720;
		var startingPoint = json.length - hours24;
		var cumulativeActivity = 0;

		for(var i = startingPoint; i < json.length; i++){
			var obj = json[i];
			var dateTime = obj.time;
			var aDateTime = dateTime.split(" ");
			var time = aDateTime[1].replace(/:/g, "");

			cumulativeActivity += parseInt(obj.count);

			//console.log(time);
			
			//activity.push([time, parseInt(obj.count), parseInt(obj.interval)]);
			activity.push([i, cumulativeActivity, parseInt(obj.count)]);
		}
	 
		console.log(activity.length);
	 
		return [{ name: "today", data: activity }];
		//return this._getSimJSON();
	};

	App_Class.prototype._getSimJSON = function(){
		return [{
			    name: 'Yesterday',
				data: [[97,36,79],[94,74,60],[68,76,58],[64,87,56],[68,27,73],[74,99,42],[7,93,87],[51,69,40],[38,23,33],[57,86,31]]
			}, {
				name: 'Today',
				data: [[25,10,87],[2,75,59],[11,54,8],[86,55,93],[5,3,58],[90,63,44],[91,33,17],[97,3,56],[15,67,48],[54,25,81]]
			}];
	}
	
	App_Class.prototype._getActivityJSON = function(){
		var _self = this;
		
		$.ajax({
			dataType: "jsonp",
			async: false,
			jsonpCallback: 'jsonCallback',
			contentType: "application/json",
			url: "http://andyjepkes.com/API/?type=jsonp",
			success: function(data){ _self._scatterPlot(data);},
			error: function(){console.log("error");}
		});
	};

    return App_Class;
})();