define('hahah',function(){
	
	function o(){
		var i = 100 ;

		this.getI = function(){
			return i ;
		}

		this.setI = function(iv){
			i = iv ;
		}
	}

	return (new o());
});