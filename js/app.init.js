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
	$(".color > li > .ui-radio > label").click(function(){
		alert("can you see?");
		color = $(this).next("input").val();
		chosedValue= color + "/" + size;
		$(".chose-info").html("已选择");
		$(".chosed").html(chosedValue);
	});
	$(".size > li > .ui-radio > label").click(function(){
		alert("can you see?");
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
	
});
$(document).on("pageinit","#pro-info-detail-chose-page",function(){
	//详情页form 联动
	getChosedValue();
});