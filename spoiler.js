/**
 * Verpackt die selektierten Elemente in einen auf- und zuklappbaren Spoiler.
 * @param options Objekt mit den Optionen:
         showtext: Buttontext zum Anzeigen.
         hidetext: Buttontext zum Verbergen
         show: Callback zum Anzeigen des Spoilers. Bekommt das Spoiler-Element als Parameter.
         hide: Callback zum Verstecken des Spoilers. Siehe show.
         wrapper: HTML-Tag, in den Spoilertext und Button eingebettet werden.
         buttonattributes: Objekt mit Attributen für den Spoiler-Button
         hidden: Ob der Spoiler zu Beginn versteckt werden soll
 */
(function($){
    $.fn.spoiler = function(options){
        var defaults = {
            "showtext": "Anzeigen",
            "hidetext": "Verbergen",
            "show": function(obj){$(obj).slideDown();},
            "hide": function(obj){$(obj).slideUp();},
            "wrapper": '<div class="spoiler-wrapper" />',
            "buttonattributes": {},
            "hidden": true,
        };
        options = $.extend({}, defaults, options);
        var spoilers = this.wrap(options.wrapper).before('<input type="button"/>');
        spoilers.prev().each(function(){
                $.extend(this, options.buttonattributes);
                this.value = options.hidden ? options.showtext : options.hidetext;
                this.visible = options.hidden ? false : true;
            }).click(function(){
                    if(this.visible)
                    {
                        $(this).next().each(function(){
                            options.hide(this);
                        });
                    }
                    else
                    {
                        $(this).next().each(function(){
                            options.show(this);
                        });
                    }
                    this.visible = !this.visible;
                    this.value = this.visible ? options.hidetext : options.showtext;
            });
        if(options.hidden)
            spoilers.hide();
        return this;
    };
})(jQuery);  
