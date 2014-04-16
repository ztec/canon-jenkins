/**
 * Canon for Jenkins Javascript Overrides
 *
 * Leverages Jankins-included Prototype.js & jquery
 *
 * @author Rackspace Web Team
 * @version 0.1
 */
document.observe("dom:loaded", function () {


    var blankGif = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';//blank gif
    jQuery('img[alt="Folder"]').attr('src', blankGif);
    var replaceBall = function (e) {
        var scope;
        if (e && e.target) {
            scope = jQuery(e.target);
        } else {
            scope = jQuery('body');
        }
        scope.find('img.build-status-icon, img.build-caption-status-icon').each(function (index, element) {
            if (element.src !== blankGif) {
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
        "user": "fa fa-users",
        "new-package": "fa fa-archive",
        "notepad": "fa fa-pencil-square-o",
        "gear": "fa fa-cog",
        "clock": "fa fa-play",
        "atom": "fa fa-rss-square",
        "edit-delete": "fa fa-ban",
        "setting": "fa fa-wrench",
        "credentials": "fa fa-key",
        "search": "fa fa-search",
        "folder": "fa fa-folder-open",
        "star": "fa fa-star-o",
        "star-gold": "fa fa-star picto-color-yellow",
        "clipboard": "fa fa-clipboard",
        "up": "fa fa-arrow-up",
        "previous": "fa fa-arrow-left",
        "game-22x22": "fa fa-gamepad",
        "monitor": "icon-chart-2",
        "document-properties": "fa fa-list-alt",
        "terminal": [
            "fa fa-square fa-stack-2x",
            "fa fa-terminal fa-stack-1x fa-inverse"
        ],
        "new-computer": "icon-list-add",
        "network": "icon-flow-tree",
        "document": "fa fa-file-text-o",
        "backup-48x48": "fa fa-floppy-o",
        "system-log-out": "fa fa-times-circle",
        "computer": "fa fa-desktop",
        "plugin": "fa fa-puzzle-piece",
        "orange-square": "fa fa-gears",
        "save": "fa fa-save",
        "secure": "fa fa-lock",
        "refresh": "fa fa-refresh",
        "help": "fa fa-question-circle",
        "blue": "build-status-icon blue",
        "blue_anime": "build-status-icon blue anime",
        "grey": "build-status-icon",
        "grey_anime": "build-status-icon anime",
        "yellow": "build-status-icon orange",
        "yellow_anime": "build-status-icon orange anime",
        "red": "build-status-icon red",
        "red_anime": "build-status-icon red anime",
        "disabled": "build-status-icon gray",
        "chain": "fa fa-chain",
        "clock_anime": "fa fa-clock-o anime",
        "diskusage48": "fa fa-hdd-o",
        "package": "fa fa-archive",
        "pmd-24x24": "fa fa-superscript",
        "dry-24x24": "fa fa-files-o",
        "clover_48x48": "fa fa-pagelines",
        "dialog-warning": "fa fa-exclamation-triangle",
        "move": "icon-move-2",
        "graph": "fa fa-bar-chart-o",
        "checkstyle-24x24": "fa fa-check-square",
        "confighistory": "fa fa-fast-backward"
    };

    var iconNotFound = function (iconName) {
        this.iconName = iconName;
    };
    iconNotFound.prototype.toString = function () {
        return 'icon ' + this.iconName + ' was not found in ref';
    };


    var getImgSize = function (img) {

        var size = {
            height: null,
            width: null
        };

        var regex = new RegExp("([0-9]*)x([0-9]*)", "ig");
        var classes = jQuery(img).attr('class');
        if (classes) {
            classes = classes.split(' ');
            jQuery(classes).each(function (index, item) {
                var result = regex.exec(item);
                if (result && result[1] && result[2]) {
                    size.height = result[1];
                    size.width = result[2];
                    console.debug('size class');
                }
            });
        }


        if (size.height === null && size.width === null) {
            if (jQuery(img).attr('height') !== null && jQuery.attr('width') !== null) {
                size.height = jQuery(img).attr('height');
                size.width = jQuery.attr('width');
                console.debug('size attribute');
            }
        }


        if (size.height === null && size.width === null) {
            size.height = img.height;
            size.width = img.width;
            console.debug('size file');
        }

        if (size.height === null && size.width === null) {
            var result = regex.exec(img.src);
            if (result && result[1] && result[2]) {
                size.height = result[1];
                size.width = result[2];
                console.debug('size url');
            }
        }

        if (size.height === null && size.width === null) {
            size.height = 32;
            size.width = 32;
            console.debug('size default');
        }
        size.height = parseInt(size.height, 10);
        size.width = parseInt(size.width, 10);

        //console.debug(size);
        return size;
    };

    var replaceImages = function (e) {
        var scope;
        if (e && e.target) {
            scope = jQuery(e.target);
        } else {
            scope = jQuery('img');
        }
        scope.each(function (index, element) {
            var src = element.src;
            var size = getImgSize(element);
            try {
                var regex = new RegExp("(?=[^/]+\\.[^/]{3,4}$).+", "g");
                src = regex.exec(src);
                src = src[0].split('.');
                var imageName = src[0];
                if (iconRef[imageName] !== undefined) {
                    if (Object.prototype.toString.call(iconRef[imageName]) === '[object Array]') { //Stack case
                        var iconStack = new Element('span');
                        jQuery(iconStack).addClass('fa-stack');
                        jQuery(iconRef[imageName]).each(function (index, item) {
                            var icon = new Element('i');
                            jQuery(icon).addClass(item).addClass('fa');
                            iconStack.appendChild(icon);
                        });
                        jQuery(iconStack).css('height', size.height + 'px');
                        jQuery(iconStack).css('font-size', size.height / 2);
                        //jQuery(iconStack).css('display', 'inline-block');

                        jQuery(iconStack).css('width', size.width + 'px');

                        jQuery(element).after(iconStack);
                        jQuery(element).remove();
                        //console.debug('icon ' + imageName + ' was replaced by a stack of icons "' + iconRef[imageName].join(',') + '"');
                    } else {

                        var icon = new Element('i');
                        jQuery(icon).addClass(iconRef[imageName]);

                        jQuery(icon).css('height', size.height + 'px');
                        jQuery(icon).css('font-size', size.height + 'px');
                        //jQuery(icon).css('display', 'inline-block');

                        jQuery(icon).css('width', size.width + 'px');

                        jQuery(element).after(icon);
                        jQuery(element).remove();
                        //console.debug('icon ' + imageName + ' was replaced by ' + iconRef[imageName]);
                    }
                } else {
                    throw new iconNotFound(imageName);
                }
            } catch (e) {
                if (e instanceof iconNotFound) {
                    //console.warn(e.toString());
                } else {
                    //console.warn('unable to process an image. Current src was ' + src + ' (' + e.toString() + ')');
                }
            }
        });
    };


    //Add css mark to the current view selected
    jQuery('#tasks').find('.task b').closest('.task').addClass('current');


    var onDomChange = function (e) {
        if (!e || e.handled !== true) {
            jQuery('body').off('DOMSubtreeModified');
            replaceBall.apply(this);
            replaceImages.apply(this);
            jQuery('body').on('DOMSubtreeModified', onDomChange);
            if (e) {
                e.handled = true;
            }
        }

    };

    onDomChange.apply(this);


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
    $('main-table').setStyle({background: "none"});
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