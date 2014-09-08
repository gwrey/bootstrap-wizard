/*!
 * BootstrapWizard (http://bootstrapwizard.com)
 * Responsive wizard with expanding sub steps for Bootstrap 3
 *
 * @version     v0.1
 * @copyright   (c) 2014 Gregory Wrey
 * @license     MIT
 */
(function ($) {
    
    var BootstrapWizard = function(element, options) {
        this.$element   = $(element);
        this.options    = $.extend({}, $.fn.bootstrapWizard.DEFAULTS, options);
        this.$prev      = $([]);
        this.$current   = $([]);
        this.$next      = $([]);
        
        this.$nav = $('<nav class="navbar-default" role="navigation">'
                            +'<div class="wizard-nav-header visible-xs-block">'
                                +'<button type="button" class="navbar-toggle pull-left margin left" data-toggle="collapse" data-target=".wizard-nav">'
                                    +'<span class="sr-only">Toggle navigation</span>'
                                    +'<span class="icon-bar"></span>'
                                    +'<span class="icon-bar"></span>'
                                    +'<span class="icon-bar"></span>'
                                +'</button>'
                                +'<h3 class="wizard-nav-title"></h3>'
                            +'</div>'
                            +'<div class="wizard-nav collapse in">'
                            +'</div>'
                            +'<div class="progress hidden-xs">'
                                +'<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%">'
                                +'</div>'
                            +'</div>'
                        +'</nav>');

        this.$body = $('<div class="wizard-body">'
                            +'<div class="wizard-content">'
                            +'</div>'
                            +'<div class="wizard-footer">'
                                +'<div class="btn-toolbar">'
                                    +'<div class="btn-group">'
                                        +'<button class="btn btn-danger wizard-cancel" type="button">'+this.options.buttonText.cancel+'</button>'
                                    +'</div>'
                                    +'<button class="btn btn-success wizard-submit pull-right" type="button">'+this.options.buttonText.submit+'</button>'
                                    +'<button class="btn btn-primary wizard-next pull-right" type="button">'+this.options.buttonText.next+'</button>'
                                    +'<button class="btn btn-default wizard-back pull-right" type="button">'+this.options.buttonText.back+'</button>'
                                +'</div>'
                            +'</div>'
                        +'</div>');
                            
        this._init();
    };
    
    BootstrapWizard.prototype = {
        constructor: BootstrapWizard,

        _init: function() {
            var wizard          = this;
            var $navList        = this.$element.children('ul.nav-wizard'); //.addClass("navbar-nav")
            var progressHeight  = 0;
            
            // append the $nav and $body elements to the wizard
            // set the width and height
            this.$element.append(this.$nav, this.$body).css({
                "width":(this.options.width?this.options.width+"px":"auto"),
                "height":this.options.height+"px"
            });
            // move the $navList to the wizard-nav
            this.$nav.children(".wizard-nav").prepend($navList);
            
            var $wizardFooter   = this.$body.find(".wizard-footer");
            var $cancelButton   = $wizardFooter.find(".wizard-cancel");

            // set back, next, submit methods
            this.$backButton     = $wizardFooter.find(".wizard-back").on("click", this.back);
            this.$nextButton     = $wizardFooter.find(".wizard-next").on("click", this.next);
            this.$submitButton   = $wizardFooter.find(".wizard-submit").on("click", this.submit);
            // this.$nav.find(".navbar-toggle").on("click", function(event){
            //     $(this).parents("nav").find(".wizard-nav").collapse("toggle");
            // });

            // show the cancel button
            if ( this.options.cancelButton )
                $cancelButton.show();

            // hide the footer buttons
            if ( !this.options.footerButtons )
                $wizardFooter.find(".btn-toolbar").hide();

            // hide the progress bar
            if ( this.options.progressBar )
                progressHeight = this.$nav.find(".progress").outerHeight();
            else
                this.$nav.find(".progress").hide();

            var contentHeight = this.options.height - $wizardFooter.outerHeight() - 30;
            // var navListHeight = this.options.height - progressHeight - 30;

            this.$body.height((this.options.height-30)+"px");
            // $navList.height(navListHeight+"px");
            this.$body.find('.wizard-content').css({
                "height":contentHeight+"px",
                "overflow-y":"auto"
            }).append(
                this.$element.children('.wizard-pane').css("visibility","visible").hide()
            );

            /* metismenu - https://github.com/onokumus/metisMenu */
            $navList.find("li.active").has("ul").children("ul").addClass("collapse in");
            $navList.find("li").not(".active").has("ul").children("ul").addClass("collapse");
            $navList.find("li").has("ul").children("a").append('<span class="caret"></span>');

            // add listener to navlist
            $navList.on("click.bw", "li", function(event){
                event.preventDefault();
                event.stopPropagation();
                $li = $(this);
                if ( !$li.is(".visited") || $li.is(".disabled") )
                    return;

                $li.parents(".wizard").data("bootstrapWizard").show($li);
            });

            // add listener to window resize
            $(window).on("resize.bw", function(){
                $(".wizard").data("bootstrapWizard")._resize();
            });

            // show the wizard
            this.$element.css("visibility", "visible").show();
            this.show($navList.find("li:first"));
        },

        back: function(){
            var wizard = $(this).parents(".wizard").data("bootstrapWizard");
            wizard.show(wizard.$prev);
        },

        next: function(){
            var wizard = $(this).parents(".wizard").data("bootstrapWizard");
            wizard.show(wizard.$next);
        },

        show: function($li){

            var relatedTarget = this.$current;
            var relatedPane = this.$body.find( this.$current.find("a").attr("href") );

            // trigger the show event
            var e = $.Event('show.bw', {
                'relatedTarget': relatedTarget,
                'relatedPane': relatedPane
            });
            $li.trigger(e);
            if (e.isDefaultPrevented()) return;
            
            // if show was not prevented by listener
            // set $current to the nav li and add the visited and active classes
            this.$current = $li.addClass("visited active");
            // get the href for the current nav
            href = this.$current.find("a").attr("href");

            /* metismenu - https://github.com/onokumus/metisMenu */
            // remove the active class from siblings
            // collapse sublists on siblings
            this.$current.siblings().removeClass("active").children("ul.in").collapse("hide");
            // if current has a parent nav
            if ( ($parentNav = this.$current.parent("ul.collapse")).length ) {
                // set the parent as active and not collapsed
                $parentNav.collapse("show").parent("li").addClass("active").siblings().removeClass("active").children("ul.in").collapse("hide");
            }
            // get prev nav item
            this.$prev = this.$current.prevAll(":not(.disabled):first");
            // if there is no prev
            if ( !this.$prev.length ) {
                // set prev to parent
                this.$prev = this.$current.parents("li.active");
                if ( this.$prev.find("a").attr("href") == '' ) {
                    this.$prev = this.$prev.prevAll(":not(.disabled):first");
                }
            } else if ( ($childNav = this.$prev.children("ul")).length ) {
                // if prev has children set prev to the last child
                $childNav.find("li.active").removeClass("active");
                this.$prev = $childNav.children("li:not(.disabled):last");
            }

            if ( ($childNav = this.$current.children("ul")).length ) {
                // if current has children, show the child nav
                $childNav.collapse("show").find("li.active").removeClass("active");
                // set next to the first child
                this.$next = $childNav.children("li:not(.disabled):first");
                if ( href == '' ) {
                    // if current doesn't have a pane to display, no href,
                    // set current to next which is now the first child
                    this.$current = this.$next.addClass("visited active");
                    // now next needs to be reset from the new current
                    this.$next = this.$current.nextAll(":not(.disabled):first");
                    // get href from the new current
                    href = this.$current.find("a").attr("href");
                }
            } else {
                this.$next = this.$current.nextAll(":not(.disabled):first");
            }

            if ( !this.$next.length ) {
                // set next to the parents next nav
                this.$next = this.$current.parents("li.active").nextAll(":not(.disabled):first");
            }

            // only show the back button if there is a prev
            if ( this.$prev.length ) {
                this.$backButton.show();
            } else {
                this.$backButton.hide();
            }

            // only show submit on the last step
            if ( this.$next.length ) {
                this.$nextButton.show();
                this.$submitButton.hide();
            } else {
                this.$nextButton.hide();
                this.$submitButton.show();
            }

            // hide all the wizard panes
            this.$body.find(".wizard-pane:visible").hide();
            // display the current pane
            this.$body.find( href ).show();

            // if the mobile nav is displayed set the header
            if ( this.$nav.find(".wizard-nav-header").is(":visible") ) {
                var navTitle = this.$current.children("a").text();
                if ( ($parentNav = this.$current.parent("ul.collapse")).length ) {
                    navTitle = $parentNav.parent("li").children("a").text() + ' > ' + navTitle;
                }
                this.$nav.find("h3.wizard-nav-title").text(navTitle);
                this.$nav.find(".wizard-nav").collapse("hide");
            }

        },

        _resize: function() {
            console.log(this);
            if ( this.$nav.find(".wizard-nav-header").is(":visible") ) {
                this.$element.css({
                    "width":"auto",
                    "height": "560px"
                });
                this.$body.height((560 - this.$nav.find(".wizard-nav-header").outerHeight())+"px");
                this.$body.find('.wizard-content').height( (this.$body.innerHeight() - this.$body.find(".wizard-footer").outerHeight() - 30)+"px" );
                this.$nav.find(".wizard-nav").collapse("hide");
            } else {
                this.$nav.find(".wizard-nav").collapse("show");
            }
        },

        submit: function(){
            var wizard = $(this).parents(".wizard").data("bootstrapWizard");

            var relatedTarget = wizard.$current;
            var relatedPane = wizard.$body.find( wizard.$current.find("a").attr("href") );

            var e = $.Event('show.bw', {
                'relatedTarget': relatedTarget,
                'relatedPane': relatedPane
            });
            wizard.$current.trigger(e);
            if (e.isDefaultPrevented()) return;

            e = $.Event('submit.bw', {});
            $(this).trigger(e);
            if (e.isDefaultPrevented()) return;

        },

        markAllVisited: function(){
            this.$nav.find("li").addClass("visited");
        },

        serialize: function(){
            return this.$body.find(".wizard-pane form").serialize();
        },

        progress: function (percent) {
            this.$nav.find(".progress-bar")
                .attr('aria-valuenow', percent)
                .css('width', value + '%')
                children("span").text(percent + '%');
        }


    };

    $.fn.bootstrapWizard = function(option) {
        return this.each(function () {
            var $this   = $(this);
            var data    = $this.data('bootstrapWizard');
            var options = typeof option == 'object' && option;

            if (!data) {
                data = new BootstrapWizard(this, options);
                $this.data('bootstrapWizard', data);
            }
            if (typeof option == 'string') {
                data[option]();
            }
        })
    };

    $.fn.bootstrapWizard.DEFAULTS = {
        width: null,
        height: 300,
        cancelButton: false,
        footerButtons: true,
        progressBar: true,
        buttonText: {
            cancel: "Cancel",
            next: "Next",
            back: "Back",
            submit: "Submit",
        }
    };

    $.fn.bootstrapWizard.Constructor = BootstrapWizard;
    
}(jQuery));
