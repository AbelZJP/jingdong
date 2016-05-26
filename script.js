$(function(){ 
	var size=$('.img li').size();
	//广告隐藏
	$('.ad .auto .close').click(function(){ 
		$('.ad').fadeOut(500);
	})
	/*$('.menu_left ul li').mouseover(function(){ 
		$(this).addClass('active1').siblings().removeClass('active1');
		var index=$(this).index();
		//i=index;
		$('.menu_left ul li .submenu').eq(index).stop().show().siblings().stop().hide();
	})
	*/ 
	/*轮播图*/
	//手动轮播
	$('.img li').hide();
	$('.img li').eq(0).show();
	$('.num li').eq(0).addClass('active');
	$('.num li').mouseover(function(){ 
		$(this).addClass('active').siblings().removeClass('active');
		var index=$(this).index();
		i=index;
		$('.img li').eq(index).stop().fadeIn(300).siblings().stop().fadeOut(300);
	})

	//自动轮播
	var i=0;
	var timer=setInterval(moveR,3000);
	//核心向右
	function moveR(){ 
		i++;
		if(i==size){ 
			i=0;
		}
		$('.num li').eq(i).addClass('active').siblings().removeClass('active');
		$('.img li').eq(i).fadeIn(300).siblings().fadeOut(300);
	};
	//核心向左
	function moveL(){ 
		i--;
		if(i==-1){ 
			i=size-1;
		}
		$('.num li').eq(i).addClass('active').siblings().removeClass('active');
		$('.img li').eq(i).fadeIn(300).siblings().fadeOut(300);
	};
	$('.carousel .btn_r').click(function(){ 		//添加点击事件
		moveR();
	})
	$('.carousel .btn_l').click(function(){ 
		moveL();
	})

	$(".carousel").hover(function(){ 				//鼠标移入函数
		clearInterval(timer);
	},function(){ 								//鼠标移出函数
		timer=setInterval(moveR,3000);
	})

	//右侧serve
	
	$('.serve>ul>li').mouseover(function(){ 
		if($(this).index()<=3){ 
			$('.serve>ul').slideUp(300);

			$('.tab').css({display:'block'});
			//$('.tab').addClass('active1');
			$('.tab ul li').eq($(this).index()).addClass('danji').siblings().removeClass('danji');
			$('.tab .tab_text').eq($(this).index()).addClass('first').siblings().removeClass('first');
		}
	})
	$('.serve .tab li').mouseover(function(){ 
		$('.serve .tab li').eq($(this).index()).addClass('danji').siblings().removeClass('danji');
		$('.tab .tab_text').eq($(this).index()).addClass('first').siblings().removeClass('first');
	})

	$('.tab .tab_text .close1').click(function(){ 
		$('.tab').css({display:'none'});
		$('.serve>ul').fadeIn(300);
	})
	$(document).click(function(){ 
		$('.tab').css({display:'none'});
		$('.serve>ul').fadeIn(300);
	})
})
//今日推荐
$(function(){
	var i=0;	
	var clone=$('.recommend .recommend_pic ul li').first().clone();
	$('.recommend .recommend_pic ul').append(clone);
	var listSize=$('.recommend .recommend_pic ul li').size();
		//向左
	$('.recommend .r_p_btn_l').click(function(){ 
		moveLeft();
	})
	function moveLeft(){ 
		i++;
		if(i==listSize){ 
			$('.recommend .recommend_pic ul').css({left:0});
			i=1;
		}
		$('.recommend .recommend_pic ul').stop().animate({left:-i*1016},500);
	};
		//向右
	$('.recommend .r_p_btn_r').click(function(){ 
		moveRight();
	})
	function moveRight(){ 
		i--;
		if(i==-1){ 
			$('.recommend .recommend_pic ul').css({left:-(listSize-1)*1016});
			i=listSize-2;
		}
		$('.recommend .recommend_pic ul').stop().animate({left:-i*1016},500);
	}
	//图片划过的白条
	var hover=$('.contentImgL .contentImgL_top .imgHover');
	var myimgHover=function(){ 
		hover.animate({marginLeft:700},'slow');
	}
	$('.contentImgL .contentImgL_top').hover(function(){ 
		if(hover.is(':animated')){ 
			clearTimeout(myimgHover);
		}else{ 
			setTimeout(myimgHover);
		}
	},function(){ 
		hover.animate({marginLeft:0},0);
	})

	//ajax图片
	
	$(document).scroll(function(){
		var myscroll=$(document).scrollTop();//当前可视区文档顶部到整个文档顶部的距离
		//alert(myscroll)
		var num=$('.main>div').length+1;
		for(var j=1;j<num;j++){
	
			if(myscroll>$(".content"+j).offset().top-750){
				$(".content"+j).addClass("mycotnNum").siblings().removeClass("mycotnNum")
			};
		};
	})
	$('.contentRight ul li').mouseover(function(){ 
		$(this).children("a").addClass("navActive").parents("li").siblings().children("a").removeClass("navActive");
	})
	$('.contentRight ul li').mouseover(function(){ 
		$('.mycotnNum .contentImgR>div').eq($(this).index()).show().siblings().hide();
		cotnNum = ($(this).index()+1);
		$url="ajax/"+'cotnfoot'+($(this).index()+1)+".txt";
		$.ajax({ 
			async:false,
			url:$url,
			success:function(data){ 
				$('.mycotnNum .contentImgR'+cotnNum).html(data);
				
			},
			error:function(){ 
				alert("ajax异步加载失败");
			}
		})
	})
})
	//楼梯式导航条
	$(function(){ 
		var index=0;
		$('.stairbanner ul li').click(function(){ 
			$(this).find('span').addClass('active1').parent().siblings().find('span').removeClass('active1');
			index=$(this).index()+1;
			var top=$('.content'+index).offset().top;
			$('body,html').animate({scrollTop:top},500);
		})

		$(window).scroll(function(){ 
			if($(document).scrollTop()>890){ 
				$('.stairbanner').show();
				var index=Math.floor($(document).scrollTop()/746);
				$('.stairbanner ul li span').eq(index-1).addClass('active1').parent().siblings().find("span").removeClass("active1");
			}else{ 
				$('.stairbanner').hide();
			}
		})
	})
