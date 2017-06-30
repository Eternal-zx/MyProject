
$().extend({
	size: function(){
		return this.elements.length;   //返回当前元素的长度
	}
})
$(function(){
	// 轮播图
	//按钮
	var oBtns = $("#banner").find("ol").find("li");	//简化代码寻找按钮、图片
	var oUl = $("#banner").find("ul");
	var aLi = oUl.find("li");
	var iNow = 0; //记录当前是第几张
	var timer = null; //设计记录定时器的标识
	timer = setInterval(timerInner, 2000);
	function timerInner(){
		iNow++;
		tab();
	}
	function tab(){
		// document.title = iNow;   //打印下标
		if(iNow == oBtns.size()){	// 判断inow == 按钮的长度  
			oBtns.attr("class", "");
			oBtns.eq(0).attr("class", "act");
		}else{
			oBtns.attr("class", "");
			oBtns.eq(iNow).attr("class", "act"); //找出当前点击按钮
		}
		oUl.animate({left: iNow * -1200}, function(){	// 可替换为inow=$(this).index()*-150  (当前点击按钮的一个下标下标为0   对应移动高度为0)
			if(iNow == oBtns.size()){	//判断是否切换到最后一张图片
				iNow = 0;
				oUl.css("left", "0px");
			}
		});
	}
	oBtns.click(function(){
		iNow = $(this).index();	//inow  =  当前点击按钮的下标
		tab();
	})
	$("#banner").hover(function(){
		clearInterval(timer);
	}, function(){
		timer = setInterval(timerInner, 2000);
	})

/*轮播图搜索展开*/
	$(".son_list").hover(function(){
		$(this).find(".son_submenu").css("display","block");
		// $(this).find(".son_submenu").css({"dispaly":"block", "opacity":"0.6","filter":"Alpha(opacity=60)","background":"#000" })
	},function(){
		$(this).find(".son_submenu").css("display","none");

	});

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

/*侧边回到顶部*/
	$(".side ul li").hover(function(){
		$(this).find(".sidebox").stop().animate({"width":"124px"},100).css({"opacity":"1","filter":"Alpha(opacity=100)","background":"#ae1c1c"})	
	},function(){
		$(this).find(".sidebox").stop().animate({"width":"54px"},100).css({"opacity":"0.8","filter":"Alpha(opacity=80)","background":"#000"})	
	});

/*下边栏展开*/
	$(".footer_links").click(function(){
		$(".footer_links").find(".link_list").css("display","block");
		$(".footer").find(".arrow").css("background","url(image/header/arrow1.jpg) no-repeat");
	})
	$(".arrow").click(function(){
			$(".footer").find(".link_list").css("display","none");
		$(".footer").find(".arrow").css("background","url(image/header/arrow2.jpg) no-repeat");
		return false;   	//事件冒泡
	})
	


	$.ajax({
			url:"index_data.json",
			type:"GET",
			success:function(res){
				console.log(res);
				// 空调
				// alert(res.length);
				var html="";//html随意命名
				for(var i=0; i<res[0].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[0].child1[i].img+'" />'+ res[0].child1[i].title+'</a></li>';
				}
				$(".hot_list").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[0].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[0].child2[i].img+'" /><span class="good_name">'+res[0].child2[i].des+'</span><span class="good_price">'+res[0].child2[i].cost+'</span></a></li>';
				}
				$(".good_list").html(html);

				html="";
				// console.log(res[0].chlid3);
				var arr = res[0].chlid3;
				for(var i=0; i<arr.length;i++){
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list").html(html);


				//冰箱
				html="";
				for(var i=0; i<res[1].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[1].child1[i].img+'" />'+ res[1].child1[i].title+'</a></li>';
				}
				$(".hot_list_2").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[1].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[1].child2[i].img+'" /><span class="good_name">'+res[1].child2[i].des+'</span><span class="good_price">'+res[1].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_2").html(html);

				html="";
				// console.log(res[1].chlid3);
				var arr = res[1].chlid3;
				for(var i=0; i<arr.length;i++){
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list").html(html);


				//洗衣机
				html="";
				for(var i=0; i<res[2].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[2].child1[i].img+'" />'+ res[2].child1[i].title+'</a></li>';
				}
				$(".hot_list_3").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[2].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[2].child2[i].img+'" /><span class="good_name">'+res[2].child2[i].des+'</span><span class="good_price">'+res[2].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_3").html(html);

				html="";
				// console.log(res[1].chlid3);
				var arr = res[2].chlid3;
				for(var i=0; i<arr.length;i++){
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list_3").html(html);


				//厨房小电
				html="";
				for(var i=0; i<res[3].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[3].child1[i].img+'" />'+ res[3].child1[i].title+'</a></li>';
				}
				$(".hot_list_4").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[3].child1_1.length;i++){
					html += '<li><a href="#"><img src="'+ res[3].child1_1[i].img+'" />'+ res[3].child1_1[i].title+'</a></li>';
				}
				$(".hot_list_4_1").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[3].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[3].child2[i].img+'" /><span class="good_name">'+res[3].child2[i].des+'</span><span class="good_price">'+res[3].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_4").html(html);

				html="";
				// console.log(res[1].chlid3);
				var arr = res[3].chlid3;
				for(var i=0; i<arr.length;i++){
					
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list_4").html(html);

				//厨房大电
				html="";
				for(var i=0; i<res[4].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[4].child1[i].img+'" />'+ res[4].child1[i].title+'</a></li>';
				}
				$(".hot_list_5").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[4].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[4].child2[i].img+'" /><span class="good_name">'+res[4].child2[i].des+'</span><span class="good_price">'+res[4].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_5").html(html);

				html="";
				// console.log(res[1].chlid3);
				var arr = res[4].chlid3;
				for(var i=0; i<arr.length;i++){
					
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list_5").html(html);

				//生活家电
				html="";
				for(var i=0; i<res[5].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[5].child1[i].img+'" />'+ res[5].child1[i].title+'</a></li>';
				}
				$(".hot_list_6").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[5].child1_1.length;i++){
					html += '<li><a href="#"><img src="'+ res[5].child1_1[i].img+'" />'+ res[5].child1_1[i].title+'</a></li>';
				}
				$(".hot_list_6_1").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[5].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[5].child2[i].img+'" /><span class="good_name">'+res[5].child2[i].des+'</span><span class="good_price">'+res[5].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_6").html(html);

				html="";
				// console.log(res[1].chlid5);
				var arr = res[5].chlid3;
				for(var i=0; i<arr.length;i++){
					
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list_6").html(html);

				//热水器
				html="";
				for(var i=0; i<res[6].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[6].child1[i].img+'" />'+ res[6].child1[i].title+'</a></li>';
				}
				$(".hot_list_7").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[6].child1_1.length;i++){
					html += '<li><a href="#"><img src="'+ res[6].child1_1[i].img+'" />'+ res[6].child1_1[i].title+'</a></li>';
				}
				$(".hot_list_7_1").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[6].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[6].child2[i].img+'" /><span class="good_name">'+res[6].child2[i].des+'</span><span class="good_price">'+res[6].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_7").html(html);

				html="";
				// console.log(res[1].chlid6);
				var arr = res[6].chlid3;       
				for(var i=0; i<arr.length;i++){
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list_7").html(html);


				//配件及周边
				html="";
				for(var i=0; i<res[7].child1.length;i++){
					html += '<li><a href="#"><img src="'+ res[7].child1[i].img+'" />'+ res[7].child1[i].title+'</a></li>';
				}
				$(".hot_list_8").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[7].child1_1.length;i++){
					html += '<li><a href="#"><img src="'+ res[7].child1_1[i].img+'" />'+ res[7].child1_1[i].title+'</a></li>';
				}
				$(".hot_list_8_1").html(html);  //第一个html为固定方法

				html="";
				for(var i=0; i<res[7].child2.length;i++){
					html += '<li><a href="#"><img src="'+ res[7].child2[i].img+'" /><span class="good_name">'+res[7].child2[i].des+'</span><span class="good_price">'+res[7].child2[i].cost+'</span></a></li>';
				}
				$(".good_list_8").html(html);

				html="";
				// console.log(res[1].chlid7);
				var arr = res[7].chlid3;       
				for(var i=0; i<arr.length;i++){
					html += '<li style="border-top: 1px solid #f4f4f4;"><a href="#"><img src="'+ arr[i].img +'" alt=""/><p class="main_name">'+ arr[i].des +'</p></a></li>'
				}
				$(".main_list_8").html(html);
			}

	})
/*购物详情页面*/
/*产品详情导航菜单*/
	$(".tabs_nav_wrap").find("li").click(function(){
		$(".tabs_nav_wrap").find("li").attr("class","");
		$(this).attr("class","active");

		$(".tabs_connect_inner").find(".act").css("display","none");
		$(".tabs_connect_inner").find(".act").eq($(this).index()).css("display","block");
	})
/*放大图片对应*/
	// $(".digest").find("li").hover(function(){
	// 	$(".digest").find("li").attr("class","");
	// 	$(this).attr("class","active");
		
	// 	$(".showcase").find(".show_inner").css("display","none");
	// 	$(".showcase").find(".show_inner").eq($(this).index()).css("display","block");
	// 	$(".zoom_pic").find("img").css("display","none");
	// 	$(".zoom_pic").find("img").eq($(this).index()).css("display","block");
	// 	var num=$(this).find("img").attr("src");
	// 	$(".zoom_pic").find("img").attr("src",num);

	// 	// $(".ul_img").find("li").click(function(){
	// 	// var Src = $(this).find("img").attr("src");
	// 	// $(".zoom_pic").find("img").attr("src", Src);	
	// })
/*放大镜*/
	// $(".showcase").mouseover(function(){
	// 	$(".zoom_pic").css("display","block");
	// 	$(".dital_pic").css("display","block");
	// })
	// $(".showcase").mouseout(function(){
	// 	$(".zoom_pic").css("display","none");
	// 	$(".dital_pic").css("display","none");
	// })

	// var oMark = document.getElementsByClassName("showcase")[0];
	// var oFloat = document.getElementsByClassName("dital_pic")[0];
	// var oBig = document.getElementsByClassName("zoom_pic")[0];
	// var oSmall = document.getElementsByClassName("showcase")[0];
	// var oImg = oBig.getElementsByTagName("img")[0];

	// oMark.onmousemove = function(even){
	// 	var e = even || window.event;
	// 	//让小块居中
	// 	var l = e.clientX - oMark.offsetLeft - oSmall.offsetLeft - oFloat.offsetWidth / 2;
	// 	var t = e.clientY - oMark.offsetTop - oSmall.offsetTop - oFloat.offsetHeight ;
	// 	// document.title = l + ", " + t;

	// 	//限制块不能出界
	// 	if(l < 0){
	// 		l = 0
	// 	}else if(l > oMark.offsetWidth - oFloat.offsetWidth){
	// 		l = oMark.offsetWidth - oFloat.offsetWidth;
	// 	}

	// 	if(t < 0){
	// 		t = 0;
	// 	}else if(t > oMark.offsetHeight - oFloat.offsetHeight){
	// 		t = oMark.offsetHeight - oFloat.offsetHeight;
	// 	}


	// 	oFloat.style.left = l + "px";
	// 	oFloat.style.top = t + "px";

	// 	//让大的图片按比例进行移动
	// 	//计算大图片和小图片的比例  按照比例来移动大图片的距离
	// 	var percentX = l / (oMark.offsetWidth - oFloat.offsetWidth);
	// 	var percentY = t / (oMark.offsetHeight - oFloat.offsetHeight);
	// 	// document.title = percentX + ", " + percentY;

	// 	oImg.style.left = -percentX * (oImg.offsetWidth - oBig.offsetWidth) + "px";
	// 	oImg.style.top = -percentY * (oImg.offsetHeight - oBig.offsetHeight) + "px";	
	// }
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
				success: function(ob){
					var arr = eval($.cookie("goods")); //id num
					if(!arr){
						return;
					}
					var html = "";
					for(var i = 0; i < arr.length; i++){
						// html += '<li><div class="sc_goodsPic"><img src="'+ob[arr[i].id].img+'" alt=""></div><div class="sc_goodsTitle"><p>这是商品曲奇饼干</p></div><div class="sc_goodsBtn" id="'+arr[i].id+'">购买</div><div class="sc_goodsNum">商品数量:'+arr[i].num+'</div></li>';
						html +='<dl><dt><img src="'+ob[arr[i].id].img+'" alt=""/></dt><dd><span class="shop_tit">'+ob[arr[i].id].tit+'</span><span class="shop_cost">'+ob[arr[i].id].cost+'</span><span class="shop_numb">数量:'+arr[i].num+'</span></dd></dl><span class="clearing">清算</span>';

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


})




