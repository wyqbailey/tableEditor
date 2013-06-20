/**
 * @Filename: jquery.tableEditor.js
 * @Description: tableEditor
 * @Version: 1.0.0
 * @Author: wyqbailey@gmail.com
 *
 * @example
 *
 *
*/
(function($){
    $.fn.tableEditor = function(option){
        var defaults = {
            menuClass: "tableEditorMenu"
        };

        return this.each(function(i, n){

            /* 合并默认参数和用户自定义参数 */
            option = $.extend(true, {}, defaults, option);

            $(n).delegate("td,th","contextmenu",function(e){
                var e = e || window.event;
                $.fn.tableEditor._target = $(this);
                var menu = $.fn.tableEditor.menu();
                menu.css({left:e.clientX+175, top:e.clientY+85}).show();
                return false;
            }).bind("click",function(e){
                    var menu = $.fn.tableEditor.menu();
                    menu.hide();
                });
        });




    }
})(jQuery);

$.fn.tableEditor._target = null;

$.fn.tableEditor.menu = function(x, y){
    if($("#tableEditorMenu").length==1){
        return $("#tableEditorMenu");
    }else{
        var menu = $("<ul id='tableEditorMenu' class='tableEditorMenu'></ul>").css({position:"absolute",left:x+"px",top:y+"px"});
        $("<li>插入行</li>").click(function(){
            var tr = $.fn.tableEditor._target.closest("tr");
            tr.before(tr.clone());
            menu.hide();
        }).appendTo(menu);
        $("<li>删除行</li>").click(function(){
            var tr = $.fn.tableEditor._target.closest("tr");
            tr.remove();
            menu.hide();
        }).appendTo(menu);
        $("<li>插入列</li>").click(function(){
            var i = $.fn.tableEditor._target.index();
            var table = $.fn.tableEditor._target.closest("table");
            table.find("tr").each(function(){
                var td = $(this).find("td,th").eq(i);
                td.is("td") ? td.before("<td>&nbsp;</td>") : td.before("<th>&nbsp;</th>");
            });
            menu.hide();
        }).appendTo(menu);
        $("<li>删除列</li>").click(function(){
            var i = $.fn.tableEditor._target.index();
            var table = $.fn.tableEditor._target.closest("table");
            table.find("tr").each(function(){
                var td = $(this).find("td,th").eq(i);
                td.remove();
            });
            menu.hide();
        }).appendTo(menu);
        menu.appendTo("body");

        return menu;
    }
}
