(function($){


    /*
    * things to do
    * - static calls to existing tooltippers (show,hide,override settings for content - make sure to retain what was previously set and don't overwrite everything else to default)
    * - first check should be whether the tooltipper has already been applied (store in data on the object)
    */

    var toolTippers = 0;

    $.fn.ToolTipper = function(options)
    {
        //static item checks
        if (options == 'show')
        {

        }
        else if (options == 'hide')
        {

        }
        //if object, expect it to be a definition

        var defaults = {
            width:'auto',
            height:'auto',
            offset_left:false,
            offset_top:false,
            content:'',
            tipid:'',
            center:false,
            show:false
        };
        var settings = $.extend({},defaults,options);
        settings.tooltipper = false;

        return pStart(this,settings);
    };

    function outerHTML(o) { return $('<div />').append($(o).eq(0).clone()).html(); }

    function isNumber(o) { return ! isNaN (o-0) && o != null && o != ""; }

    function isString(o) { return typeof o === "string"; }

    function showTip(tt)
    {
        if (tt.length > 0 && tt.data('tooltipper') == '1')
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

            if (settings.width == 'auto') nwidth = tt.width();
            else nwidth = settings.width;

            if (settings.height == 'auto') nheight = tt.height();
            else nheight = settings.height;

            if (isNumber(settings.offset_top)) ntop += settings.offset_top;
            else ntop += fheight;

            if (isNumber(settings.offset_left)) nleft += settings.offset_left;

            if (settings.center === true)
            {
                nleft += (fwidth-nwidth)/2;
            }

            tt.css({
                'visibility':'visible',
                'display':'none',
                'width':nwidth,
                'height':nheight,
                'top':ntop,
                'left':nleft
            });

            tt.stop().fadeIn(200);
        }
    };

    function hideTip(tt)
    {
        if (tt.length > 0 && tt.data('tooltipper') == '1')
        {
            tt.stop().fadeOut(200);
        }
    };

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
        var tt = settings.tooltipper = $('#'+settings.tipid);

        tt.data('tooltipper','1');

        if (tt.length > 0)
        {
            if (settings.show === true)
            {
                showTip(tt);
            }

            return o;
        }

        return {error:'Error creating the Tool Tipper.'};
    }

})(jQuery);