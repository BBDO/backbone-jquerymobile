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
      horiz: 5000,
      vert: 5000,
      marker1:{
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
    placeTip: function(photoNum){
      $(function(){

        // console.log(photoNum)


        if (!$('.tip-wrap').length){
          $('body').append(lci.k5tooltip.config.tipMark)
        }

        if (photoNum){
          console.log(photoNum)
          var photoNumInt = parseInt(photoNum)          
          var frameNum = 'frame' + photoNumInt
          console.log(frameNum)
          console.log(lci.k5tooltip.config.marker0)
        }

        if (photoNum === '01'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame1.x,
            left:lci.k5tooltip.config.marker1.frame1.y
          })  
        }
        if (photoNum === '03'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame3.x,
            left:lci.k5tooltip.config.marker1.frame3.y
          })  
        }
        if (photoNum === '05'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame5.x,
            left:lci.k5tooltip.config.marker1.frame5.y
          })  
        }
        if (photoNum === '07'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame7.x,
            left:lci.k5tooltip.config.marker1.frame7.y
          })  
        }
        if (photoNum === '09'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame9.x,
            left:lci.k5tooltip.config.marker1.frame9.y
          })  
        }
        if (photoNum === '11'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame11.x,
            left:lci.k5tooltip.config.marker1.frame11.y
          })  
        }
        if (photoNum === '29'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame29.x,
            left:lci.k5tooltip.config.marker1.frame29.y
          })  
        }        
        if (photoNum === '31'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame31.x,
            left:lci.k5tooltip.config.marker1.frame31.y
          })  
        }        
        if (photoNum === '33'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame33.x,
            left:lci.k5tooltip.config.marker1.frame33.y
          })  
        }        
        if (photoNum === '35'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame35.x,
            left:lci.k5tooltip.config.marker1.frame35.y
          })  
        }        
        if (photoNum === '37'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame37.x,
            left:lci.k5tooltip.config.marker1.frame37.y
          })  
        }        
        if (photoNum === '39'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame39.x,
            left:lci.k5tooltip.config.marker1.frame39.y
          })  
        }      
        if (photoNum === '41'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame41.x,
            left:lci.k5tooltip.config.marker1.frame41.y
          })  
        }              
        if (photoNum === '43'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame43.x,
            left:lci.k5tooltip.config.marker1.frame43.y
          })  
        }      
        if (photoNum === '45'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame45.x,
            left:lci.k5tooltip.config.marker1.frame45.y
          })  
        }  
        if (photoNum === '47'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame47.x,
            left:lci.k5tooltip.config.marker1.frame47.y
          })  
        }      
        if (photoNum === '49'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame49.x,
            left:lci.k5tooltip.config.marker1.frame49.y
          })  
        }  
        if (photoNum === '51'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame51.x,
            left:lci.k5tooltip.config.marker1.frame51.y
          })  
        }      
        if (photoNum === '53'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame53.x,
            left:lci.k5tooltip.config.marker1.frame53.y
          })  
        }  
        if (photoNum === '55'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame55.x,
            left:lci.k5tooltip.config.marker1.frame55.y
          })  
        }      
        if (photoNum === '57'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame57.x,
            left:lci.k5tooltip.config.marker1.frame57.y
          })  
        }      
        if (photoNum === '59'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame59.x,
            left:lci.k5tooltip.config.marker1.frame59.y
          })  
        }  
        if (photoNum === '61'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame61.x,
            left:lci.k5tooltip.config.marker1.frame61.y
          })  
        }      
        if (photoNum === '63'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame63.x,
            left:lci.k5tooltip.config.marker1.frame63.y
          })  
        }  
        if (photoNum === '65'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame65.x,
            left:lci.k5tooltip.config.marker1.frame65.y
          })  
        }      
        if (photoNum === '67'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame67.x,
            left:lci.k5tooltip.config.marker1.frame67.y
          })  
        }  
        if (photoNum === '69'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame69.x,
            left:lci.k5tooltip.config.marker1.frame69.y
          })  
        }      
        if (photoNum === '71'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame71.x,
            left:lci.k5tooltip.config.marker1.frame71.y
          })  
        }  
        if (photoNum === '73'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame73.x,
            left:lci.k5tooltip.config.marker1.frame73.y
          })  
        }  
        if (photoNum === '00'){
          $('.tip-wrap').css({
            top:lci.k5tooltip.config.marker1.frame00.x,
            left:lci.k5tooltip.config.marker1.frame00.y
          })  
        }  




        // if photoNum === 1, lci.k5tooltip.config.marker1.frame1.xval
        // if photoNum === 2, lci.k5tooltip.config.marker1.frame2.xval
        // if photoNum === 3, lci.k5tooltip.config.marker1.frame3.xval


      })
    },
    tipEvent:function(){
      $('.tip-wrap').on('click', 'b', function(){
        $(this).parent().children('.tip-content').toggle()
      })
    },
    checkFrame:function(){
      $(function(){
        console.log('checkFrame')
        $('#image').bind('frameChange',function(){
          var srcVal = $($.reel.instances).attr('src').replace('.jpg','').split('000')[1]
          lci.k5tooltip.placeTip(srcVal) // position markers based on return val
        })              
      })
    },
    enableDrag: function(){
      $(function(){
        $('.tip-wrap').draggable()
      })
    },
    logPlacement: function(){
      var top = $('.tip-wrap').css('top'),
          left = $('.tip-wrap').css('left'),
          frame = $($.reel.instances).attr('src').replace('.jpg','').split('000')[1]

      console.log(top + ', ' + left + ', ' + frame)
    },
    saveEvent:function(){
      $('button').live('click',function(){
        lci.k5tooltip.logPlacement()
      })
    }
  }
  lci.k5tooltip.placeTip()
  lci.k5tooltip.tipEvent()
  lci.k5tooltip.checkFrame()
  lci.k5tooltip.saveEvent()
  lci.reel()
  return lci
}())


