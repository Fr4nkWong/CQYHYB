 (function($, window, document, undefined) {//匿名函数，不与其他库起冲突
    var pluginName = "jqueryAccordionMenu";
    var defaults = {
        speed: 300,
        showDelay: 0,
        hideDelay: 0,
        singleOpen: true,
        clickEffect: true
    };
    function Plugin(element, options) {//插件类
        this.element = element;
        this.settings = $.extend({},defaults, options);            //合并defaults,options
        this._defaults = defaults;
        this._name = pluginName;
        this.init()
    };
    $.extend(Plugin.prototype, {
        init: function() {                       //初始化子菜单打开、状态图标、点击效果
            this.openSubmenu();                    
            this.submenuIndicators();                    
            if (defaults.clickEffect) {
                this.addClickEffect()
            }
        },
        openSubmenu: function() {//打开子menu
            $(this.element).children("ul").find("li").bind("click touchstart",
            function(e) {
                e.stopPropagation();//停止事件传播，阻止其被分派到其他document节点
                e.preventDefault();//取消事件默认动作
                if ($(this).children(".submenu").length > 0) {
                    if ($(this).children(".submenu").css("display") == "none") {                                            //子menu隐藏状态
                        $(this).children(".submenu").delay(defaults.showDelay).slideDown(defaults.speed);                   //子menu下拉效果
                        $(this).children(".submenu").siblings("a").addClass("submenu-indicator-minus");                     //旋转标志
                        if (defaults.singleOpen) {
                            $(this).siblings().children(".submenu").slideUp(defaults.speed);                                //其他子menu上滑
                            $(this).siblings().children(".submenu").siblings("a").removeClass("submenu-indicator-minus")    //旋转标志回正
                        }
                        return false
                    } else {
                        $(this).children(".submenu").delay(defaults.hideDelay).slideUp(defaults.speed)
                    }
                    if ($(this).children(".submenu").siblings("a").hasClass("submenu-indicator-minus")) {                    //
                        $(this).children(".submenu").siblings("a").removeClass("submenu-indicator-minus")                    //
                    }
                }
             /*   window.location.href = $(this).children("a").attr("href")      */                                          //向指定URL提交数据
            });
        },
        submenuIndicators: function() {
            if ($(this.element).find(".submenu").length > 0) {
                $(this.element).find(".submenu").siblings("a").append("<span class='submenu-indicator'>+</span>")            //生成状态图标
            }
        },
        addClickEffect: function() {                                                                                       //点击波纹效果
            var ink, d, x, y;
            $(this.element).find("a").bind("click touchstart",
            function(e) {                                                                                                    
                $(".ink").remove();
                if ($(this).children(".ink").length === 0) {
                    $(this).prepend("<span class='ink'></span>")                                                       //将<span class="ink">移动至其内容首
                }
                ink = $(this).find(".ink");
                ink.removeClass("animate-ink");
                if (!ink.height() && !ink.width()) {
                    d = Math.max($(this).outerWidth(), $(this).outerHeight());
                    ink.css({
                        height: d,
                        width: d
                    })
                }
                x = e.pageX - $(this).offset().left - ink.width() / 2;
                y = e.pageY - $(this).offset().top - ink.height() / 2;
                ink.css({
                    top: y + 'px',
                    left: x + 'px'
                }).addClass("animate-ink")
            })
        }
    });
    $.fn[pluginName] = function(options) {                                                                      //给JQ类添加插件方法
        this.each(function() {                                                                                    
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options))                                 //给menu元素存取数据
            }
        });
        return this
    }

    jQuery(document).ready(function () {
    jQuery("#menu").jqueryAccordionMenu();                                                                      //调用menu插件
    
});
})(jQuery, window, document);