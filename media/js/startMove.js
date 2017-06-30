function startMove(obj, json, func){
	clearInterval(obj.timer);

	obj.timer = setInterval(function(){
		var bStop = true;  //判断是否到达目的值，假设都到达目的值了

		for(var attr in json){
			//1、取出当前的值
			var iCur = 0;
			if(attr == "opacity"){
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			}else{
				iCur = parseInt(getStyle(obj, attr));
			}
			//2、计算速度
			var speed = (json[attr] - iCur) / 8;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(iCur != json[attr]){
				bStop = false; //只要有一个样式没有到达目的值，就是false
			}

			if(attr == "opacity"){
				iCur += speed;
				obj.style.filter = "alpha(opacity=" + iCur + ")";
				obj.style.opacity = iCur / 100;
			}else{
				obj.style[attr] = iCur + speed + "px";
			}
			
		}

		if(bStop){ //说明所有动画都到达目的值了
			clearInterval(obj.timer);
			if(func){
				func();
			}
		}	

	}, 30);
}