require.config({
	paths:{
		jquery:'jquery',
		jqueryUI:'jquery-ui'
	}
})

require(['jquery','window'],function($, w){
	$('#a').click(function(){
		var win = new w.Window();
		win.alert({
			content:"welcome",
			handler:function(){
				alert("you click the button")
			},
			width: 300,
			title: '提示',
			y: 50,
			skinClassName: "window_skin_a",
			hasCloseBtn: true,
			text4AlertBtn:'ok',
			dragHandle:".window_header",
			handler4AlertBtn: function(){
				alert("you click the alert button");
			},
			handler4CloseBtn: function(){
				alert("you click the close button");
			}
		}).on("alert",function(){alert("alert")}).on("close",function(){alert('close')})
	})

	$("#b").click(function(){
		new w.Window().confirm({
			title:"系统消息",
			content:"您确定要删除这个文件吗？",
			width: 300,
			y: 50,
			text4ConfirmBtn:"是",
			text4CancelBtn:"否",
			dragHandle:".window_header"
		}).on("confirm",function(){
			alert("确定")
		}).on("cancel",function(){
			alert("取消")
		})
	})

	$("#c").click(function(){
		new w.Window().prompt({
			title:"请输入您的名字",
			content:"我们将会为您保密您输入的信息",
			width: 300,
			y: 50,
			text4PromptBtn:"输入",
			text4CancelBtn:"取消",
			defaultValue4PromptInput: "zhangsan",
			dragHandle:".window_header",
			handler4PromptBtn: function(inputValue) {
				alert("您输入的内容是：" + inputValue)
			},
			handler4CancelBtn: function(){
				alert('取消');
			}
		})
	})
})


// 浏览器原来弹窗存在的问题：
// 1）阻塞进程
// 2）不同浏览器样式不同
// 3）不可定制样式