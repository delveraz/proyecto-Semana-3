/*
Aqui van los Ejemplos de uso
*/

(function($){
$.widget("custom.responsiveSlider", {
 widgetEventPrefix:"jgv",
 options:{
    sliderWidth: 1000,
    sliderHeight: 600,
    auto: true,
    sliderDelay: 3000,
    easing: "linear",
    rolloverMode: true,
    buttonBar: true,
    buttonBarClass:"",
    },
      _create: function(){
        var _slider = this;
        this.oldElement = this.element.clone();
      this.element.css("padding", "0");
      _slider.contenedor = this.element;
      _slider.parent = this.contenedor.parent();

      setTimeout(function(){
       _slider._build();
       _slider._buildButtonBar();
      }, 40);
       $(window).resize(function(){
        clearInterval(_slider.loop);
        _slider.loop = setInterval(function(){

              $(window).unbind("resize");
              clearInterval(_slider.loop);

              _slider.parent.append(this.oldElement);
              setTimeout(function(){
                _slider.oldElement.responsiveSlider({
                    sliderDelay:_slider.options.sliderDelay,
                    easing:_slider.options.easing,
                    auto:_slider.options.auto,
                    buttonBar:_slider.options.buttonBar,
                    buttonBarClass:_slider.options.buttonBarClass
                })

              }, 10);

              _slider.contenedor.responsiveSlider("detroy");

             //this.location.reload(false);


          }, 30);
       });
    },
    _setSize: function(){
    this.options.sliderWidth = $(this.slides.get(0)).outerWidth(false);
    this.options.sliderHeight = $(this.slides.get(0)).outerHeight(false);
    },

    _build:function(){
      var _slider = this;
      _slider.indice = 0;
      _slider.marginLeft = 0;

      _slider.slides = _slider.contenedor.find("li");

      _slider._setSize();

        _slider.contenedor.addClass("responsiveSlider_Ul")
        .width((_slider.slides.length + 1) * _slider.options.sliderWidth)
        .height(_slider.options.sliderHeight)
        .append($(this.slides.get(0)).clone());

        _slider.slides.addClass("responsiveSlider_Li")
        .width(_slider.options.sliderWidth)
        .height(_slider.options.sliderHeight);

       _slider.sliderContainer = $("<div class='responsiveSlider_sliderContainer'></div>");
       _slider.contenedor.before(_slider.sliderContainer);
       _slider.sliderContainer.append(_slider.contenedor)
        .width(_slider.options.sliderWidth)
        .height(_slider.options.sliderHeight);

        _slider._setTimer();
        _slider._setControlOver();

    },
    _buildButtonBar: function(){
      var _slider = this;
      if(_slider.options.buttonBar){
        var _botonera = $("<div class='responsiveSlider_buttonBar'><ul></ul></div>");
        _slider.buttonBar = _botonera;
        _botonera.addClass(_slider.options.buttonBarClass);
        var _ul = _botonera.find("ul");
        var _li;
          _slider.slides.each(function(index){
          _li = $("<li data-ref='" + index +"'></li>");
          _ul.append(_li);

          if(index == 0) {
            _li.addClass("active");
          }

_li.click(function(){
var _indice = $(this).data("ref");
          _slider.indice = _indice;
          _slider.marginLeft = -_indice * _slider.options.sliderWidth;
          _slider.contenedor.stop().animate(
            { marginLeft: _slider.marginLeft + "px"},       
            {
              duration: 1000,
              specialEasing: {marginLeft: _slider.options.easing}, 
              complete: function(){
               _slider._activeButton();
                 }
              }

           );
           clearInterval(_slider.timerInterval);
           _slider._setTimer();
              });

        });
        _slider.sliderContainer.append(_botonera);
        _ul.width(_slider.slides.length * _li.outerWidth(true));
       
      }
    },
    _setTimer: function(){
      var _slider = this;
      if(_slider.options.auto){
      _slider.timerInterval = setInterval(function(){
           _slider.indice ++;
           _slider.marginLeft -=_slider.options.sliderWidth;
           _slider.contenedor.stop().animate(
            { marginLeft: _slider.marginLeft + "px"},       
            {
              duration: 1000,
              specialEasing: {marginLeft: _slider.options.easing}, 
              complete: function(){
               if (_slider.indice >= _slider.slides.length){
                _slider.indice = 0;
                _slider.marginLeft= 0;
                _slider.contenedor.css("margin-left", "0px");
                    }
                    _slider._activeButton();
                 }
              }

           );
        }, _slider.options.sliderDelay);
      }
    },
      _setControlOver: function(){
          var _slider = this;
          _slider.sliderContainer.mouseenter(function(){
            if(_slider.options.rolloverMode){
            clearInterval( _slider.timerInterval);
          }
          });
          _slider.sliderContainer.mouseleave(function(){
            if(_slider.options.rolloverMode){
            _slider._setTimer();
            }
          });

         },

_activeButton: function(){
  var _slider = this;
if (_slider.options.buttonBar) {
  _slider.buttonBar.find("li.active").removeClass("active");
  _slider.buttonBar.find("li[data-ref='" + _slider.indice +"']").addClass("active");
}

},

_detroy: function(){

  this.parent.append(this.oldElement);
  this.sliderContainer.remove();
},

    });

}(jQuery));