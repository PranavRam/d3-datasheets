(function () {
	function datasheet(name){
		var styles = {};
		var methods = {};
		var config = {
			styles: styles,
			methods: methods
		}

		function applyStyleHelper(selection, root, selector){
			var temp = {};
			_.forOwn(root, function(value, key) {
			  if(!_.isPlainObject(value)){
			  	temp[key] = value;
			  }
			  else {
			  	var currentSelector = _.trim((selector || '') + key);
			  	applyStyleHelper(selection, root[key], 
			  		currentSelector);
			  }
			});
			if(selector){
				selection.selectAll(selector)
									.style(temp);
			}
		}


		function includesObjectStyle(includes, key){
			var found = -1;
			_.forEach(includes, function(st, i){
				if(_.isPlainObject(st)){
					if(_.indexOf(_.keys(st),key) > -1){
						found = i;
					}
				}
			});
			return found;
		}

		function setupStyles(st, includes){
			_.forOwn(st, function(value, key, obj){
				if(_.isPlainObject(value)){
					var objStyleLoc = includesObjectStyle(includes, key);
			  	if(_.indexOf(includes, key) > -1){
			  		setupStyles(st[key], includes);
			  	}
			  	else if(objStyleLoc > -1){
			  		_.merge(obj, includes[objStyleLoc]);
			  	}
			  	else {
			  		delete obj[key];
			  		// return;
			  	}
			  }
			})
		}

		function style(selection, props){
			// if(!styles[styleType]) return;
			// if(!styleType) return;
			var tempStyles = styles;
			if(props){
				if(_.isArray(props)){
					tempStyles = _.cloneDeep(styles);
					setupStyles(tempStyles, props);
					console.log(tempStyles);
				}
				else if(_.isPlainObject(props)){
					tempStyles = props;
				}
			}
			// debugger;
			applyStyleHelper(selection, tempStyles, null);
			// selection.each(function(d){
			// 	var el = d3.select(this);
			// 	var st = _.cloneDeep(styles[styleType]);
			// 	if(props){
			// 		_.merge(st, props)
			// 	}
			// 	el.style(st);
			// })
		}

		style.inheritFrom = function(stylesheet){
			_.merge(styles, stylesheet.styles());
			return style;
		}

		style.styles = function(value){
			if(!arguments.length) return styles;
			_.merge(styles, value);
			return style;
		}
		
		return style;
	};

	d3.stylesheet = datasheet;
})();