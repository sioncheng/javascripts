/***
a few simple code to simulate the basica function of requireJS
***/

var simpleRequireDict = {};

var simpleRequire = function(name,callback){

	function loadComplete(){
		simpleRequireDict[name].module = simpleRequireDict[name].defCallback();
		simpleRequireDict[name].status = 'completed';


		var cb;
		while(cb = simpleRequireDict[name].requireCallbacks.shift()){
			cb(simpleRequireDict[name].module);
		}


	}

	if(!simpleRequireDict[name]){
		simpleRequireDict[name] = {};
		simpleRequireDict[name].status = '';
    }
		//load
		
	if(simpleRequireDict[name].status === '') {
		simpleRequireDict[name].status = 'loading';

		if(!simpleRequireDict[name].requireCallbacks){
			simpleRequireDict[name].requireCallbacks = [];
			simpleRequireDict[name].requireCallbacks.push(callback);
		}


		console.log('try to load ' + name);


		var script = document.createElement('SCRIPT');
		script.type = 'text/javascript';
		script.async = true;
		script.src = name + '.js';

		if(script.attachEvent){
			script.attachEvent('onreadystatechange',loadComplete);
		}
		else{
			script.addEventListener('load',loadComplete,false);
		}

		document.getElementsByTagName('HEAD')[0].appendChild(script);

	}
	else if(simpleRequireDict[name].status === 'loading'){
		simpleRequireDict[name].requireCallbacks.push(callback);
	}
	else{
		callback(simpleRequireDict[name].module);
	}
	
}

var simpleDefine = function(name,callback){

	if(!simpleRequireDict[name]){
		simpleRequireDict[name] = {};
    }

	if(!simpleRequireDict[name].defCallback){
		simpleRequireDict[name].defCallback = callback;
	}

}