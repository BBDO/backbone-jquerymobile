LCI = (function(){
  var lci = []
  lci.reel = function(){
    $(function(){ 
      var imgArrVar = []
      for (var i=0;i<75;i++){
        if (i<10){
          i = '0' + i
        }
        var imgArr = "/img-seq/birdhouse_894x503-NO-BLUR_000" + i + ".jpg"
        imgArrVar.push(imgArr)
      }
      $('#image').reel({ images: imgArrVar });
    })  
  }
  lci.k5tooltip = {
    config: {
      tipMark: '<div class=tip-wrap><b>X</b><span class=tip-content>tip content</span></div>',
      tipBox: '',
      horiz: 100,
      vert: 200,
      marker1:{
        frame0:{
          x:102,
          y:237
        },
        frame1:{
          x:138,
          y:246
        },
        frame3:{
          x:144,
          y:259
        },
        frame5:{
          x:150,
          y:278
        },
        frame7:{
          x:154,
          y:296
        },
        frame9:{
          x:156,
          y:316
        },
        frame11:{
          x:5000,
          y:5000
        },
        
 
        frame29:{
          x:161,
          y:588
        },
        frame31:{
          x:152,
          y:610
        },
        frame33:{
          x:149,
          y:626
        },
        frame35:{
          x:142,
          y:643
        },
        frame37:{
          x:142,
          y:656
        },
        frame39:{
          x:130,
          y:659
        },
        frame41:{
          x:125,
          y:658
        },
        frame43:{
          x:117,
          y:654
        },                
        frame45:{
          x:111,
          y:638
        },   
        frame47:{
          x:104,
          y:617
        },
        frame49:{
          x:99,
          y:587
        },
        frame51:{
          x:96,
          y:552
        },                        
        frame53:{
          x:93,
          y:509
        },                
        frame55:{
          x:117,
          y:467
        },   
        frame57:{
          x:97,
          y:423
        },
        frame59:{
          x:97,
          y:381
        },
        frame61:{
          x:102,
          y:340
        },                        
        frame63:{
          x:109,
          y:303
        },                
        frame65:{
          x:110,
          y:277
        },   
        frame67:{
          x:117,
          y:256
        },
        frame69:{
          x:121,
          y:244
        },
        frame71:{
          x:126,
          y:239
        },                        
        frame73:{
          x:132,
          y:237
        },    
        frame00:{
          x:132,
          y:237
        }    

      }
    },
    placeTip: function(photoNum,markerNum){
      $(function(){

        // console.log(photoNum)
        console.log(markerNum)
        var markerVar = markerNum
        if (!$('.tip-wrap').length){
          // $('body').append(lci.k5tooltip.config.tipMark)

          $('body').append('<div id=marker1 class=tip-wrap><b>1</b><span class=tip-content>tip content</span></div>')

          $('body').append('<div id=marker2 class=tip-wrap><b>2</b><span class=tip-content>tip content</span></div>')
          $('body').append('<div id=marker3 class=tip-wrap><b>3</b><span class=tip-content>tip content</span></div>')
          $('body').append('<div id=marker4 class=tip-wrap><b>4</b><span class=tip-content>tip content</span></div>')
        }


        if (photoNum){

          var markerVar = $('.active').attr('id')
  
          var url = '/find-spots/marker1/' + photoNum
          $.ajax({
            url:url,
            type:'get',
            success:function(data){

              // get cur marker coord
              // animate cur to new coord

              // $('#marker1').animate({
              //   top:data[0].xval,
              //   left:data[0].yval
              // })
          oldTop = $('#marker1').css('top')
          oldLeft = $('#marker1').css('left')
          if (data[0].xval.length){
            newTop = data[0].xval
          }
          else {
            newTop = 0
          }
          if(data[0].yval.length){
            newLeft = data[0].yval
          }
          else {
            newLeft = 0
          }

              // $('#marker1').css({
              //   top:data[0].xval,
              //   left:data[0].yval
              // })  

          reelNum = $($.reel.instances).attr('src').replace('.jpg','').split('000')[1]
          $('html').attr('data',reelNum)
          $('.tip-content').hide().removeClass('dispInBl')
            }
          })

          var url = '/find-spots/marker2/' + photoNum
          $.ajax({
            url:url,
            type:'get',
            success:function(data){
              if (data.length){
                $('#marker2').css({
                  top:data[0].xval,
                  left:data[0].yval
                })  
              }
            }
          })

          var url = '/find-spots/marker3/' + photoNum
          $.ajax({
            url:url,
            type:'get',
            success:function(data){
              if (data.length){
                $('#marker3').css({
                  top:data[0].xval,
                  left:data[0].yval
                })  
              }

            }
          })

          var url = '/find-spots/marker4/' + photoNum
          $.ajax({
            url:url,
            type:'get',
            success:function(data){
              if (data.length){
                $('#marker4').css({
                  top:data[0].xval,
                  left:data[0].yval
                })  
              }
            }
          })


        }
      })
    },
    tipEvent:function(){
      // alert('bind ev')
      $('.tip-wrap').live('click', function(){
        // alert('debug')
        // $(this).next('.tip-content').show()
        $(this).children('.tip-content').toggle()
        $(this).children('.tip-content').toggleClass('dispInBl')
        // console.log($(this).parent().find('.tip-content').toggle())
        // console.log($(this).parent().children('.tip-content'))
      })
    },
    checkFrame:function(){
      $(function(){
        // console.log('checkFrame')
        $('#image').bind('frameChange',function(){
          var srcVal = $($.reel.instances).attr('src').replace('.jpg','').split('000')[1]
          var markerNum = $('.active').attr('id')
          lci.k5tooltip.placeTip(srcVal,markerNum) // position markers based on return val
        })              
      })
    },
    enableDrag: function(){
      $(function(){
        $('.tip-wrap').draggable()
      })
    },
    logPlacement: function(){
      var marker = 'marker1',
          marker = $('.active').attr('id'),
          frame = $($.reel.instances).attr('src').replace('.jpg','').split('000')[1],
          frame = parseInt(frame),
          topVal = $('#' + marker).css('top')
          leftVal = $('#' + marker).css('left')

      // console.log(marker + ', ' + top + ', ' + left + ', ' + frame)
      console.log(topVal)
      typeof($(topVal))
      console.log('topVal = ' + topVal)
      var url = '/add-spots/' + marker + '/' + frame + '/' + topVal + '/' + leftVal
      $.ajax({
        url:url,
        type:'get',
        success:function(){
          // alert('saved')
          console.log('frame# ' + frame + ': ' + topVal + ' x ' + leftVal)
        }
      })

    },
    saveEvent:function(){
      $('button').live('click',function(){
        lci.k5tooltip.logPlacement()
      })
      $('.tip-wrap').draggable() 
    },
    bindActive:function(){
      $('.tip-wrap').live('click',function(){
        $('.tip-wrap').removeClass('active')
        $(this).addClass('active')
      })
    },
    checkStats:function(){
      $('#stats').live('click',function(){
        $('#log').empty()
        var frameNum = $($.reel.instances).attr('src').replace('.jpg','').split('000')[1]
        // var coordVal = $('#' + marker).css('top') + ' x ' + $('#' + marker).css('left')
        $('#log').append($('.active').attr('id')).append(', frame ' + frameNum).append(', top:' + $('.active').css('top') + ', left: ' + $('.active').css('left'))
        console.log(oldTop + ', ' + oldLeft + ', ' + newTop + ', ' + newLeft)


      })
    }

  }
  lci.k5tooltip.bindActive()
  lci.k5tooltip.placeTip()
  lci.k5tooltip.tipEvent()
  lci.k5tooltip.checkFrame()
  lci.k5tooltip.saveEvent()
  lci.k5tooltip.checkStats()
  lci.reel()
  return lci
}())


