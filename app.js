/**
 * Canon for Jenkins Javascript Overrides
 *
 * Leverages Jankins-included Prototype.js & jquery
 *
 * @author Rackspace Web Team
 * @version 0.1
 */
document.observe("dom:loaded", function () {
    // Copy auto-refresh link into footer
    $('footer').insert($('right-top-nav').innerHTML);
    // Replace auto-refresh link in breadcrumb with login links
    $('right-top-nav').update($('login-field').innerHTML);
    // Gather tables
    var tables = $$('body table');
    // Add footer-table class to last (footer) table
    tables[tables.length - 1].toggleClassName('footer-table');
    // Wrap main table with wrapper div to provide textures background between header and footer
    $('main-table').wrap('div', { 'id': 'main-table-wrap' });
    // Clear style attribute for main table
    $('main-table').setStyle({background:"none"});
    // Create table row with Rackspace logo and search field cells
    var logoRow = new Element('tr').update('<td colspan="2" id="rackspace-logo"></td><td id="search-wrap"></td>');
    // Prepend logo row to main table body
    $$('#main-table tbody :first-child')[0].insert({
        before: logoRow
    });
    // Copy search form into search-wrap
    $('search-wrap').update($$('#top-panel table td:nth-child(2)')[0].innerHTML);
    // Grab searchbox
    var searchbox = $$('#search-wrap #searchform #search-box')[0];
    // Set search field input type to text
    searchbox.type = 'text';
    // Clear style attribute for search field
    searchbox.style = null;
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
                console.dir(src);
                jQuery(element).addClass(className);
                var multiplesClasses = className.split('_');
                jQuery(multiplesClasses).each(function (index, item) {
                    jQuery(element).addClass(item);
                });
                element.src = blankGif;
            }
        });
    };

    replaceBall.apply(this);
});