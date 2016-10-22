//Fix highcharts reset problem
var HCDefaults = $.extend(true, {}, Highcharts.getOptions(), {});

$(function () {
	var StartWrongOrientation = false;
	
	//Go to top always
	window.scrollTo(0, 0);
	
	//Close navbar mobile onclick
	$(document).on('click','.navbar-collapse.in',function(e) {
		if( $(e.target).is('a') ) {
			$(this).collapse('hide');
		}
	});
	
	//Detect screen rotation on load
	if(window.orientation == 90 || window.orientation == -90){
		$("#mobileRotation").modal('show');
		StartWrongOrientation = true;
	}
	
	//Detect screen rotation after load
	var supportsOrientationChange = "onorientationchange" in window;
	var	orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

	window.addEventListener(orientationEvent, function() {
		if(window.orientation == 90 || window.orientation == -90){
			$("#mobileRotation").modal('show');
		}else{
			if(StartWrongOrientation){
				windowResize();
			}else{
				$('#mobileRotation').modal('hide');
			}
		}
	}, false);
	
	
	$( window ).resize(function() {
		if(window.orientation == null){
			windowResize();
		}
	});
	
	
	setTimeout(function(){drawChart1()},20);
	setTimeout(function(){drawChart2()},20);

	function windowResize(){
		//Fix section height
		$(".sectionFixHeight").css({'height':$(window).height()});
		//Fix chart width
		$(".chartCols").css({"width":$(window).width()});
		if($("#chartContainer1").highcharts() != null){
			$("#chartContainer1").highcharts().destroy();
			$("#chartContainer2").highcharts().destroy();
			
			//Reset options
			var defaultOptions = Highcharts.getOptions();
			for (var prop in defaultOptions) {
				if (typeof defaultOptions[prop] !== 'function') delete defaultOptions[prop];
			}
			Highcharts.setOptions(HCDefaults);
			drawChart1();
			drawChart2();
		}
	}
	
	windowResize();

});