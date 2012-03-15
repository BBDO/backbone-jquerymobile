  var Spot = Backbone.Model.extend({
    defaults: {
      markerX: 'k5',
      markerY: 'spot'
    }
  });

  var List = Backbone.Collection.extend({
    model: Spot
  });

  window.HomeView = Backbone.View.extend({

    template:_.template($('#home').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

window.Page1View = Backbone.View.extend({
    tagName:'li',
    template:_.template($('#page1').html()),
    events:{
      'click button': 'handleEvent'
    },
    handleEvent:function(){
        var hotspot = new Spot()
        var xVal = $('#inputx').val(),
            yVal = $('#inputy').val()
        hotspot.set({part1: xVal,part2: yVal})
        var x = hotspot.get('part1')
            y = hotspot.get('part2')
        this.showTip(x,y)
        $(this.el).append('<div class=point style=position:absolute;top:'+x+'px;left:'+y+'px >x</div>')
    },
    showTip:function(x,y){
        // $(this.el).append('<div class=tip style=position:absolute;top:'+markerX+'px;left:'+markerY+'px >tool tip content</div>')
    },
    render:function (eventName) {
        $(this.el).html(this.template());
        $(this.el).append('<h1>enter coordinates</h1>').append('<input id=inputx />').append('<input id=inputy />').append('<button>save</button')
        return this;
    }
});

window.Page2View = Backbone.View.extend({

    template:_.template($('#page2').html()),

    render:function (eventName) {
        $(this.el).html(this.template());
        return this;
    }
});

var AppRouter = Backbone.Router.extend({

    routes:{
        "":"home",
        "page1":"page1",
        "page2":"page2"
    },

    initialize:function () {
        // Handle back button throughout the application
        $('.back').live('click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

    home:function () {
        console.log('#home');
        this.changePage(new HomeView());
    },

    page1:function () {
        console.log('#page1');
        this.changePage(new Page1View());
    },

    page2:function () {
        console.log('#page2');
        this.changePage(new Page2View());
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

$(document).ready(function () {
    console.log('document ready');
    app = new AppRouter();
    Backbone.history.start();
});