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
			alert(1);
			// 
			var t=$(".goods_num_list").find("input").val();
			var first= $.cookie("goods") == null ? true : false;
			num=t;
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
						html +='<dl><dt><img src="'+res[arr[i].id].img+'" alt=""/></dt><dd><span class="shop_tit">'+res[arr[i].id].tit+'</span><span class="shop_cost">单价:'+res[arr[i].id].cost+'</span><span class="shop_numb">数量:'+arr[i].num+'</span></dd></dl><span class="clearing">清算</span>';

					}
					$(".shop_wrap").html(html);
				}
			})
		}