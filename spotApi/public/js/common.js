
var lo = []

lo.Spot = Backbone.Model.extend({
    defaults: {
      markerX: '450',
      markerY: '500',
      tip:'tooltip content'
    }
  });

lo.List = Backbone.Collection.extend({
    model: lo.Spot
  });

lo.HomeView = Backbone.View.extend({

    initialize:function(){
        $(this.el).on('click','.point', function(){
            $(this).next().fadeToggle()
        })
        $(this.el).on('click','.tip', function(){
            $(this).fadeOut()
        })

    },
    template:_.template($('#home').html()),
    events:{
      'click button': 'handleEvent'
    },
    handleEvent:function(){
        var hotspot = new lo.Spot()
        var xVal = $('#inputx').val(),
            yVal = $('#inputy').val()
        hotspot.set({part1: xVal,part2: yVal})
        var spotTip = hotspot.get('tip')
        $(this.el).append('<b style=position:absolute;top:'+xVal+'px;left:'+yVal+'px class=point-wrap><div class=point >x</div><div style=display:none class=tip /></b>')
        // this.initializeEvents()
    },
    render:function (eventName) {
        $(this.el).html(this.template());
        // $(this.el).append('<h1>enter coordinates</h1>').append('<input id=inputx />').append('<input id=inputy />').append('<button>save</button')
        return this;
    }

});


lo.AppRouter = Backbone.Router.extend({

    routes:{
        "":"home"
    },

    initialize:function () {
        $('head').append('<style>.point{cursor:pointer}.tip{background:#fff;height:100px;width:200px}</style>')
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        this.changePage(new lo.HomeView());
    },

    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        // We don't want to slide the first page
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }

});

$(function(){
    app = new lo.AppRouter();
    Backbone.history.start();
})
