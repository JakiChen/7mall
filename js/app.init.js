// JavaScript Document

/* 加载内容 */
loadCollection = function() {
	var boxes = new Array;   
	var randTxt = [
	'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', 
	'', 
	'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
	'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.',
	'Duis aunt occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 
	'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 
	'Adipisicing elit, sed do eiusmod.', 
	'Fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
	];
	var amount = 10 + Math.floor(Math.random()*10); if (amount == 0) amount = 1;
	for(i=0;i<amount;i++){
		num = Math.floor(Math.random()*randTxt.length)
		div = $('<div></div>').addClass('item');

		p = "<p>"+randTxt[num]+"</p>";

		div.append(p);
		boxes.push(div);
	}
	return boxes;
}



//--------------------------------------*/
//
// 详细页面form 联动
//
//--------------------------------------*/

//消息提示 myAlertMessage
function myAlertMessage(message){
	$(".my-alert-message-box").css("display","block");
	$(".my-alert-message-box").html(message);
	marginLeft = 0 - ( $(".my-alert-message-box").width() / 2 ) - 10;
	$(".my-alert-message-box").css("margin-left", marginLeft);
	setTimeout( function(){$( '.my-alert-message-box' ).fadeOut('slow');}, ( 2 * 1000 ) );
}
//【加入购物车】或【立即购买】按钮判定与（Acttion）动作
function checkChosedValue( btnVale ){
	if(chosedValue ==""){
		myAlertMessage("请先选择 商品 信息");
	}else if(color == ""){
		myAlertMessage("请选择 颜色");
	}else if(size ==""){
		myAlertMessage("请选择 尺码");
	}else if( btnVale == 'btnAddCart'){
		myAlertMessage("已加入购物车");
		//将数据写入我的购物车
	}else if( btnVale == 'btnPayIt'){
		//跳转的支付页面
		$.mobile.changePage("submit-order.html",{ transition: "slide" });
	}
}
//获得现在的颜色与尺寸，在html前台展示
function getChosedValue(){
	//核对尺寸颜色信息
	chosedValue = "";
	color = "";
	size = "";
	$(".color > li > label").click(function(){
		$(".color > li > label").removeClass("radio-on");
		$(this).addClass("radio-on");
		color = $(this).next("input").val();
		chosedValue= color + "/" + size;
		$(".chose-info").html("已选择");
		$(".chosed").html(chosedValue);
	});
	$(".size > li > label").click(function(){
		$(".size > li > label").removeClass("radio-on");
		$(this).addClass("radio-on");
		size = $(this).next("input").val();
		chosedValue= color + "/" + size;
		$(".chose-info").html("已选择");
		$(".chosed").html(chosedValue);
	});
	//添加到购物车
	$("#btnAddToCart").click(function(){
		checkChosedValue( 'btnAddCart' );
	});

	//立即购买
	$("#btnPayIt").click(function(){
		checkChosedValue( 'btnPayIt' );
	});

	//获取库存数量
	goodsNumber = 1; //购买商品数
	maxNumber = 3; //这个是库存数
	$("#btnAdd").click(function(){
		goodsNumber =goodsNumber+1;
		if ( goodsNumber > maxNumber){
			goodsNumber = maxNumber;
		}
		$("#total").val(goodsNumber);
	});
	$("#btnMinus").click(function(){
		goodsNumber =goodsNumber-1;
		if(goodsNumber == 0){
			goodsNumber = 1;
		}
		$("#total").val(goodsNumber);
	});
}


if (document.all) document.write('<!--[if lte IE 6]><script type="text/javascript">window.ie6= true<\/script><![endif]-->');
// var ie6 = /msie 6/i.test(navigator.userAgent);//不推荐，有些系统的ie6 userAgent会是IE7或者IE8
function change(picId,fileId) {
	var pic = document.getElementById(picId);
	var file = document.getElementById(fileId);
	if(window.FileReader){//chrome,firefox7+,opera,IE10,IE9，IE9也可以用滤镜来实现
		oFReader = new FileReader();
		oFReader.readAsDataURL(file.files[0]);
		oFReader.onload = function (oFREvent) {pic.src = oFREvent.target.result;};  
	}else if(document.all) {//IE8-
		file.select();
		var reallocalpath = document.selection.createRange().text//IE下获取实际的本地文件路径
		if (window.ie6) pic.src = reallocalpath; //IE6浏览器设置img的src为本地路径可以直接显示图片
		else { //非IE6版本的IE由于安全问题直接设置img的src无法显示本地图片，但是可以通过滤镜来实现，IE10浏览器不支持滤镜，需要用FileReader来实现，所以注意判断FileReader先
		pic.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='image',src=\"" + reallocalpath + "\")";
		pic.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';//设置img的src为base64编码的透明图片，要不会显示红xx
	}
}else if (file.files) {//firefox6-
		if (file.files.item(0)) {
			url = file.files.item(0).getAsDataURL();
			pic.src = url;
		}
	}
}

/* 快速导航 */
function showQuickMenu(){
	$("#btn-quik-pub").click(function(){
		$(".quick-menu-mask").toggleClass("my-on");
		$(this).toggleClass("my-rotage");
	});
}
/* 二级分类 显示二级分类 */
function showSubCategory(){
	$("#btn-category-more").click(function(){
		$("#btn-category-more-menu").toggleClass("show");
		$(this).toggleClass("more-up");
	});
}
/* 固定TAB 控件 */
function fixedTabShow(){
	var nav=document.getElementById('header');
	var navFixed=document.getElementById('fixed-tab');
	window.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if( scrollTop > nav.offsetTop ){
			navFixed.style.position = "fixed";
			navFixed.style.width = "100%";
			navFixed.style.zIndex = "1000";
			navFixed.style.top = "0";
		}else if( scrollTop <= nav.offsetTop ){
			navFixed.style.position = "static";
		}
	}
}
/* 显示分享控件 */
function showShareCtrl(){
	$("#btnShare").click(function(){
		$(".share-control-container").css("display","block");
		$(".page").addClass("blur");
	});
	$("#btnShareClose").click(function(){
		$(".share-control-container").css("display","none");
		$(".page").removeClass("blur");
	});
}
/* 开始 */
$(document).ready(function () {
	
	$(window).scroll(function () {
		if(($(window).scrollTop() + $(window).height()) == $(document).height())
		{
			/*$("#collection").gridalicious('append', loadCollection());*/
		}
	});
	
	$("#collection").gridalicious({
		gutter: 10,
		width: 145,
		animate: true,
		animationOptions: {
			speed: 150,
			duration: 0,
			complete: onComplete
		},
	});
	
	$("#products-list").gridalicious({
		gutter: 8,
		width: 147,
		animate: true,
		animationOptions: {
			speed: 150,
			duration: 0,
			complete: onComplete
		},
	});
	
	//未使用
	function onComplete(data) { 
	}
	
	//切换显示快速导航
	showQuickMenu();
	
	//切换显示二级分类
	showSubCategory();
	
	//固定Tab栏
	fixedTabShow();
	
	//显示分享控件
	showShareCtrl();
});

$(document).on("pageinit","#pro-info-detail-chose-page",function(){
	//详情页form 联动
	getChosedValue();
});