$(function(){
	/*顶部菜单登录*/
	$(".opt_warp").find(".opt_self").hover(function(){
		$(".user_wrap").css("display","block");
	},function(){
		$(".user_wrap").css("display","none");
	})

	/*顶部菜单购物车*/
	$(".opt_warp").find(".opt_shop").hover(function(){
		$(".shop_wrap").css("display","block");
	},function(){
		$(".shop_wrap").css("display","none");
	})


	/*侧边浮动框*/
	$(".side ul li").hover(function(){
		$(this).find(".sidebox").stop().animate({"width":"124px"},100).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#ae1c1c"})	
	},function(){
		$(this).find(".sidebox").stop().animate({"width":"54px"},100).css({"opacity":"0.8","filter":"Alpha(opacity=80)","background":"#000"})	
	});

	/*产品详情导航菜单*/
	$(".tabs_nav_wrap").find("li").click(function(){
		$(".tabs_nav_wrap").find("li").attr("class","");
		$(this).attr("class","active");

		$(".tabs_connect_inner").find(".act").css("display","none");
		$(".tabs_connect_inner").find(".act").eq($(this).index()).css("display","block");
	})

	/*放大图片对应*/
	$(".digest").find("li").hover(function(){
		$(".digest").find("li").attr("class","");
		$(this).attr("class","active");
		
		$(".showcase").find(".show_inner").css("display","none");
		$(".showcase").find(".show_inner").eq($(this).index()).css("display","block");

		$(".zoom_pic").find("img").css("display","none");
		$(".zoom_pic").find("img").eq($(this).index()).css("display","block");
		var ax=$(this).find("img").attr("src");
		$(".zoom_pic").find("img").attr("src",ax).css("display","block");

		// $(".ul_img").find("li").click(function(){
		// var Src = $(this).find("img").attr("src");
		// $(".zoom_pic").find("img").attr("src", Src);
	
	})

	/*放大镜*/
	$(".showcase").mouseover(function(){
		$(".zoom_pic").css("display","block");
		$(".dital_pic").css("display","block");
	})
	$(".showcase").mouseout(function(){
		$(".zoom_pic").css("display","none");
		$(".dital_pic").css("display","none");
	})

	var oMark = document.getElementsByClassName("showcase")[0];
	var oFloat = document.getElementsByClassName("dital_pic")[0];
	var oBig = document.getElementsByClassName("zoom_pic")[0];
	var oSmall = document.getElementsByClassName("showcase")[0];
	var oImg = oBig.getElementsByTagName("img")[0];

	oMark.onmousemove = function(even){
		var e = even || window.event;
		//让小块居中
		var l = e.clientX - oMark.offsetLeft - oSmall.offsetLeft - oFloat.offsetWidth / 2;
		var t = e.clientY - oMark.offsetTop - oSmall.offsetTop - oFloat.offsetHeight ;
		// document.title = l + ", " + t;

		//限制块不能出界
		if(l < 0){
			l = 0
		}else if(l > oMark.offsetWidth - oFloat.offsetWidth){
			l = oMark.offsetWidth - oFloat.offsetWidth;
		}

		if(t < 0){
			t = 0;
		}else if(t > oMark.offsetHeight - oFloat.offsetHeight){
			t = oMark.offsetHeight - oFloat.offsetHeight;
		}


		oFloat.style.left = l + "px";
		oFloat.style.top = t + "px";

		//让大的图片按比例进行移动
		//计算大图片和小图片的比例  按照比例来移动大图片的距离
		var percentX = l / (oMark.offsetWidth - oFloat.offsetWidth);
		var percentY = t / (oMark.offsetHeight - oFloat.offsetHeight);
		// document.title = percentX + ", " + percentY;

		oImg.style.left = -percentX * (oImg.offsetWidth - oBig.offsetWidth) + "px";
		oImg.style.top = -percentY * (oImg.offsetHeight - oBig.offsetHeight) + "px";	
	}

/*添加数量*/
	$(".goods_num_list").find(".minus").click(function(){
		var t=$(this).parent().find("input[class*=num]");
		t.val(parseInt(t.val())-1)
		if(parseInt(t.val())<0){
			t.val(0);
		}
	})
	$(".goods_num_list").find(".puls").click(function(){
		var t=$(this).parent().find("input[class*=num]");
		t.val(parseInt(t.val())+1)
		
	})


/*加入购物车*/
		$(".buy").on("click",".buy_btn",function(){
			// alert($(this).attr("id"));
			// alert(this.id);
			var first= $.cookie("goods") == null ? true : false;
			if(first){
				
				$.cookie("goods",'[{id: '+this.id+',num:1 }]',{expires:7});
			}else{
			
				var cookieStr = $.cookie("goods");
				var arr = eval(cookieStr);  //eval() 进行JSON格式字符串转对象的过程,最外层必须是数组
				//<3>判断是否之前存储过
				// console.log(arr[0].id);
				var isYes = false;
				for(var i in arr){
					if(arr[i].id ==  this.id){
						arr[i].num = parseInt(arr[i].num) + 1;
						isYes = true;
					}
				}
				if(!isYes){
						//<4>如果之前没有存储过
						var obj = {id: $(this).attr("id"), num: 1};
						arr.push(obj);
					}

					$.cookie("goods", JSON.stringify(arr), {expires: 7});
					// console.log($.cookie("goods"));w
				}
				// console.log($.cookie("goods"));
				// sc_car();
				sc_msg();
		})

		//购物车的数量
		function sc_car(){
			var cookieStr = $.cookie("goods");
			var arr = eval(cookieStr);
			var sum = 0; //用于累加的和
			for(var i in arr){
				sum += Number(arr[i].num)
			}

			$(".sc_num").html(sum);
		}
		sc_msg();
		function sc_msg(){
			$.ajax({
				url: "goods.json",
				type: "GET",
				success: function(res){
					var arr = eval($.cookie("goods")); //id num
					if(!arr){
						return;
					}
					var html = "";
					for(var i = 0; i < arr.length; i++){
						// html += '<li><div class="sc_goodsPic"><img src="'+res[arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><p>这是商品曲奇饼干</p></div><div class="sc_goodsBtn" id="'+arr[i].id+'">购买</div><div class="sc_goodsNum">商品数量:'+arr[i].num+'</div></li>';
						html +='<dl><dt><img src="'+res[arr[i].id].img+'" alt=""/></dt><dd><span class="shop_tit">'+res[arr[i].id].tit+'</span><span class="shop_cost">'+res[arr[i].id].cost+'</span><span class="shop_numb">数量:'+arr[i].num+'</span></dd></dl><span class="clearing">清算</span>';

					}
					$(".shop_wrap").html(html);
				}
			})
		}

	$.ajax({
			url:"shop_data.json",
			type:"GET",
			success:function(arr){
				// 猜你喜欢
				// alert(res.length);
				var iner="";//随意命名
				for(var i=0; i<arr[0].child.length;i++){
					iner += '<a href="#"><img src="'+arr[0].child[i].img+'" alt=""/><span class="pro_name">'+arr[0].child[i].tit+'</span><span class="pro_price">'+arr[0].child[i].cost+'</span><div></div></a>';
				}
				$(".recommend_item").html(iner);  //第一个html为固定方法

				// 历史记录
				var iner="";//随意命名
				for(var i=0; i<arr[0].child.length;i++){
					iner += '<li class="history_aim"><a href=""><img src="'+arr[0].child[i].img+'" alt=""/><span class="pro_name">'+arr[0].child[i].tit+'</span><span class="pro_price">'+arr[0].child[i].cost+'</span><div></div></a></li>';
				}
				$(".history_inner").html(iner);

				/*//商品缩略    运用代理
				iner="";
				for(var i=0; i<arr[1].child.length;i++){
					iner += '<li><a href="#"><img src="'+arr[1].child[i].img+'" alt=""/></a></li>';
				}
				$(".digest").html(iner);  //第一个html为固定方法*/
				/*
				//商品
				iner="";
				for(var i=0; i<arr[2].child.length;i++){
					iner += '<img class="show_inner" src="'+arr[2].child[i].img+'" alt="" style="display: none" />}';
				}
				$(".showcase").html(iner);  //第一个html为固定方法*/
			}
	})


/*$(".mark").mousemove(function(even){
		var e= even ||window.event;
		var l = e.clientX -$(".prpduct_box").offset().left - $(".showcase").offset().left-$(".dital_pic").offset().width/2;
		var t = e.clientX -$(".prpduct_box").offset().top - $(".showcase").offset().top-$(".dital_pic").offset().height/2;
		
		if(l < 0){
			l = 0
		}else if(l > $(".mark").offset().width - $(".dital_pic").offset.width){
			l = $(".mark").offset().width - $(".dital_pic").offset().width;
		}

		if(t < 0){
			t = 0;
		}else if(t > $(".mark").offset().height - $(".dital_pic").offset().height){
			t = $(".mark").offset().height - $(".dital_pic").offset().height;
		}

		$(".dital_pic").css("left","l+px")

	})
$(".ul_img").find("li").click(function(){

				var Src = $(this).find("img").attr("src");
				$(".small_pic").find("img").attr("src", Src);
				$(".big_pic").find("img").attr("src", Src);
			})



	*/

})