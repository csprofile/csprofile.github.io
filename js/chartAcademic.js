function drawChart2(){
	var xCategories = function(){
		var years = [];
		for(x = 0 ; x <= new Date().getFullYear() - 1987 ; x++){
			years.push(1987 + x);
		}
		return years;
	}
	
	Highcharts.theme = {
	   colors: ["#2b908f", "#90ee7e", "#f45b5b", "#7798BF", "#aaeeee", "#ff0066", "#eeaaee",
		  "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
	   
	   title: {
		  style: {
			 color: '#E0E0E3',
			 textTransform: 'uppercase',
			 fontSize: '20px'
		  }
	   },
	   subtitle: {
		  style: {
			 color: '#E0E0E3'
		  }
	   },
	   xAxis: {
		  gridLineColor: '#707073',
		  labels: {
			 style: {
				color: '#E0E0E3'
			 }
		  },
		  lineColor: '#707073',
		  minorGridLineColor: '#505053',
		  tickColor: '#707073',
		  title: {
			 style: {
				color: '#A0A0A3'

			 }
		  }
	   },
	   yAxis: {
		  gridLineColor: '#707073',
		  labels: {
			 style: {
				color: '#E0E0E3'
			 }
		  },
		  lineColor: '#707073',
		  minorGridLineColor: '#505053',
		  tickColor: '#707073',
		  tickWidth: 1,
		  title: {
			 style: {
				color: '#A0A0A3'
			 }
		  }
	   },
	   tooltip: {
		  backgroundColor: 'rgba(0, 0, 0, 0.85)',
		  style: {
			 color: '#F0F0F0'
		  }
	   },
	   plotOptions: {
		  series: {
			 dataLabels: {
				color: '#B0B0B3'
			 },
			 marker: {
				lineColor: '#333'
			 }
		  },
		  boxplot: {
			 fillColor: '#505053'
		  },
		  candlestick: {
			 lineColor: 'white'
		  },
		  errorbar: {
			 color: 'white'
		  }
	   },
	   legend: {
		  itemStyle: {
			 color: '#E0E0E3'
		  },
		  itemHoverStyle: {
			 color: '#FFF'
		  },
		  itemHiddenStyle: {
			 color: '#606063'
		  }
	   },
	   credits: {
		  style: {
			 color: '#666'
		  }
	   },
	   labels: {
		  style: {
			 color: '#707073'
		  }
	   },

	   drilldown: {
		  activeAxisLabelStyle: {
			 color: '#F0F0F3'
		  },
		  activeDataLabelStyle: {
			 color: '#F0F0F3'
		  }
	   },

	   navigation: {
		  buttonOptions: {
			 symbolStroke: '#DDDDDD',
			 theme: {
				fill: '#505053'
			 }
		  }
	   },

	   // scroll charts
	   rangeSelector: {
		  buttonTheme: {
			 fill: '#505053',
			 stroke: '#000000',
			 style: {
				color: '#CCC'
			 },
			 states: {
				hover: {
				   fill: '#707073',
				   stroke: '#000000',
				   style: {
					  color: 'white'
				   }
				},
				select: {
				   fill: '#000003',
				   stroke: '#000000',
				   style: {
					  color: 'white'
				   }
				}
			 }
		  },
		  inputBoxBorderColor: '#505053',
		  inputStyle: {
			 backgroundColor: '#333',
			 color: 'silver'
		  },
		  labelStyle: {
			 color: 'silver'
		  }
	   },

	   navigator: {
		  handles: {
			 backgroundColor: '#666',
			 borderColor: '#AAA'
		  },
		  outlineColor: '#CCC',
		  maskFill: 'rgba(255,255,255,0.1)',
		  series: {
			 color: '#7798BF',
			 lineColor: '#A6C7ED'
		  },
		  xAxis: {
			 gridLineColor: '#505053'
		  }
	   },

	   scrollbar: {
		  barBackgroundColor: '#808083',
		  barBorderColor: '#808083',
		  buttonArrowColor: '#CCC',
		  buttonBackgroundColor: '#606063',
		  buttonBorderColor: '#606063',
		  rifleColor: '#FFF',
		  trackBackgroundColor: '#404043',
		  trackBorderColor: '#404043'
	   },

	   // special colors for some of the
	   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	   background2: '#505053',
	   dataLabelsColor: '#B0B0B3',
	   textColor: '#C0C0C0',
	   contrastTextColor: '#F0F0F3',
	   maskColor: 'rgba(255,255,255,0.3)'
	};
	
	Highcharts.setOptions(Highcharts.theme);
	
	$('#chartContainer2').highcharts({
		 plotOptions: {
			series: {
				animation: false
			}
		},
		chart: {
		  alignTicks: true,
		  type: 'scatter',
		  backgroundColor: 'transparent'
		},
		credits: {enabled: false},
		legend: {enabled: false},
		title: {text: 'ACHIEVEMENTS AND ACADEMIC'},
		subtitle: {text: 'Everything that helped me to be what I am today.'},
		xAxis: {
			categories: xCategories()
			,allowDecimals:false
		},
		tooltip: {
            formatter: function () {
                return this.x + ' - ' + this.series.yAxis.categories[this.point.y];
            }
        },
		yAxis: {
			labels: {
				style: {
				  fontSize: '9px',
				  width: '175px'
				}
			}
			,categories: [''
				,'Cris was born'
				,'First Video Game'
				,'First day of school'
				,'First English class'
				,'First Physics class'
				,'First Music class'
				,'First HTML page'
				,'First project sold'
				,'Start of band'
				,'First job'
				,'Technician Degree'
				,'Oracle 10g'
				,'Moved to SP'
				,'Big project sold'
				,'Microsoft - 6236'
				,'Microsoft - 6235'
				,'Microsoft - 6234'
				,'Married'
				,'Start own enterprise'
				,'Technologist Degree'
				,'First multinational project'
				,'Coach training'
				,'Practical Hypnosis Training'
				,'Moved to Canada'
				,'Learning how to Learn - McMaster University'
			],
			title: {text: ''}
		},
		series: [{
			lineWidth: 2,
			data: [
				{x:0, y:1}
				,{x:6, y:2}
				,{x:6, y:3}
				,{x:9, y:4}
				,{x:10, y:5}
				,{x:10, y:6}
				,{x:13, y:7}
				,{x:13, y:8}
				,{x:16, y:9}
				,{x:17, y:10}
				,{x:21, y:11}
				,{x:21, y:12}
				,{x:25, y:13}
				,{x:25, y:14}
				,{x:25, y:15}
				,{x:25, y:16}
				,{x:25, y:17}
				,{x:25, y:18}
				,{x:26, y:19}
				,{x:27, y:20}
				,{x:28, y:21}
				,{x:29, y:22}
				,{x:31, y:23}
				,{x:31, y:24}
				,{x:32, y:25}
			]
		}]	
	});
}