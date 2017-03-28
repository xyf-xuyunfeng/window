// (function(){
// 	var abc = 100;
// 	function TreeView(cfg){
// 		this.a = cfg.a;
// 		this.b = cfg.b;
// 	}

// 	TreeView.prototype = {
// 		c:function(){abc*=2},
// 		d:function(){abc/=2}
// 	}
// 	window.TreeView = TreeView;
// })()

// 闭包的一种很经典的用法


define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.cfg = {
			width: 500,
			title:"系统消息",
			content: '',
			handler4AlertBtn: null,
			hasCloseBtn: false,
			handler4CloseBtn: null,
			skinClassName: null,
			text4AlertBtn: "确定",
			text4ConfirmBtn:"确定",
			text4CancelBtn: "取消",
			handler4ConfirmBtn: null,
			handler4CancelBtn: null,
			hasMask: true,
			isDraggable: true,
			dragHandle: null,
			text4PromptBtn:"确定",
			isPromptInputPassword:false,
			defaultValue4PromptInput: "",
			maxlength4PromptInput: 10,
			handler4PromptBtn: null
		};
	}
	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI: function(){
			switch(this.cfg.winType) {
				case "alert":
					footerContent = '<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn">';break;
				case "confirm":
					footerContent = '<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"><input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
					break;
				case "prompt":
					this.cfg.content += '<p class="window_promptInputWrapper"><input type="'+(this.cfg.isPromptInputPassword ? "password" : "text" )+'" value="'+this.cfg.defaultValue4PromptInput+'" maxlength="'+this.cfg.maxlength4PromptInput+'" class="window_promptInput"></p>';
					footerContent = '<input type="button" value="'+this.cfg.text4PromptBtn+'" class="window_promptBtn"><input type="button" value="'+this.cfg.text4CancelBtn+'" class="window_cancelBtn">';
					break;
			}
			
			this.boundingBox = $('<div class="window_boundingBox">'+
				'<div class="window_header">'+this.cfg.title+'</div>'+
				'<div class="window_body">'+this.cfg.content+'</div>'+
				'<div class="window_footer">'+footerContent+'</div>'+
				'</div>'
			);

			this._promptInput = this.boundingBox.find(".window_promptInput");

			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			}

			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">❌</span>');
			}
			this.boundingBox.appendTo(document.body);	
		},
		bindUI:function(){
			var that = this;
			this.boundingBox.delegate(".window_alertBtn","click",function(){
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn","click",function(){
				that.fire("close");
				that.destroy();
			}).delegate(".window_confirmBtn","click",function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancelBtn","click",function(){
				that.fire("cancel");
				that.destroy();
			}).delegate(".window_promptBtn","click",function(){
				that.fire("prompt",that._promptInput.val());
				that.destroy();
			})


			if(this.cfg.handler4AlertBtn){
				this.on("alert",this.cfg.handler4AlertBtn)
			}
			if(this.cfg.handler4CloseBtn) {
				this.on("close",this.cfg.handler4CloseBtn)
			}
			if(this.cfg.handler4ConfirmBtn) {
				this.on("confirm",this.cfg.handler4ConfirmBtn)
			}
			if(this.cfg.handler4CancelBtn) {
				this.on("cancel",this.cfg.handler4CancelBtn)
			}
			if(this.cfg.handler4PromptBtn) {
				this.on("prompt",this.cfg.handler4PromptBtn)
			}
		},
		syncUI:function(){
			this.boundingBox.css({
				width:this.cfg.width + 'px',
				height: this.cfg.height + 'px',
				left: (this.cfg.x || (window.innerWidth - this.cfg.width) / 2) + 'px',
				top: (this.cfg.y || (window.innerHeight - this.cfg.height) / 2) + 'px'
			})

			if(this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName)
			}

			if(this.cfg.isDraggable) {
				if(this.cfg.dragHandle) {
					this.boundingBox.draggable({handle:this.cfg.dragHandle})
				}
				this.boundingBox.draggable();
			}
		},
		destructor: function(){
			this._mask && this._mask.remove();
		},
		alert: function(cfg){
			$.extend(this.cfg,cfg,{winType:"alert"});    
			this.render();
			return this;
		},
		confirm: function(cfg){
			$.extend(this.cfg,cfg,{winType:"confirm"});
			this.render();
			return this;
		},
		prompt: function(cfg){
			$.extend(this.cfg,cfg,{winType:"prompt"});
			this.render();
			this._promptInput.focus();
			return this;
		}
	})

	return {
		Window: Window
	}
})