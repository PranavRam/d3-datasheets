function evidenceBox(){
	var width = 200;
	var height = 250;
	// var styleSheet = evidenceStyleSheet();
	var styles = {}
	// var stylesheet = null;

	function chart(selection){
		selection.each(function(d){
			var div = d3.select(this).attr('class', 'container');
			var header = div.select('.header');
			if(header.empty()){
				header = div.append('div').attr('class', 'header');
			}
			var body = div.select('.body');
			if(body.empty()){
				body = div.append('div').attr('class', 'body');
			}

			// div
			// 	.call(stylesheet, 'container');
			// header
			// 	.on('click', function(d){
			// 		d3.select(this)
			// 			.call(stylesheet, 
			// 				'header', {
			// 					'background-color': 'black'
			// 				})
			// 	})
			// 	.call(stylesheet, 'header');
			// body
			// 	.call(stylesheet, 'body');

		})
	}

	chart.styles = function(value, overwrite){
		if(!arguments.length) return styles;
		if(overwrite){
			d3.stylize.merge(styles, value);
		}
		else {
			styles = value;
		}
		return chart
	}

	chart.stylesheet = function(value){
		if(!arguments.length) return stylsheet;
		stylesheet = value;
		return chart
	}

	chart.width = function(value){
		if(!arguments.length) return width;
		width = value;
		return chart;
	}

	// chart.prototype = stylize;
	return chart;
}

var container = d3.select('#chart');
var evidenceStyleSheet = d3.stylesheet('EvidenceStylesheet')
													 .styles({
															'.container': {
																width: 200 + 'px',
																height: 250 + 'px',
																border: 'black 2px solid',
																display: 'inline-block',
																margin: '0 0 0 10px',
																'.column': {

																}
															},
															'.header': {
																height: 44 + 'px',
																'background-color': function(d,i){
																	if(i % 2 === 0){
																		return 'blue'
																	}
																	return 'orange';
																},
															},
															'.body': {
																height: 206 + 'px',
																'background-color': 'green'
															}
														});
var evidenceStyleSheetClick = d3.stylesheet('EvidenceStylesheetClick')
																.inheritFrom(evidenceStyleSheet)
																.styles({
																	'.header':{
																		'background-color': 'black'
																	}
																})
var eb = evidenceBox();

// container
// 	.style({
// 		width: 500 + 'px',
// 		height: 500 + 'px',
// 	});

container
	.selectAll('div.evidence')
	.data([0, 1])
	.enter()
	.append('div')
	.attr('class', 'evidence')
	.call(eb);

container.call(evidenceStyleSheet);

container.selectAll('.header')
					.on('click', function(d, i){
						// debugger;
						d3.select(this.parentNode).call(evidenceStyleSheetClick)
					})