tool-tipper.js

@@@@@@@@@@
How To Use
@@@@@@@@@@

Options:
   param : default value : all values

 - "width" : 'auto' : 'auto', 'inherit', {number}
 - "height" : 'auto' : 'auto', 'inherit', {number}
 - "offset_top" : 0 : {number}
 - "offset_left" : 0 : {number}
 - "position" : 'bottom-center' : 'left-top', 'left-center', 'left-bottom', 'top-left', 'top-center', 'top-right', 'right-top', 'right-center', 'right-bottom', 'bottom-right', 'bottom-center', 'bottom-left'
 - "content" : '' : 'TEXT'
 - "tipid" : '' : 'ID FOR TIP CONTAINER'
 - "show" : false : false, true
 - "zindex" : 999 : {number}

If you plan to use ToolTipper dynamically (e.g. onclick show and fade out in 5 seconds), initiate the tooltip on page load then use ToolTipper functions like ToolTipper('show');

View index.html for example code.



@@@@@@@
Updates
@@@@@@@

=== v1-02 (stable) ===
- Modified the way ToolTipper is initiated to be less intrusive and more dynamic.

=== v1-01 (stable) ===
- completely changed the functionality and usability.
- added in ToolTipper calls like ('show'), ('hide'), ('status').
- changed options. (note: added lots of positions).

=== v1-00 (unstable) ===
- completely different to subsequent versions.
- uses returned object methods to show and hide.