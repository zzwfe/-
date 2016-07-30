var Linkage = {
	provinces: document.getElementById('provinces'),
	citys: document.getElementById('citys'),
	datas: linkDatas,

	isArray: function(arr) {      
      return Object.prototype.toString.call(arr) === '[object Array]';       
 	},

	addOptions: function(target, options){
		var optionEle = null,
			target = target,
			options = options;
			if(!this.isArray(options)){
				return 
			}
		var optionLen = options.length,
			fragment = document.createDocumentFragment();
		for(var i=0; i<optionLen; i++){
			optionEle = document.createElement('option');
			optionEle.value = options[i].value;
			if(optionEle.innerText){
				optionEle.innerText = options[i].text;
			}else{
				optionEle.textContent = options[i].text;
			}
			fragment.appendChild(optionEle);
		}
		target.appendChild(fragment);
	},

	provincesCitysLink: function(province, city){
		var provinces = this.datas.provinces,
			citys = this.datas.citys,
			provincesWrap = [];
		for(var i=0; i < provinces.length; i++){
			provincesWrap.push({
				'text': provinces[i].name,
				'value': provinces[i].code
			});
		}

		this.addOptions(province, provincesWrap);
		this.addOptions(city, [{
			'text': citys[0],
			'value': citys[0]
		}]);
	},

	init: function(){
		var self = this;
		if(self.provinces && self.citys){
			self.provincesCitysLink(self.provinces, self.citys);

			self.provinces.addEventListener('change', function(e){
				/*this已经指向为select DOM对象*/
				self.citys.innerHTML = '';
				var selectedCity = self.datas.citys[this.value];
				if(!self.isArray(selectedCity)){
					return 
				}
				var citysLen = selectedCity.length,
					citysBox = [];
				for(var i = 0; i < citysLen; i++){
					citysBox.push({
						'text': selectedCity[i],
						'value': selectedCity[i]
					});
				}
				self.addOptions(self.citys, citysBox);
			})
		}
	}

}

Linkage.init();
