(function($){

    /*
     * Positioning: left-top, left-center, left-bottom, top-left, top-center, top-right, right-top, right-center, right-bottom, bottom-right, bottom-center, bottom-left
     * Width: 'auto', 'inherit', {number}
     * Height: 'auto', 'inherit', {number}
     */

    /*
    * things to do
    * - add in "toggle" functionality.
    * - add in ability to close the tip with an X button.
    */

    var toolTippers = [];

    function isNumber(o) { return ! isNaN (o-0) && o != null && o != ""; }
    function isString(o) { return typeof o === "string"; }
    function getAttr(obj,attr) { var attrval = obj.attr(attr); if (typeof attrval === 'undefined' || attrval === false || attrval === '') attrval = ''; return attrval; }
    function setAttr(obj,attr,val) { obj.attr(attr,val); }

    $.fn.ToolTipper = function(options)
    {
        //static item checks
        if (isString(options))
        {
            switch (options)
            {
                case 'show':
                    return showTip(this);
                    break;
                case 'hide':
                    return hideTip(this);
                    break;
                case 'status':
                    return statusTip(this);
                    break;
            }
        }
        else if (options instanceof Object)
        {
            //if object, expect it to be a definition
            var defaults = {
                width:'auto',
                height:'auto',
                offset_left:0,
                offset_top:0,
                position:'bottom-center',
                content:'',
                tipid:'',
                show:false,
                zindex:999
            };
            var settings = $.extend({},defaults,options);

            return pStart(this,settings);
        }

        return error();
    };

    function showTip(o)
    {
        var tipnum = getAttr(o,'data-tooltipperid');

        if (o.length > 0 && tipnum >= 0)
        {
            var tt = toolTippers[tipnum].tooltipper;
            var settings = toolTippers[tipnum].settings;

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

            if (settings.width == 'auto') nwidth = tt.outerWidth(false);
            else if (settings.width == 'inherit') nwidth = fwidth;
            else nwidth = settings.width;

            if (settings.height == 'auto') nheight = tt.outerHeight(false);
            else if (settings.height == 'inherit') nheight = fheight;
            else nheight = settings.height;

            switch (settings.position)
            {
                default:

                    break;
                case 'left-top':
                    nleft -= nwidth;
                    break;
                case 'left-center':
                    nleft -= nwidth;
                    ntop += (fheight-nheight)/2;
                    break;
                case 'left-bottom':
                    nleft -= nwidth;
                    ntop += fheight-nheight;
                    break;
                case 'top-left':
                    ntop -= nheight;
                    break;
                case 'top-center':
                    nleft += (fwidth-nwidth)/2;
                    ntop -= nheight;
                    break;
                case 'top-right':
                    nleft += fwidth-nwidth;
                    ntop -= nheight;
                    break;
                case 'right-top':
                    nleft += fwidth;
                    break;
                case 'right-center':
                    nleft += fwidth;
                    ntop += (fheight-nheight)/2;
                    break;
                case 'right-bottom':
                    nleft += fwidth;
                    ntop += fheight-nheight;
                    break;
                case 'bottom-left':
                    ntop += fheight;
                    break;
                case 'bottom-center':
                    nleft += (fwidth-nwidth)/2;
                    ntop += fheight;
                    break;
                case 'bottom-right':
                    nleft += fwidth-nwidth;
                    ntop += fheight;
                    break;
            }

            if (isNumber(settings.offset_top)) ntop += settings.offset_top;
            if (isNumber(settings.offset_left)) nleft += settings.offset_left;

            tt.css({
                'visibility':'visible',
                'display':'none',
                'top':ntop,
                'left':nleft
            }).stop().fadeIn(200);

            toolTippers[tipnum].status = 'shown';

            return o;
        }

        return error(101);
    }

    function hideTip(o)
    {
        var tipnum = getAttr(o,'data-tooltipperid');

        if (o.length > 0 && tipnum >= 0)
        {
            var tt = toolTippers[tipnum].tooltipper;
            var settings = toolTippers[tipnum].settings;
            toolTippers[tipnum].status = 'hidden';

            tt.stop().fadeOut(200);

            return o;
        }

        return error(101);
    }

    function statusTip(o)
    {
        var tipnum = getAttr(o,'data-tooltipperid');

        if (o.length > 0 && tipnum >= 0)
        {
            return toolTippers[tipnum].status;
        }

        return error(101);
    }

    function pStart(o,settings)
    {
        //check if already exists
        if (getAttr(o,'data-tooltipperid')) return o;

        //build
        toolTippers.push({});
        var tipnum = toolTippers.length-1;
        setAttr(o,'data-tooltipperid',tipnum);

        settings.content = settings.content || '';

        if (!isString(settings.tipid) || settings.tipid == '')
        {
            settings.tipid = 'tool-tipper-'+tipnum;
        }

        if (settings.width != 'auto' && !isNumber(settings.width)) settings.width = 'auto';
        if (settings.height != 'auto' && !isNumber(settings.height)) settings.height = 'auto';

        $("body").append('<div id="'+settings.tipid+'">'+settings.content+'</div>');
        var tt = $('#'+settings.tipid);

        tt.css({
            'position':'absolute',
            'display':'block',
            'visibility':'hidden',
            'z-index':settings.zindex
        });

        //set tooltipper data
        toolTippers[tipnum] = {
            settings: settings,
            tooltipper: tt,
            parent: o,
            status: 'hidden'
        };

        if (tt.length > 0)
        {
            if (settings.show === true)
            {
                showTip(o);
            }

            return o;
        }

        return error(100);
    }

    function error(num)
    {
        num = num || 0;

        switch (num)
        {
            default:
                return 'Unknown error with the Tool Tipper plugin.';
                break;
            case 100:
                return 'Error creating the Tool Tipper.';
                break;
            case 101:
                return 'Tool Tipper not defined.';
                break;
        }
    }

})(jQuery);