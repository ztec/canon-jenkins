/**
 * Canon for Jenkins Javascript Overrides
 *
 * Leverages Jankins-included Prototype.js & jquery
 *
 * @author Rackspace Web Team
 * @version 0.1
 */
document.observe("dom:loaded", function () {


    var blankGif  = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' ;//blank gif
    jQuery('img[alt="Folder"]').attr('src',blankGif);
    var replaceBall = function(){
        jQuery('img.build-status-icon, img.build-caption-status-icon').each(function(index, element){
            if(element.src !== blankGif) {
                var src = element.src;
                var regex = new RegExp("(?=\\w+\\.\\w{3,4}$).+", "g");
                src = regex.exec(src);
                src = src[0].split('.');
                var className = src[0];
                jQuery(element).addClass(className);
                var multiplesClasses = className.split('_');
                jQuery(multiplesClasses).each(function (index, item) {
                    jQuery(element).addClass(item);
                });
                element.src = blankGif;
            }
        });
    };
    var iconRef = {
        "user" : "fa fa-users",
        "new-package" : "fa fa-archive",
        "notepad" : "fa fa-pencil-square-o",
        "gear" : "fa fa-cog",
        "clock" : "fa fa-play",
        "atom" : "fa fa-rss-square",
        "edit-delete" : "fa fa-ban",
        "setting" : "fa fa-wrench",
        "credentials" : "fa fa-key",
        "search" : "fa fa-search",
        "folder" : "fa fa-folder-open",
        "star" : "fa fa-star-o",
        "star-gold" : "fa fa-star picto-color-yellow",
        "clipboard" : "fa fa-clipboard",
        "up" : "fa fa-arrow-up",
        "previous" : "fa fa-arrow-left",
        "game-22x22" : "fa fa-gamepad",
        "monitor" : "icon-chart-2",
        "document-properties" : "fa fa-list-alt",
        "terminal" : [
            "fa fa-square fa-stack-2x",
            "fa fa-terminal fa-stack-1x fa-inverse"
        ],
        "new-computer" : "icon-list-add",
        "network" : "icon-flow-tree",
        "document" : "fa fa-file-text-o",
        "backup-48x48" : "fa fa-floppy-o",
        "system-log-out" : "fa fa-times-circle",
        "computer" : "fa fa-desktop",
        "plugin" : "fa fa-puzzle-piece",
        "orange-square" : "fa fa-gears",
        "save" : "fa fa-save",
        "secure" : "fa fa-lock",
        "refresh" : "fa fa-refresh",
        "help" : "fa fa-question-circle",
        "blue" : "build-status-icon blue",
        "yellow" : "build-status-icon orange",
        "red" : "build-status-icon red",
        "disabled" : "build-status-icon gray",
        "chain" : "fa fa-chain",
        "confighistory" : "fa fa-fast-backward"
    };

    var iconNotFound = function(iconName){
        this.iconName = iconName;
    };
    iconNotFound.prototype.toString = function(){
        return 'icon ' + this.iconName + ' was not found in ref' ;
    };

    var replaceImages = function() {
        jQuery('img').each(function (index, element) {
            var src = element.src;
            try {
                var regex = new RegExp("(?=[^/]+\\.[^/]{3,4}$).+", "g");
                src = regex.exec(src);
                src = src[0].split('.');
                var imageName = src[0];
                if (iconRef[imageName] !== undefined) {
                    if (Object.prototype.toString.call(iconRef[imageName]) === '[object Array]') { //Stack case
                        var iconStack = new Element('span');
                        jQuery(iconStack).addClass('fa-stack');
                        console.dir(iconRef[imageName]);
                        jQuery(iconRef[imageName]).each(function (index, item) {
                            var icon = new Element('i');
                            jQuery(icon).addClass(item).addClass('fa');
                            iconStack.appendChild(icon);
                        });
                        if (element.height) {
                            jQuery(iconStack).css('height', element.height + 'px');
                            jQuery(iconStack).css('font-size', element.height / 2);
                            jQuery(iconStack).css('display', 'inline-block');
                        }
                        if (element.width) {
                            jQuery(iconStack).css('width', element.width + 'px');
                            jQuery(iconStack).css('display', 'inline-block');
                        }
                        jQuery(element).after(iconStack);
                        jQuery(element).remove();
                        console.debug('icon ' + imageName + ' was replaced by a stack of icons "' + iconRef[imageName].join(',') + '"');
                    } else {

                        var icon = new Element('i');
                        jQuery(icon).addClass(iconRef[imageName]);

                        if (element.height) {
                            jQuery(icon).css('height', element.height + 'px');
                            jQuery(icon).css('font-size', element.height + 'px');
                            jQuery(icon).css('display', 'inline-block');
                        }
                        if (element.width) {
                            jQuery(icon).css('width', element.width + 'px');
                            jQuery(icon).css('display', 'inline-block');
                        }

                        jQuery(element).after(icon);
                        jQuery(element).remove();
                        console.debug('icon ' + imageName + ' was replaced by ' + iconRef[imageName]);
                    }
                } else {
                    throw new iconNotFound(imageName);
                }
            } catch (e) {
                if (e instanceof iconNotFound) {
                    console.warn(e.toString());
                } else {
                    console.warn('unable to process an image. Current src was ' + src + ' (' + e.toString() + ')');
                }
            }
        });
    };



    //Add css mark to the current view selected
    jQuery('#tasks').find('.task b').closest('.task').addClass('current');




    replaceBall.apply(this);
    replaceImages.apply(this);

    jQuery('body').on('DOMSubtreeModified',replaceBall).on('DOMSubtreeModified',replaceImages);

    //setInterval(replaceBall,400);


    // Copy auto-refresh link into footer
    $('footer').insert($('right-top-nav').innerHTML);
    // Replace auto-refresh link in breadcrumb with login links
    $('right-top-nav').update($('login-field').innerHTML);
    // Gather tables
    var tables = $$('body table');
    // Add footer-table class to last (footer) table
    tables[tables.length - 1].toggleClassName('footer-table');
    // Wrap main table with wrapper div to provide textures background between header and footer

    // Clear style attribute for main table
    $('main-table').setStyle({background:"none"});
    // Create table row with Rackspace logo and search field cells
    var logoRow = new Element('div').update('<div id="main-theme-logo"></div>');
    /*var searchRow = new Element('div').update('<form class="sidebar-search" action="extra_search.html" method="POST">'+
    '<div class="form-container">'+
    '<div class="input-box">'+
    '    <a href="javascript:;" class="remove">'+
    '    </a>'+
    '    <input type="text" placeholder="Search...">'+
    '        <input type="button" class="submit" value=" ">'+
    '        </div>'+
    '    </div>'+
    '</form>');*/
    // Prepend logo row to main table body
    $$('#breadcrumbs')[0].insert({
        before: logoRow
    });
    /*$$('#navigation div:first-child')[0].insert({
        after: searchRow
    });*/
    // Copy search form into search-wrap
   /*$('search-wrap').update($$('#top-panel table td:nth-child(2)')[0].innerHTML);
    // Grab searchbox
    var searchbox = $$('#search-wrap #searchform #search-box')[0];
    // Set search field input type to text
    searchbox.type = 'text';
    // Clear style attribute for search field
    searchbox.style = null;*/







    /*Ajax.Request = function (){}; */
});