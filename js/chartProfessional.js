function drawChart1(){
	
	chartParamRender = {
		datalabelDistance: $('#chartContainer1').width() < 1024 ? -5 : 2,
		datalabelText: $('#chartContainer1').width() < 1024 ? 'name' : 'fullName'
	}
	
	$('#chartContainer1').highcharts({
		credits: {enabled: false},
		chart: {
			polar: true,
			type: 'column',
			margin: [0, 0, 0, 0],
			spacingTop: 0,
			spacingBottom: 0,
			spacingLeft: 0,
			spacingRight: 0,
			backgroundColor:"#eee"
		},
		plotOptions: {
			series: {
				stacking: 'normal',
				shadow: false,
				groupPadding: 0,
				pointPlacement: 'on',
				size:"100%"
			}
		},
		title: {text: 'PROFESSIONAL AND SKILLS'},
		subtitle: {text: 'Strive not to be a success, but rather to be of value. "Albert Einstein"'},
		legend: {
			align: 'center',
			verticalAlign: 'bottom',
			layout: 'horizontal',
			enabled:true,
			itemStyle: {
				fontSize:'10px',
				color: '#555'
			},
			itemHoverStyle: {
				color: '#999'
			},
			itemHiddenStyle: {
				color: '#ddd'
			}
		},
		yAxis: {
			tickInterval:1,
			labels: {enabled: false},
			title: {text: null},
			endOnTick: false,
			maxPadding: 0
		},
		pane: {
			size: '50%'
		},
		xAxis: {
			categories: [
				'T-SQL',
				'C#',
				'Java',
				'PHP',
				'JS',
				'AngularJS',
				'CSS3',
				'HTML5',
				'C',
				'Team Lead',
				'English',
				'DBA'
			],
			labels: {enabled: true, distance:5},
			crosshair: true
		},
		series: [
			{
				name: 'EXPERT',
				color: '#90ED7D',
				data: [1,0,0,0,1,1,0,0,0,0,0,0],
				legendIndex:3
			},{
				name: 'ADVANCED',
				color: '#7CB5EC',
				data: [1,1,0,1,1,1,1,1,0,0,1,1],
				legendIndex:2
			},{
				name: 'INTERMEDIATE',
				color: '#8085E9',
				data: [1,1,0,1,1,1,1,1,0,1,1,1],
				legendIndex:1
			},{
				name: 'BEGGINER',
				color: '#E4D354',
				data: [1,1,1,1,1,1,1,1,1,1,1,1],
				legendIndex:0
			},{
				name: 'CENTER',
				color: 'transparent',
				id:'photoPlaceHolder',
				data: [3,3,3,3,3,3,3,3,3,3,3,3],
				showInLegend: false
			},{
				type: 'pie',
				innerSize: '90%',
				size:'85%',
				data: [
					{fullName:'Numericon <br/> 2007 to 2010',  url:'', name:"Numericon", y:3, color:"#90ED7D", description:"<b>Numericon Manufacturing Systems</b><br/>2007 to 2010<br/>-Technical Support<br/>- Application Support<br/>- Database development"}
					,{fullName:'NC Systems <br/> 2011 to 2014', url:'http://ncsystems.com.br/', name:"NC", y:3, color:"#E4D354", description:"<b>NCSystems Production Management Systems</b><br/>2011 to 2014<br/>- Multiplatform systems development<br/>- Web development<br/>- DBA<br/>- Experience as team leader"}
					,{fullName:'Q3 Systems <br/> 2014 to 2016', url:'http://q3sistemas.com.br/', name:"Q3", y:2, color:"#8085E9", description:"<b>Q3 Performance Solutions</b><br/>2014 to 2016<br/>- Project management<br/>- Web development<br/>- System analysis"}
					,{fullName:'CWI Software <br/> 2015 to 2016', url:'http://www.cwi.com.br/Main/Index', name:"CWI", y:1, color:"#F7A35C", description:"<b>CWI Software</b><br/>2015 to 2016<br/>- T-SQL development<br/>- Reporting services development<br/>- DataBase analysis"}
					,{fullName:'QI Technical Schools <br/> 2015 to 2016', url:'http://qi.com.br/', name:'QI', y:1, color:'#7CB5EC', description:'<b>QI Technical Schools</b><br/>2015 to 2016<br/>Teacher of:<br/>- Programming logic<br/>- Web development I<br/>- Web development  II<br/>- Web development  III<br/>- DataBase I<br/>- DataBase II<br/>- DataBase III<br/>- Human relationships in organizations<br/>- Visual programming language'}
				],
					
				point: {
					events: {
						click: function(e) {
							//location.href = e.point.series.options.url; //proper path 2)
							e.preventDefault();
							console.log(e.point);
						}
					}
				},
				dataLabels: {
					enabled: true,
					distance:chartParamRender.datalabelDistance,
					formatter: function ()  {
						if(chartParamRender.datalabelText == 'fullName'){
							return this.point.fullName;
						}else{
							return this.point.name;
						}
					}
				}
			}
		],

		tooltip: {
			formatter: function() {
				var tooltipText;
				//console.log(this.point.y);
				if(this.point.stackTotal != null){
					switch(this.point.stackTotal){
						case 4:
							tooltipText = "BEGGINER";
							break;
						case 5:
							tooltipText = "INTERMEDIATE";
							break;
						case 6:
							tooltipText = "ADVANCED";
							break;
						default:
							tooltipText = "EXPERT";
							break;
					}
				}else{
					//tooltipText = this.point.y + ' Year(s)'
					tooltipText = this.point.description;
				}
				return tooltipText;
			}
		}
	},
	function(chart) { // on complete
		G_ChartProfessional = chart;
		var series = chart.get('photoPlaceHolder');
		var parent = $('#chartContainer1');
		var svgObj = $(".highcharts-series-" + series._i)[0];
		var svgCSS = getRelativeClientRect(svgObj, parent);
		
		img = chart.renderer
		.image('img/coverPic.png'
			,svgCSS.left + ((svgCSS.width*1000) * -0.5)
			,svgCSS.top + ((svgCSS.height*1000) * -0.5)
			,svgCSS.width*1000
			,svgCSS.height*1000
		)
		.attr({zIndex: 7, id:'photo'})
		.add();
	});
}