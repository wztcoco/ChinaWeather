;!function (win, $, undefined) {
	var SVGMap1 = (function () {
		function SVGMap1(dom, options) {
			this.dom = dom;
			this.setOptions(options);
			this.render();
		}
		SVGMap1.prototype.options = {
			mapName: 'china',
			mapWidth: 500,
			mapHeight: 400,
			stateColorList: ['2770B5', '429DD4', '5AABDA', '1C8DFF', '70B3DD', 'C6E1F4', 'EDF2F6'],
			stateDataAttr: ['stateInitColor', 'stateHoverColor', 'stateSelectedColor', 'baifenbi'],
			stateDataType: 'json',
			stateSettingsXmlPath: '',
			stateData: {},

			strokeWidth: 1,
			strokeColor: 'F9FCFE',

			stateInitColor: 'AAD5FF',
			stateHoverColor: 'feb41c',
			stateSelectedColor: 'E32F02',
			stateDisabledColor: 'eeeeee',

			showTip: true,
			stateTipWidth: 100,
			//stateTipHeight: 50,
			stateTipX: 0,
			stateTipY: -10,
			stateTipHtml: function (stateData, obj) {
				return obj.name;
			},

			hoverCallback: function (stateData, obj) {},
			clickCallback: function (stateData, obj) {},
			external: false
		};

		SVGMap1.prototype.setOptions = function (options) {
			if (options == null) {
				options = null;
			}
			this.options = $.extend({}, this.options, options);
			return this;
		};

		SVGMap1.prototype.scaleRaphael = function (container, width, height) {
			var wrapper = document.getElementById(container);
			if (!wrapper.style.position) wrapper.style.position = "relative";
			wrapper.style.width = width + "px";
			wrapper.style.height = height + "px";
			wrapper.style.overflow = "hidden";
			var nestedWrapper;
			if (Raphael.type == "VML") {
				wrapper.innerHTML = "<rvml:group style='position : absolute; width: 1000px; height: 1000px; top: 0px; left: 0px' coordsize='1000,1000' class='rvml' id='vmlgroup_" + container + "'><\/rvml:group>";
				nestedWrapper = document.getElementById("vmlgroup_" + container);
			} else {
				wrapper.innerHTML = '<div class="svggroup"></div>';
				nestedWrapper = wrapper.getElementsByClassName("svggroup")[0];
			}
			var paper = new Raphael(nestedWrapper, width, height);
			var vmlDiv;
			if (Raphael.type == "SVG") {
				paper.canvas.setAttribute("viewBox", "0 0 " + width + " " + height);
			} else {
				vmlDiv = wrapper.getElementsByTagName("div")[0];
			}
			paper.changeSize = function (w, h, center, clipping) {
				clipping = !clipping;
				var ratioW = w / width;
				var ratioH = h / height;
				var scale = ratioW < ratioH ? ratioW : ratioH;
				var newHeight = parseInt(height * scale);
				var newWidth = parseInt(width * scale);
				if (Raphael.type == "VML") {
					var txt = document.getElementsByTagName("textpath");
					for (var i in txt) {
						var curr = txt[i];
						if (curr.style) {
							if (!curr._fontSize) {
								var mod = curr.style.font.split("px");
								curr._fontSize = parseInt(mod[0]);
								curr._font = mod[1];
							}
							curr.style.font = curr._fontSize * scale + "px" + curr._font;
						}
					}
					var newSize;
					if (newWidth < newHeight) {
						newSize = newWidth * 1000 / width;
					} else {
						newSize = newHeight * 1000 / height;
					}
					newSize = parseInt(newSize);
					nestedWrapper.style.width = newSize + "px";
					nestedWrapper.style.height = newSize + "px";
					if (clipping) {
						nestedWrapper.style.left = parseInt((w - newWidth) / 2) + "px";
						nestedWrapper.style.top = parseInt((h - newHeight) / 2) + "px";
					}
					vmlDiv.style.overflow = "visible";
				}
				if (clipping) {
					newWidth = w;
					newHeight = h;
				}
				wrapper.style.width = newWidth + "px";
				wrapper.style.height = newHeight + "px";
				paper.setSize(newWidth, newHeight);
				if (center) {
					wrapper.style.position = "absolute";
					wrapper.style.left = parseInt((w - newWidth) / 2) + "px";
					wrapper.style.top = parseInt((h - newHeight) / 2) + "px";
				}
			};
			paper.scaleAll = function (amount) {
				paper.changeSize(width * amount, height * amount);
			};
			paper.changeSize(width, height);
			paper.w = width;
			paper.h = height;
			return paper;
		};

		SVGMap1.prototype.render = function () {
			var opt = this.options,
				_self = this.dom,
				mapName = opt.mapName,
				mapConfig = eval(mapName + 'MapConfig');

			var stateData = {};

			if (opt.stateDataType == 'xml') {
				var mapSettings = opt.stateSettingsXmlPath;
				$.ajax({
					type: 'GET',
					url: mapSettings,
					async: false,
					dataType: $.browser.msie ? 'text' : 'xml',
					success: function (data) {
						var xml;
						if ($.browser.msie) {
							xml = new ActiveXObject('Microsoft.XMLDOM');
							xml.async = false;
							xml.loadXML(data);
						} else {
							xml = data;
						}
						var $xml = $(xml);
						$xml.find('stateData').each(function (i) {
							var $node = $(this),
								stateName = $node.attr('stateName');

							stateData[stateName] = {};
							// var attrs = $node[0].attributes;
							// alert(attrs);
							// for(var i in attrs){
							//     stateData[stateName][attrs[i].name] = attrs[i].value;
							// }
							for (var i = 0, len = opt.stateDataAttr.length; i < len; i++) {
								stateData[stateName][opt.stateDataAttr[i]] = $node.attr(opt.stateDataAttr[i]);
							}
						});
					}
				});
			} else {
				stateData = opt.stateData;
			};

			var offsetXY = function (e) {
					var mouseX, mouseY, tipWidth = $('.stateTip').outerWidth(),
						tipHeight = $('.stateTip').outerHeight();
					if (e && e.pageX) {
						mouseX = e.pageX;
						mouseY = e.pageY;
					} else {
						mouseX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						mouseY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}
					mouseX = mouseX - tipWidth / 2 + opt.stateTipX < 0 ? 0 : mouseX - tipWidth / 2 + opt.stateTipX;
					mouseY = mouseY - tipHeight + opt.stateTipY < 0 ? mouseY - opt.stateTipY : mouseY - tipHeight + opt.stateTipY;
					return [mouseX, mouseY];
				};

			var current, reTimer;

			var r = this.scaleRaphael(_self.attr('id'), mapConfig.width, mapConfig.height),
				attributes = {
					fill: '#' + opt.stateInitColor,
					cursor: 'pointer',
					stroke: '#' + opt.strokeColor,
					'stroke-width': opt.strokeWidth,
					'stroke-linejoin': 'round'
				};

			var stateColor = {};

			for (var state in mapConfig.shapes) {
				var thisStateData = stateData[state],
					initColor = '#' + (thisStateData && opt.stateColorList[thisStateData.stateInitColor] || opt.stateInitColor),
					hoverColor = '#' + (thisStateData && thisStateData.stateHoverColor || opt.stateHoverColor),
					selectedColor = '#' + (thisStateData && thisStateData.stateSelectedColor || opt.stateSelectedColor),
					disabledColor = '#' + (thisStateData && thisStateData.stateDisabledColor || opt.stateDisabledColor);

				stateColor[state] = {};

				stateColor[state].initColor = initColor;
				stateColor[state].hoverColor = hoverColor;
				stateColor[state].selectedColor = selectedColor;

				var obj = r.path(mapConfig['shapes'][state]);
				obj.id = state;
				obj.name = mapConfig['names'][state];
				obj.attr(attributes);

				if (opt.external) {
					opt.external[obj.id] = obj;
				}

				if (stateData[state] && stateData[state].diabled) {
					obj.attr({
						fill: disabledColor,
						cursor: 'default'
					});
				} else {
					obj.attr({
						fill: initColor
					});

					obj.hover(function (e) {
						if (this != current) {
							this.animate({
								fill: stateColor[this.id].hoverColor
							}, 250);
						}
						if (opt.showTip) {
							clearTimeout(reTimer);
							if ($('.stateTip').length == 0) {
								$(document.body).append('<div class="stateTip"></div');
							}
							$('.stateTip').html(opt.stateTipHtml(stateData, this));
							var _offsetXY = new offsetXY(e);

							$('.stateTip').css({
								width: opt.stateTipWidth || 'auto',
								height: opt.stateTipHeight || 'auto',
								left: _offsetXY[0],
								top: _offsetXY[1]
							}).show();
						}

						opt.hoverCallback(stateData, this);
					});

					obj.mouseout(function () {
						if (this != current) {
							this.animate({
								fill: stateColor[this.id].initColor
							}, 250);
						}
						// $('.stateTip').hide();
						if (opt.showTip) {
							reTimer = setTimeout(function () {
								$('.stateTip').remove();
							}, 100);
						}
					});

					obj.mouseup(function (e) {
						if (current) {
							current.animate({
								fill: stateColor[current.id].initColor
							}, 250);
						}

						this.animate({
							fill: stateColor[this.id].selectedColor
						}, 250);

						current = this;
						opt.clickCallback(stateData, this);
					});
				}
				r.changeSize(opt.mapWidth, opt.mapHeight, false, false);
			}
			document.body.onmousemove = function (e) {
				var _offsetXY = new offsetXY(e);
				$('.stateTip').css({
					left: _offsetXY[0],
					top: _offsetXY[1]
				});
			};
		}
		return SVGMap1;
	})();

	$.fn.SVGMap1 = function (opts) {
		var $this = $(this),
			data = $this.data();

		if (data.SVGMap1) {
			delete data.SVGMap1;
		}
		if (opts !== false) {
			data.SVGMap1 = new SVGMap1($this, opts);
		}
		return data.SVGMap1;
	};
}(window, jQuery);
$(function () {
	// $.ajax({
	// 	url: projectName+'/idea123Action.do?method=getIdea123MapData&reportName='+reportName,
	// 	data: data,
	// 	dataType: 'json',
	// 	success: function(data){
	var data = {
		"jiangsu": {"value": "30.05%", "index": "1", "stateInitColor": "0"},
		"henan": {"value": "19.77%", "index": "2", "stateInitColor": "0"},
		"anhui": {"value": "10.85%", "index": "3", "stateInitColor": "0"},
		"zhejiang": {"value": "10.02%", "index": "4", "stateInitColor": "0"},
		"liaoning": {"value": "8.46%", "index": "5", "stateInitColor": "0"},
		"beijing": {"value": "4.04%", "index": "6", "stateInitColor": "1"},
		"hubei": {"value": "3.66%", "index": "7", "stateInitColor": "1"},
		"jilin": {"value": "2.56%", "index": "8", "stateInitColor": "1"},
		"shanghai": {"value": "2.47%", "index": "9", "stateInitColor": "1"},
		"guangxi": {"value": "2.3%", "index": "10", "stateInitColor": "1"},
		"sichuan": {"value": "1.48%", "index": "11", "stateInitColor": "2"},
		"guizhou": {"value": "0.99%", "index": "12", "stateInitColor": "2"},
		"hunan": {"value": "0.78%", "index": "13", "stateInitColor": "2"},
		"shandong": {"value": "0.7%", "index": "14", "stateInitColor": "2"},
		"guangdong": {"value": "0.44%", "index": "15", "stateInitColor": "2"},
		"jiangxi": {"value": "0.34%", "index": "16", "stateInitColor": "3"},
		"fujian": {"value": "0.27%", "index": "17", "stateInitColor": "3"},
		"yunnan": {"value": "0.23%", "index": "18", "stateInitColor": "3"},
		"hainan": {"value": "0.21%", "index": "19", "stateInitColor": "3"},
		"shanxi": {"value": "0.11%", "index": "20", "stateInitColor": "3"},
		"hebei": {"value": "0.11%", "index": "21", "stateInitColor": "4"},
		"neimongol": {"value": "0.04%", "index": "22", "stateInitColor": "4"},
		"tianjin": {"value": "0.04%", "index": "23", "stateInitColor": "4"},
		"gansu": {"value": "0.04%", "index": "24", "stateInitColor": "4"},
		"shaanxi": {"value": "0.02%", "index": "25", "stateInitColor": "4"},
		"macau": {"value": "0.0%", "index": "26", "stateInitColor": "7"},
		"hongkong": {"value": "0.0%", "index": "27", "stateInitColor": "7"},
		"taiwan": {"value": "0.0%", "index": "28", "stateInitColor": "7"},
		"qinghai": {"value": "0.0%", "index": "29", "stateInitColor": "7"},
		"xizang": {"value": "0.0%", "index": "30", "stateInitColor": "7"},
		"ningxia": {"value": "0.0%", "index": "31", "stateInitColor": "7"},
		"xinjiang": {"value": "0.0%", "index": "32", "stateInitColor": "7"},
		"heilongjiang": {"value": "0.0%", "index": "33", "stateInitColor": "7"},
		"chongqing": {"value": "0.0%", "index": "34", "stateInitColor": "7"}
	};
	var i = 1;
	for (k in data) {
		if (i <= 12) {
			var _cls = i < 4 ? 'active' : '';
			$('#MapControl .list1').append('<li name="' + k + '"><div class="mapInfo"><i class="' + _cls + '">' + (i++) + '</i><span>' + chinaMapConfig.names[k] + '</span><b>' + data[k].value + '</b></div></li>')
		} else if (i <= 24) {
			$('#MapControl .list2').append('<li name="' + k + '"><div class="mapInfo"><i>' + (i++) + '</i><span>' + chinaMapConfig.names[k] + '</span><b>' + data[k].value + '</b></div></li>')
		} else {
			$('#MapControl .list3').append('<li name="' + k + '"><div class="mapInfo"><i>' + (i++) + '</i><span>' + chinaMapConfig.names[k] + '</span><b>' + data[k].value + '</b></div></li>')
		}
	}

	var mapObj_1 = {};
	var stateColorList = ['003399', '0058B0', '0071E1', '1C8DFF', '51A8FF', '82C0FF', 'AAD5ee', 'AAD5FF'];

	$('#RegionMap1').SVGMap1({
		external: mapObj_1,
		mapName: 'china',
		mapWidth: 750,
		mapHeight: 750,
		stateData: data,
		// stateTipWidth: 118,
		// stateTipHeight: 47,
		// stateTipX: 2,
		// stateTipY: 0,
		stateTipHtml: function (mapData, obj) {
			var _value = mapData[obj.id].value;
			var _idx = mapData[obj.id].index;
			var active = '';
			_idx < 4 ? active = 'active' : active = '';
			var tipStr = '<div class="mapInfo"><i class="' + active + '">' + _idx + '</i><span>' + obj.name + '</span><b>' + _value + '</b></div>';
			return tipStr;
		}
	});
	$('#MapControl li').hover(function () {
		var thisName = $(this).attr('name');

		var thisHtml = $(this).html();
		$('#MapControl li').removeClass('select');
		$(this).addClass('select');
		$(document.body).append('<div id="StateTip"></div>');
		$('#StateTip').css({
			left: $(mapObj_1[thisName].node).offset().left - 50,
			top: $(mapObj_1[thisName].node).offset().top - 40
		}).html(thisHtml).show();
		mapObj_1[thisName].attr({
			fill: '#E99A4D'
		});
	}, function () {
		var thisName = $(this).attr('name');

		$('#StateTip').remove();
		$('#MapControl li').removeClass('select');
		mapObj_1[$(this).attr('name')].attr({
			fill: "#" + stateColorList[data[$(this).attr('name')].stateInitColor]
		});
	});

	$('#MapColor').show();
// 	}
// });

});
