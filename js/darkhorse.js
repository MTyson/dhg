/*
* jquery.animate.clip.js
*
* jQuery css clip animation support -- Joshua Poehls
* version 0.1.4

* forked from Jim Palmer's plugin http://www.overset.com/2008/08/07/jquery-css-clip-animation-plugin/
* idea spawned from jquery.color.js by John Resig
* Released under the MIT license.
*/
(function (jQuery) {

    function getStyle(elem, name) {
        return (elem.currentStyle && elem.currentStyle[name]) || elem.style[name];
    }

    function getClip(elem) {
        var cssClip = $(elem).css('clip') || '';

        if (!cssClip) {
            // Try to get the clip rect another way for IE8.
            // This is a workaround for jQuery's css('clip') returning undefined
            // when the clip is defined in an external stylesheet in IE8. -JPOEHLS
            var pieces = {
                top: getStyle(elem, 'clipTop'),
                right: getStyle(elem, 'clipRight'),
                bottom: getStyle(elem, 'clipBottom'),
                left: getStyle(elem, 'clipLeft')
            };

            if (pieces.top && pieces.right && pieces.bottom && pieces.left) {
                cssClip = 'rect(' + pieces.top + ' ' + pieces.right + ' ' + pieces.bottom + ' ' + pieces.left + ')';
            }
        }

        // Strip commas and return.
        return cssClip.replace(/,/g, ' ');
    }

    jQuery.fx.step.clip = function (fx) {
        if (fx.pos === 0) {
            var cRE = /rect\(([0-9\.]{1,})(px|em)[,]?\s+([0-9\.]{1,})(px|em)[,]?\s+([0-9\.]{1,})(px|em)[,]?\s+([0-9\.]{1,})(px|em)\)/;

            fx.start = cRE.exec(getClip(fx.elem));
            if (typeof fx.end === 'string') {
                fx.end = cRE.exec(fx.end.replace(/,/g, ' '));
            }
        }
        if (fx.start && fx.end) {
            var sarr = new Array(), earr = new Array(), spos = fx.start.length, epos = fx.end.length,
                emOffset = fx.start[ss + 1] == 'em' ? (parseInt($(fx.elem).css('fontSize')) * 1.333 * parseInt(fx.start[ss])) : 1;
            for (var ss = 1; ss < spos; ss += 2) { sarr.push(parseInt(emOffset * fx.start[ss])); }
            for (var es = 1; es < epos; es += 2) { earr.push(parseInt(emOffset * fx.end[es])); }
            fx.elem.style.clip = 'rect(' +
                parseInt((fx.pos * (earr[0] - sarr[0])) + sarr[0]) + 'px ' +
                parseInt((fx.pos * (earr[1] - sarr[1])) + sarr[1]) + 'px ' +
                parseInt((fx.pos * (earr[2] - sarr[2])) + sarr[2]) + 'px ' +
                parseInt((fx.pos * (earr[3] - sarr[3])) + sarr[3]) + 'px)';
        }
    }
})(jQuery);

    jQuery.fn.urlHash = function() {
      return window.location.hash.replace('#','');
    };

jQuery.fn.center = function(parent) {
    if (parent) {
        parent = this.parent();
    } else {
        parent = window;
    }
    this.css({
        "position": "absolute",
        "top": ((($(parent).height() - this.outerHeight()) / 2) + $(parent).scrollTop() + "px"),
        "left": ((($(parent).width() - this.outerWidth()) / 2) + $(parent).scrollLeft() + "px")
    });
	return this;
}

$.fn.resize = function( w, h, speed, easing ) {
  w = ( undefined !== w ? w : 50 );
  h = ( undefined !== h ? h : 50 );
  
  var cw = this.width();
  var ch = this.height();

  if ( 'static' === this.css( 'position' ) ) {
    this.css( {
      'position'    : 'relative',
      'top'         : '0px',
      'left'        : '0px'
    } );
  }
  
  this.stop().width( cw ).height( ch ).animate( {
    'top'    : '+=' + ( (ch - h) / 2 ) + 'px',
    'left'   : '+=' + ( (cw - w) / 2 ) + 'px',
    'width'  : w + 'px',
    'height' : h + 'px'
  }, speed, easing);
};

var App = {
	spinnerVisible: false,
    navAttached: false,
    showProgress: function() {
		console.info("BEGIN showProgress");
        if (!this.spinnerVisible) {
            $("div#spinner").fadeIn("fast");
			this.spinnerVisible = true;
        }
    },
    hideProgress: function() {
        if (this.spinnerVisible) {
            var spinner = $("div#spinner");
            spinner.stop();
            spinner.fadeOut("fast");
            this.spinnerVisible = false;
        }
    },
    attachNavigation: function(){
      	// attach to main menu
        if (!App.navAttached){
            $('.bottom-item').on('click', function(event){
                App.navigate($(event.target).html());
            });
            $('body').on("click", function(event){
                if ($(event.target).hasClass("bg-div") || ($(event.target).prop("tagname") && $(event.target).prop("tagname").toLowerCase() == "body")) {
                    App.navigate(); 
                }
            });  
        }
        App.navAttached = true;
    },
	pageTransition: function(){
		var viewW = $(window).width(),
			viewH = $(window).height();
		var topDiv = $("<div />", {
			css: {
				position: "absolute",
				top: 0,
				left: 0,
				//width: viewW,
				height: "0px",
				backgroundColor: "black"
			}	
		}).addClass('blind'),
			bottomDiv = $("<div />", {
			css: {
				position: "absolute",
				top: viewH + "px",
				left: 0,
				//width: viewW,
				height: "0px",
				background: "url('backgrounds/image1.jpg') no-repeat center center"
			}
		}).addClass('blind');

		topDiv.appendTo($('body'));
		bottomDiv.appendTo($('body'));
		
		topDiv.animate({
			height: (viewH / 2) + "px"
		}, 2000, "easeOutCirc");
		
		bottomDiv.animate({
			top: (viewH / 2) + "px",
			height: (viewH / 2)
		}, 2000, "easeOutCirc");
		
	},
	openBlinds: function(op){
		/**
		 * @param op: "open" | "full"
		 */
		var viewW = $(window).width(),
			viewH = $(window).height();
		var topDiv = $("<div />", {
			css: {
				position: "absolute",
				top: 0,
				left: 1,
				width: viewW - 1,
				height: (viewH / 2) + "px",
				backgroundColor: "black"
			}	
		}),
			bottomDiv = $("<div />", {
			css: {
				position: "absolute",
				top: (viewH / 2) + "px",
				left: 1,
				width: viewW - 1,
				height: (viewH / 2) + "px",
				backgroundColor: "black"
			}
		});

		topDiv.appendTo($('body'));
		bottomDiv.appendTo($('body'));
		
		App.hideProgress();
		
		topDiv.animate({
			height: "0px"
		}, 700, "easeInOutQuint", function(){ topDiv.remove(); });
		
		return bottomDiv.animate({
			top: (viewH - 1),
			height: 1
		}, 700, "easeInOutQuint").promise().then( function(){
			bottomDiv.remove(); 
		}).promise();
	},
	navigate: function(target){	
    console.info("target: "+ target);
		
    $('.bg-div').hide("clip", {direction: "vertical"}, 1000, "easeOutQuart").promise().then(function(){
      $(".intro").remove();
      $(".bg-div").remove();
      App.showProgress();
      App.openPage(target);
    });
	},
	openPage: function(target){
		var viewW = $(window).width(), viewH = $(window).height();
		
    if (!target){
      var nextIsActive = false;
      for (var p in Pages){
          if (nextIsActive){
              target = p;
              break;
          } else if (Pages[p].active){
              nextIsActive = true;
          } 
      }
      if (!nextIsActive){
          for (var p in Pages){
              target = p;
              break;
          }
      }
    }
    console.info("calculated target: " + target);
    
    var targetParts = target.split(":");
    target = targetParts[0];
    
    page = Pages[target.toLowerCase()];
    page.setPath(targetParts);
    console.info("page: " + page);
    //activatePage() - move to OO class
    for (var p in Pages){
      Pages[p].active = false;
    }
    page.active = true;
    
    $('.bottom-item').each(function(x, item){ // Make menu item a member of Page
      $(item).removeClass('selected');
      if ($(item).html() == target.toUpperCase()) {
        $(item).addClass('selected');
      }
    });
    page.open();
	},
	openContent: function(contentId){
		$(".content-arrow").hide(800);
		//$(".content-box:not(#"+contentId+")").hide(800);
		var box = $('#'+contentId);
        box.addClass("detail");
        $(".content-box:not(#"+contentId+")").addClass("hidden");
		//$(".content-box:not(#"+contentId+")").hide("drop", {direction:'down'}, 800, "easeOutQuart");
/*
        box.find('.img-wrap, img, video').animate({
            width: 410,
            height: 230
        })	

        box.find('.summary').hide().promise().then(function(){
            box.find('.content').show("blind", {direction: "vertical"},1000);
        })
*/
        var btn = box.find('.button');
  //      btn.show();
        
        btn.html('BACK').off('click').on('click', function(e){
            var pageId = box.parent().attr("page-id");
            var page = PageManager.getPageById(pageId);
            var imgPad = 20;
            $(".content-arrow").show(800);
            $(this).off('click').on('click', function(e){
                $(this).off('click');
                App.openContent($(e.target).parent().prop("id"));
            });
            box.removeClass("detail");
            $(".content-box.visible:not(#"+contentId+")").removeClass("hidden");
            /*
            box.animate({ // TODO: Share with Page._open
                width: (page.smallBoxWidth), //page.thumbWidth,
                height: (page.smallBoxHeight)
                //width: box.hasClass('small') ? 210 : 270, //width: 210px; height: 190px;
                //height: box.hasClass('small') ? 190 : 340
            }).promise().then(function(){
                box.find('.summary').show("blind", {direction: "vertical"},1000);
                $(".content-box.visible:not(#"+contentId+")").show(800); /// ALERT
            });
            */
            /*
            box.find('.img-wrap, img, video').animate({
                width: (page.smallBoxWidth - imgPad), //page.thumbWidth,
                height: (page.smallBoxHeight / 2)
                //margin: (imgPad / 2)
                //width: box.hasClass('small') ? 200 : 260,
                //height: box.hasClass('small') ? 140 : 160
            })
            */
            if (box.find('video').length > 0){
                box.find('video').get(0).pause();
            }
            //box.find('.content').hide();
            if ($(this).hasClass('hidden')){
                $(this).hide();
            }
            $(this).html("READ MORE");
        });
	},
  darkhorseLogo: function(initial){
  },
	intro: function(initial){
		// TODO: Make all transitions consistent
		/*$('.bg-div').remove();
		if (initial){
			this.openBlinds().then(App.darkhorseLogo);
		} else {
			App.darkhorseLogo(initial);
		}
        */
        if (window.currentAudio && window.currentAudio.pause) window.currentAudio.pause();
        window.currentAudio = new Audio('audio/darkhorse-theme.mp3');
        window.currentAudio.volume = .8;
        window.currentAudio.play();
        var dhLogo = $('<img src="images/dh-logo-2.jpg" style="max-height: 75vh; min-height:360px; display: none;" id="darkhorse-logo"/>'); // TODO: Move styles to .css
        $(".content-wrap").css({"display":"none"});
        $(".bg-div").append(dhLogo);
        
        setTimeout(function(){
            $("#darkhorse-logo").fadeIn(4000, "easeInSine");
            setTimeout(function(){

                $("#darkhorse-logo").fadeOut(500, "easeOutSine", function(){
                    App.navigate();
                });
               
            }, 5000);
        }, 2000);
	},
    afterOverview: function(){
        if (window.currentAudio && window.currentAudio.pause) window.currentAudio.pause();
        window.currentAudio = new Audio('audio/harrison-darkhorse-short.mp3');
        window.currentAudio.volume = .6;
        window.currentAudio.play();
       /*setTimeout(function(){
           $("#overview").hide('slide', {direction: 'left'}, 500, function(){
               App.navigate();
           });
       }, 3500);   */
       //window.afterglow.init();
       //plyr.setup("#harrison-darkhorse");
       videojs("harrison-darkhorse", {
        children: {
         controlBar: {
           children: {
             playToggle: true,
             fullscreenToggle: true,
             currentTimeDisplay: false,
             timeDivider: false,
             durationDisplay: false,
             remainingTimeDisplay: true,
             muteToggle: false,
             progressControl: {
               children: {
                 seekBar: {
                     
                 }
               }
             }
           }
         }
        }
        }, function(){
            console.log("vid: " + this);
            this.on("play", function(){
                window.currentAudio.play();
            });
            //this.on("pause", function(){
            //   window.currentAudio.pause();
            //});
            this.controlBar.playToggle.on("click", function(){
                window.currentAudio.pause();
            });
        });
        var overviewText = $(".overview .text");
        var ovTextRight = overviewText.offset().left + overviewText.width();
        var contentArrow = $(".overview .content-arrow");
        contentArrow.css({left: (ovTextRight+contentArrow.width())});
        
        var arrow = $("<div class='content-arrow' style='position: absolute;' onclick='App.navigate()'>&gt;</div>");
        arrow.css({"right":"10px"})
        $(".bg-div").append(arrow);
    },
    afterExpand: function(){
       App._initVideos(".expand .content-box video");
    },
    afterWorld: function(){
        App._initVideos(".world .content-box video");
    },
    _initVideos: function(rootSelector){
      $(rootSelector).each(function(count, el){
       var $el = $(el);
       var id = $el.attr("id");
       id = (id ? id : "video-" +(Math.floor(Math.random() * 1000) + ""));
       $el.attr("id", id);
       var player = videojs(id, {}, function(){
           console.info("video ready: " + id);
           var overlay = $("<div>").addClass("video-overlay");
           var video = $("#"+id);
           var overlayId = video.attr("id") + "-overlay";
           overlay.attr("id", overlayId);
           console.info("video.position(): " + video.position());
           overlay.css({"top":video.position().top,"left":video.position().left,"width":video.width(),"height":video.height()});
           overlayContent = $("<p>");
           var videoEl = video.find("video");
           var overlayText = videoEl.data("overlay") != null ? videoEl.data("overlay") : "";
           overlayContent.html(overlayText);
           overlay.append(overlayContent);
           video.parent().append(overlay);
           
           this.on("play", function(){
                $("#"+overlayId).css({display: "none"});
            });
            this.on("pause", function(){
               $("#"+overlayId).css({display: ""});
            });

       });
     });
    }
}

// small box: 270x340
// big box: 428x480
// small content images = 260x160 (+5 padding)
// large content images = 410x230 (+ 5 padding all around
function Page() {
	this.minWidth = 940;
    this.wrapWidth = null;
	this.wrapJustify = null;
    this.boxCount = null;
	this.maxBoxes = null;
    this.smallBoxWidth = null;
    this.smallBoxHeight = null;
    this.thumbWidth = null;
    this.thumbHeight = null;
	for (var n in arguments[0]) { this[n] = arguments[0][n]; }
    this.path = [];
}
Page.prototype.setPath = function(path){
    this.path = path;
}
Page.prototype.doPath = function(){
    // no op default
}
Page.prototype.open = function(){
  console.info("BEGIN Page.open");
	var page = this; // TODO: Switch to using this keyword properly (refactor)
	
	var viewW = $("body").width(),
		viewH = $("body").height();
	var bgDiv = $('<div />').css({
		position:'absolute',
		padding: "0px 0px 0px 0px",
		margin: "0px 0px 0px 0px",
		top: (viewH / 2), left: 0,
		width: viewW,
		height: "0px"
		//backgroundImage: "url('"+page.bg+"')",
		//backgroundSize:"cover"
	}).attr('id', 'bg-div').addClass('bg-div').addClass(page.wrapClass);
  $('body').prepend(bgDiv);
  // ensure image is loaded before display 
  var bgPreLoader = $('#bg-img-'+page.id);
  console.info('#bg-img-'+page.id);
  if (bgPreLoader.length > 0){
    page._openAfterBgLoad.bind(page)();
  } else {
    var bgUrl = bgDiv.css('background-image');
    bgUrl = bgUrl.replace('url(','').replace(')','').replace(/\"/gi, "");
    console.info("bgUrl: "+bgUrl);
    $('body').append("<img src='"+bgUrl+"' id='bg-img-"+page.id+"' style='opacity: 0; display: none;'/> ");
    $("#bg-img-"+page.id).load(function() {
      page._openAfterBgLoad.bind(page)();
    });
  }
}
Page.prototype._openAfterBgLoad = function(){
  console.info("BEGIN Page._openAfterBgLoad");
	var viewW = $("body").width(),
  viewH = $("body").height();
	App.hideProgress();
    
  $('#bg-div').animate({
    "height": viewH,
    "top": "0px"
	}, 700, "easeOutQuart").promise().then( function(){
    this.css({"min-height:":"100%","min-width":"100%"}).css({"height":"","width":""}); // ensures bg resizes with page
		if (page.intro){
      page.intro(this);
    } else {
       page._openAfterBlind();
    }
	});
    
  App.attachNavigation(); // make OO
}
Page.prototype._openAfterBlind = function(){
    console.info("BEGIN _openAfterBlind");
    var page = this;
    // make actual background the bg-div, so when we animate the new bg-div, it will be there
    $('html').css({
      background: "url('"+page.bg+"') no-repeat center center",  // url('backgrounds/image1.jpg')
      backgroundSize: "cover"
    })
    
    var contentWrap = $('<div class="content-wrap" />');
    if (page.wrapClass){
      contentWrap.addClass(page.wrapClass);
    }
    contentWrap.attr("page-id", page.id);
    contentWrap.css({
      'width': page.wrapWidth,
      'height': page.wrapHeight,
      'justify-content': page.wrapJustify
    })
    $('.bg-div').append(contentWrap);
    
    if (page.maxBoxes){
      /*
      var arrow = $("<div class='content-arrow'>&lt;</div>");
      arrow.on('click', function(e){
          var edgeVisible = $('.content-box.visible').first(),
              toShow = $('.content-box').eq(Number(edgeVisible.attr('box-count')) - 1);
          if (Number(edgeVisible.attr('box-count')) - 1 >= 0){					
              $('.content-box.visible').last().hide("blind", {direction:"left"}, 600, 'easeOutQuart').removeClass('visible');
              toShow.show("blind", {direction:"left"}, 600, 'easeOutQuart').addClass('visible');
          }
      })
      contentWrap.append(arrow);
      */
    }
    
    if (page.init){
      page.init();
    }

    // set content
    if (page.html){
      contentWrap.html(page.html);
    } else {
      for (x in page.content){
        var box = $("<div />").addClass('content-box').addClass(page.contentClass).prop("id", page.content[x].id).css({
          //width: page.smallBoxWidth, height: page.smallBoxHeight
        });
            
        box.attr('box-count', x);
        if (Number(x) === (page.content.length-1)){
            box.attr('box-last', "true");
        }
        
        if (page.content[x].image){
          var img = $("<img />");
          var src = typeof page.content[x].image === 'string' ? page.content[x].image : page.content[x].image.src;
          img.attr("src", src);
          
          var imgPad = 20;
          
          var imgWrap = $("<div />").addClass('img-wrap').css({
            // width: (page.smallBoxWidth - imgPad), //page.thumbWidth,
            //height: (page.smallBoxHeight / 2),
            //margin: (imgPad / 2)
            //width: box.hasClass('small') ? 210 : 270, //width: 210px; height: 190px;
            //height: box.hasClass('small') ? 190 : 340
          });
            
            /*
            if (typeof page.content[x].image === "object"){
                img.css({
                    //width: page.content[x].image.width,
                    //height: page.content[x].image.height
                    height: "100%"
                })
                imgWrap.css({
                    width: page.content[x].image.width,
                    height: page.content[x].image.height
                })
                /*img.on('click', function(){
                    page.content[x].image.onClick($(this).parent().prop('id'));
                });
                
            }
            imgWrap.on('click', function(){
                App.openContent($(this).parent().attr('id'));
            });
            */
            imgWrap.append(img);
            box.append(imgWrap);
        }
        if (page.content[x].video){
            var imgWrap = $("<div />").addClass('img-wrap');
            imgWrap.css({
                width: page.content[x].video.width,
                height: page.content[x].video.height
            })
            box.append(imgWrap);
            
            var video = $('<video id="example_video_1" class="video-js vjs-default-skin" ' +
              'controls preload="auto" width="'+page.content[x].video.width+'" height="'+page.content[x].video.height+'" ' +
              'poster="'+page.content[x].video.thumb+'"> ' +
              '<source src="'+page.content[x].video.src+'" type="video/webm"/> ' +
              '<source src="http://video-js.zencoder.com/oceans-clip.webm" type="video/webm" /> ' +
              '<source src="http://video-js.zencoder.com/oceans-clip.ogv" type="video/ogg" /> ' +
              '</video>');
              /*
            var video = $('<video id="my_video_1" class="video-js vjs-default-skin" controls preload="auto" width="'+page.content[x].video.width+'" height="'+page.content[x].video.height+'"></video>');
            player = videojs('my_video_1', {
                techOrder: ['flash', 'html5'],
                autoplay: false,
                sources: [{ 
                    type: "video/flv",
                    src: "http://www.longtailvideo.com/jw/upload/bunny.flv"
                }]
            });
            */
            
            imgWrap.append(video);
            
            imgWrap.on('click', function(){
                App.openContent($(this).parent().attr('id'));
            });
        }
        
        if (page.content[x].title)
            box.append("<p class='title'>"+page.content[x].title+"</p>");
        if (page.content[x].subtitle)
            box.append("<p class='subtitle'>"+page.content[x].subtitle+"</p>");
        if (page.content[x].summary)
            box.append("<p class='summary'>"+page.content[x].summary+"</p>");
        if (page.content[x].content)
            box.append("<div class='content'>"+page.content[x].content+"</div>");
        if (page.button){
            var btn = $("<div class='button'>READ MORE</div>");
            if (page.button === "hidden"){
                btn.addClass('hidden');
            }
            btn.on('click', function(e){
                $(this).off('click');
                App.openContent($(e.target).parent().prop("id"));
            });
            box.append(btn);
        }
        
        contentWrap.append(box);
        //$('#bg-div').append(box);					
      }
    }
    
    if (page.maxBoxes){
        var arrow = $("<div class='content-arrow'>&gt;</div>");
        arrow.on('click', function(e){
            // TODO: ALERT: Hijacked this to make page navigation on arrows
            App.navigate(); return;
            var lastVisible = $('.content-box.visible').last(),
                isLast = lastVisible.attr('box-last'),
                lastCount = lastVisible.attr('box-count');
            console.info('lastCount: ' + lastCount);
            if (!isLast){
                $('.content-box.visible').first().hide("blind", {direction:"left"}, 600, 'easeOutQuart').removeClass('visible');
                $('.content-box').eq(new Number(lastCount)+1).show("blind", {direction:"left"}, 600, 'easeOutQuart').addClass('visible');
            }
        })
        contentWrap.append(arrow);
    }
    
    var boxSelector = '.content-box' + (page.contentClass ? "."+page.contentClass : "");
    $(boxSelector).slice(0, page.maxBoxes ? page.maxBoxes : 1000).each(function(x, e){
        $(e).addClass('visible');
    });
    /*.fadeIn().promise().then( function(){
        $(boxSelector + ' img.preview').show('blind', {direction:'left'});
    });
    */
  
    if (page.functions){
        for (x in page.functions){
            page.functions[x]();
        }
    }
    this.resize();
    this.doPath();
}
Page.prototype.resize = function(){
	var viewW = $(window).width(),
		viewH = $(window).height();
		
	if (viewW >= this.minWidth){
		return;
	}
	
	var boxPadding = 10,
		pagingArrows = 100;
	var boxW = (viewW / this.boxCount) - (boxPadding + this.boxCount) - pagingArrows;
/*
	$('.content-box').animate({
		'width': boxW
		//,'height': h
	});
    */
    /*
	var origImgW = this.thumbWidth,
		origImgH = this.thumbHeight,
		imgRatio = origImgW / origImgH;
	$('.content-box .img-wrap, .content-box img').css({
		'width': boxW-10
		//,'height': (w / imgRatio) - 10
	})
    */
}
var PageManager = {
    getPageById: function(id){
        for (var p in Pages){
            if (Pages[p].id == id){
                return Pages[p];
            }
        }
    }
}
// TODO: Auto-calculate the ID
var Pages = {
	"intro": new Page({
		id: 1,
        wrapClass: "intro",
		//bg: "images/slate-gradient-1425x960-60.jpg",
		functions: [
			App.intro.bind(App)
		],
    active: true
	}),
    "overview": new Page({
		id: 2,
		bg: "images/dh-logo-no-text.jpg",
        wrapClass: "overview",
		html: //"<div id='overview'>"+
    "<div class='content-box text'><h2 style='margin-top: .6em;'>dark horse tek &ensp;<br> /ˈdärk ˈˌhôrs tek/</h2><h3>Definition: <span style='margin-bottom: 0px;font-style:italic;'> noun</span></h3>" +
          "<p style='margin-top: .9em; margin-bottom: .6em'>A dark horse is a little-known person or thing that emerges to prominence, especially in a competition of some sort, or a contestant that seems unlikely to succeed.</p><p>Unlike traditional unicorns, darkhorse.tech consistently embodies and delivers on the promise of excellence and success, creating platinum level, dynamic technologies that empower its users, its investors and the world.</p>"+
    "</div>"+
          "<div class='content-box' style='height: 140px;text-align:center;padding-top:0px;padding-bottom:0px;display:flex;flex-direction:row;align-items:center;justify-content:space-around;' id='dh-video'>"+
            "<img src='images/OM.png' style='width: 7vw; inline-block;' />"+
            "<video id='harrison-darkhorse' class='video-js vjs-default-skin' autoplay='true' controls style='' muted preload='auto' poster='' width='150'><source src='video/gh-dh-edit.webm' type='video/webm' /></video>" + 
      "<img src='images/OM.png' style='width: 7vw;inline-block;padding-right:5%;'/>",
     // "</div>",
      functions: [
         App.afterOverview
      ]
	}),

    /*
    style=\"\r\n" + 
				"    display: block;\r\n" + 
				"    height: 130px;\r\n" + 
				"    text-align: center;\r\n" + 
				"    padding: 0px;\r\n" + 
				"\" 
                */
	"home": new Page({
		id: 3,
		bg: "images/dh-logo-no-text.jpg",
		button: true,
		wrapJustify: "center",
    wrapClass: "home",
		boxCount: 3,
		maxBoxes: 3,
    doPath: function(){
      //alert('ok');
      if (this.path != null && this.path.length > 1){
        var contentTarget = this.path[1];
        setTimeout(function(){
            App.openContent(contentTarget);
        }, 250);
      }
    },//+ "<a href='#' onclick='App.openContent(\"development\");return false;'>MORE</a>"
		content: [
			{ id: "development", image: "images/programmingdarkhorseweb1.jpg", title: "DEVELOPMENT", subtitle: "CREATE", summary: "Helping you decipher and discover, deeper drives and desires, helping you express yourself in the world and on the web.", content: "By staying very present and listening to the desired outcome of every job, we quickly, elegently create a new dynamic source of energy for your project and your vision, leaving you proud, relieved and empowered." },
			{ id: "articles", image: "images/darkhorsearticles-500.jpg", title: "ARTICLES", subtitle: "IN DEPTH", summary: "Read some of our articles that have been featured on the cover of JavaWorld and IBM's developerWorks, and other articles of interest.", content: "<div style='text-align:left;'><h3>IBM's developerWorks</h3>"+            
        "<p><a href='http://www.ibm.com/developerworks/opensource/library/j-use-elasticsearch-java-apps/index.html'>Elastic Search, Java and the Cloud</a></p>"+
        "<p><a href='http://www.ibm.com/developerworks/library/wa-develop-vue1-bluemix/index.html'>Vue.js in the Cloud</a></p>"+
        "<p><a href='http://www.ibm.com/developerworks/library/wa-develop-vue2-bluemix/index.html'>Vue.js on BlueMix</a></p>"+
        "<p><a href='http://www.ibm.com/developerworks/library/wa-use-jspm-javascript-modules/index.html'>Modern JavaScript Modules</a></p>"+
        "<h3>JavaWorld</h3>"+
        "<p><a href='http://www.javaworld.com/article/2995526/development-tools/jump-into-java-micro-frameworks-part-1.html'>Java Micro-Service Frameworks</a></p>"+
        "<p><a href='http://www.javaworld.com/article/3008117/development-tools/jump-into-java-microframeworks-part-2-ninja.html'>Java Ninja Framework</a></p>"+
        "<p><a href='http://www.javaworld.com/article/3019792/development-tools/jump-into-java-microframeworks-part-3-spark.html'>Java Spark</a></p>"+
        "<p><a href='http://www.javaworld.com/article/3045300/application-development/jump-into-java-microframeworks-part-4-play.html'>Java Play Framework</a></p>"+
        "<p><a href='http://www.javaworld.com/article/2077874/open-source-tools/the-pathproxy-pattern--persisting-complex-associations.html'>The Path Proxy Pattern</a></p>"+
        "<p><a href='http://www.javaworld.com/article/2077808/design-patterns/the-ajaxcomponent-strategy-for-jsf--the-best-of-both-worlds.html?page=7'>Ajax Component Strategy</a></p>"+
        "</div>"},
      { id: "expansion", image: "images/darkhorse-imagine.jpg", title: "EXPANSION", subtitle: "GREATER CLARITY", summary: "Our coaching and consultation services help bring new aspects of yourself and your image into sharper focus.", content: "By staying very present and listening to the desired outcome of every job, we quickly, elegently create a new dynamic source of energy for your project and your vision, leaving you proud, relieved and empowered." }
		]
	}),
    "world": new Page({
		id: 4,
		bg: "images/earth-1900x1280.jpg",
    wrapClass: "world",
		html: //"<div id='world'>"+
                ""+
                  "<div class='content-box text'><div style='text-align: center; font-size: 1.4em;'>Change the World</div>"+
                    "<p style='text-align:left;'><span style='font-size:1.7em'>O</span>ne of the greatest things about living in this time is the web. We have the ability to connect, empower and share our money, our love, and our insights with others.</p>"+
                    "<p style='text-align:left;'><span style='font-size:1.7em'>S</span>ince 2005, from the environment to terminal illness, from societies in desperate need to the homeless, we have consciously used not only the proceeds from the profits of our company, but have engaged in hands-on action.</p>"+
			      "</div>"+
                  "<div class='video-holder' style='display: flex;'>"+
                  "<div class='content-box video'>"+
                    "<video id='' class='video-js vjs-default-skin vjs-big-play-centered vjs-fluid' data-overlay='Arnold and Climate Change' controls preload='auto' width='' height='100%' poster='video/arnold-climate-poster.png'>"+
                      "<source src='video/Arnold climate.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='' class='video-js vjs-default-skin vjs-big-play-centered vjs-fluid' data-overlay='Before the Flood' controls preload='auto' width='' height='100%' poster='video/before-flood-poster.jpeg'>"+
                      "<source src='video/before-flood.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  /*
                  "<div class='content-box video'>"+
                    "<video id='' class='video-js vjs-default-skin vjs-big-play-centered' controls preload='auto' width='' height='100%' poster='video/home-poster.jpeg'>"+
                      "<source src='video/HOME.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  */
                  "<div class='content-box video'>"+
                    "<video id='' class='video-js vjs-default-skin vjs-big-play-centered vjs-fluid' data-overlay='Resonance' controls preload='auto' width='' height='100%' poster='video/resonance-poster.jpeg'>"+
                      "<source src='video/resonance-short.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "</div>"+
                "</div>",
              //"<div>",
       functions: [
                   App.afterWorld
                ]
	}),
    "expand": new Page({
		id: 4,
        wrapClass:"expand",
		bg: "images/snowmoonsandiego2017.jpg",
		html: 
                  //"<div class='video-holder' style='display: flex; flex-direction: row;'>"+
                  "<div class='content-box video'>"+
                    "<video id='expand1' class='video-js vjs-default-skin vjs-big-play-centered' data-overlay='George Michael' controls preload='auto' width='' height='100%' poster='video/george michael queen poster.jpg'>"+
                      "<source src=\"video/george michael queen.webm\" type='video/webm'/>" +
                      "<source src=\"http://vjs.zencdn.net/v/oceans.mp4\" type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='expand2' class='video-js vjs-default-skin vjs-big-play-centered' data-overlay='The Beatles Rooftop Concert' controls preload='auto' width='' height='100%' poster='video/rooftop-poster.jpeg'>"+
                      "<source src='video/beatles.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='expand3' class='video-js vjs-default-skin vjs-big-play-centered' data-overlay='Wayne Dyer' controls preload='auto' width='' height='100%' poster='video/wayne.jpg'>"+
                      "<source src='video/Wayne Dyer 10 principles.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  /*
                  "<div class='content-box video'>"+
                    "<video id='' class='afterglow' controls preload='auto' width='' height='100%' poster='video/home-poster.jpeg'>"+
                      "<source src='video/HOME.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  */
                  "<div class='content-box video'>"+
                    "<video id='expand4' class='video-js vjs-default-skin vjs-big-play-centered' data-overlay='Elvis Comeback' controls preload='auto' width='' height='100%' poster='video/elvis.jpg'>"+
                      "<source src='video/elvis-comeback.mp3' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='expand5' class='video-js vjs-default-skin vjs-big-play-centered' data-overlay='Man in the Mirror' controls preload='auto' width='' height='100%' poster='video/michael-poster.jpg'>"+
                      "<source src='video/Michael Man in the Mirror.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>",
                //"</div>"
                functions: [
                   App.afterExpand
                ]
	}),
    /*
     "expand": new Page({
		id: 5,
		bg: "images/snowmoonsandiego2017.jpg",
        wrapClass: 'expand',
        wrapHeight: '100%',
        wrapWidth: '80vw',
		html: 
                  "<div class='content-box text' style='text-align: center; font-size: 2em;width:100%;height:40px;align-self:flex-start;margin-top:2em;'>EXPAND</div>"+
                  "<div class='video-holder' style='display: flex;width:100%;'>"+
                  "<div class='content-box video'>"+
                    "<video id='' class='afterglow' controls preload='auto' poster='media_gallery/video/thumb1.jpg'>"+
                      "<source src='media_gallery/video/Leo1.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='' class='afterglow' controls preload='auto' poster='media_gallery/video/thumb2.jpg'>"+
                      "<source src='media_gallery/video/David R Hawkins On Infinite Potentiality.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='' class='afterglow' controls preload='auto' width='' height='100%' poster='media_gallery/video/thumb3.jpg'>"+
                      "<source src='media_gallery/video/Ramtha_Be_Your_Own_Savior.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "<div class='content-box video'>"+
                    "<video id='' class='afterglow' controls preload='auto' poster='media_gallery/video/11th_hour_thumb.jpg'>"+
                      "<source src='media_gallery/video/11th_Hour_Trailer.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                   "<div class='content-box video'>"+
                    "<video id='' class='afterglow' controls preload='auto' poster='media_gallery/video/Sweet_Lord_thumb.jpg'>"+
                      "<source src='media_gallery/video/George_Harrison_My_Sweet_Lord.webm' type='video/webm'/>" +
                    "</video>"+
                  "</div>"+
                  "</div>"+
                "</div>"       
	})
    */
    /*
	"expand": new Page({
		id: 5,
		bg: "images/snowmoonsandiego2017.jpg",
		contentClass: "small",
		wrapWidth: "100vw",
		wrapJustify: "left",
		button: "hidden",
		content: [
            //{ id: "foo", title: "Expand Your World", height: 150, width: 1200 },
			{ id: "video-1", title: "Leonardo DiCaprio", video: {src: "media_gallery/video/Leo1.webm", thumb: "media_gallery/video/thumb1.jpg", height: 140, width: 200, onClick: App.openContent } },
			{ id: "video-2", title: "David Hawkins", video: {src: "media_gallery/video/David R Hawkins On Infinite Potentiality.webm", thumb: "media_gallery/video/thumb2.jpg", height: 140, width: 200, onClick: App.openContent } },
			{ id: "video-3", title: "Ramtha", video: {src: "media_gallery/video/Ramtha_Be_Your_Own_Savior.webm", thumb: "media_gallery/video/thumb3.jpg", height: 140, width: 200, onClick: App.openContent } },
			{ id: "video-4", title: "The 11th Hour", video: {src: "media_gallery/video/11th_Hour_Trailer.webm", thumb: "media_gallery/video/11th_hour_thumb.jpg", height: 140, width: 200, onClick: App.openContent } },
			{ id: "video-5", title: "George Harrison", video: {src: "media_gallery/video/George_Harrison_My_Sweet_Lord.webm", thumb: "media_gallery/video/Sweet_Lord_thumb.jpg", height: 140, width: 200, onClick: App.openContent } }
		]
	}),
    
	"contact": new Page({
		id: 6,
		bg: "backgrounds/marmaid-bg.jpg",
		html: "<div id='contact'><div style='text-align: left;'>CONTACT</div>"+
			"<div class='content-box'><form>"+
			"<input id='name' name='name' type='text' placeholder='Name'></input>"+
			"<input id='email' name='email' type='text' placeholder='Email'></input>"+
			"<input id='subject' name='subject' type='text' placeholder='Subject'></input>"+
			"<textarea id='message' name='message' type='text' placeholder='Message'></textarea><br>"+
			//"<button type='reset'>Clear</button><button type='submit'>Send</button>"+
			"<div class='button'>CLEAR</div>"+"<div class='button'>SEND</div>"+
			"<br><div class='contact-footer'>You can reach me at the following:<br>Phone: 800-610-1013<br>Email: thebindi@gmail.com</div>"+
			"</form></div>"+
			"</div>"
	})
    */
};

$(document).ready(function () {
	App.showProgress();
    
    var menuHolder = $("#bottom-menu");
    for (var p in Pages){
        menuHolder.append($('<span class="bottom-item divider">'+p.toUpperCase()+'</span>'));
    }
    $("#bottom-menu .bottom-item").first().addClass("selected");
    $("#bottom-menu .bottom-item").last().removeClass("divider");
    /*<span class="bottom-item divider selected">INTRO</span>
			<span class="bottom-item divider">HOME</span>
			<span class="bottom-item divider">INSPIRATION</span>
			<span class="bottom-item">CONTACT</span>*/
     
    var pageName = $.fn.urlHash();
    pageName = pageName ? pageName : "intro";
    App.openPage(pageName);      
    //Pages["intro"].open();
    
    /*
    var bgImg = "images/slate-gradient-1900x1280-60.jpg";
	$('body').append("<img src='"+bgImg+"' id='intro-bg-img' style='opacity: 0; display: none;'/> ");
	$('#intro-bg-img').load(function() {
	//	$(this).css('opacity', 1);
		$('html').css({
			background: "url('"+bgImg+"') no-repeat center center",  
			backgroundSize: "cover"
		})
		App.intro(true);
	});
    */
    /*
    $(window).resize(function () { 
        var bgDiv = $(".bg-div");
        if ()
    });
*/
});