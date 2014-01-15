(function($){

    var toolTippers = 0;

    $.fn.ToolTipper = function(options)
    {
        var defaults = {
            width:'auto',
            height:'auto',
            offset_left:false,
            offset_top:false,
            content:'',
            tipid:'',
            center:false
        };
        var settings = $.extend({},defaults,options);
        settings.tooltipper = false;

        return pStart(this,settings);
    };

    function outerHTML(o) { return $('<div />').append($(o).eq(0).clone()).html(); }

    function isNumber(o) { return ! isNaN (o-0) && o != null && o != ""; }

    function isString(o) { return typeof o === "string"; }

    function pStart(o,settings)
    {

        toolTippers++;

        settings.content = settings.content || '';

        if (!isString(settings.tipid) || settings.tipid == '')
        {
            settings.tipid = 'tool-tipper-'+toolTippers;
        }

        if (settings.width != 'auto' && !isNumber(settings.width)) width = 'auto';
        if (settings.height != 'auto' && !isNumber(settings.height)) height = 'auto';

        $("body").append('<div id="'+settings.tipid+'" style="position:absolute; display:block; visibility:hidden; z-index:9999;">'+settings.content+'</div>');
        settings.tooltipper = $('#'+settings.tipid);

        if (settings.tooltipper.length > 0)
        {
            o.showTip = function()
            {
                //position to center below
                var fwidth = o.outerWidth(false);
                var fheight = o.outerHeight(false);
                var foffset = o.offset();
                var ftop = foffset.top;
                var fleft = foffset.left;

                var nwidth = 0;
                var nheight = 0;
                var ntop = ftop;
                var nleft = fleft;

                if (settings.width == 'auto') nwidth = settings.tooltipper.width();
                else nwidth = settings.width;

                if (settings.height == 'auto') nheight = settings.tooltipper.height();
                else nheight = settings.height;

                if (isNumber(settings.offset_top)) ntop += settings.offset_top;
                else ntop += fheight;

                if (isNumber(settings.offset_left)) nleft += settings.offset_left;

                if (settings.center === true)
                {
                    nleft += (fwidth-nwidth)/2;
                }

                settings.tooltipper.css({
                    'visibility':'visible',
                    'display':'none',
                    'width':nwidth,
                    'height':nheight,
                    'top':ntop,
                    'left':nleft
                });

                settings.tooltipper.stop().fadeIn(200);
            };

            o.hideTip = function()
            {
                settings.tooltipper.stop().fadeOut(200);
            };

            return o;
        }

        return {error:'Error creating the Tool Tipper.'};
    }

})(jQuery);