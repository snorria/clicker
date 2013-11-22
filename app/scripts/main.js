

var Game = function() {

  this.monies = 0;
  this.moneyRatePerSecond = 0;
  this.moneyMakerPrice = 0;
  this.focused = true;
  // Cache a bound onFrame since we need it each frame.
    this.onFrame = this.onFrame.bind(this);
  
  // Restart the onFrame loop
    this.lastFrame = +new Date() / 1000;
    requestAnimFrame(this.onFrame);
};
Game.prototype.onFrame = function() {

    var now = +new Date() / 1000,
        delta = now - this.lastFrame;
    this.lastFrame = now;
  this.monies += this.moneyRatePerSecond*delta;
    $('#moneyCounter').html(numberWithCommas(this.monies));
    document.title = ""+Math.round(this.monies);
    // Request next frame.
    requestAnimFrame(this.onFrame);
};
Game.prototype.buyMoneyMaker = function() {
  if(this.monies >= this.moneyMakerPrice){
    this.monies -= this.moneyMakerPrice;
    this.moneyMakerPrice = Math.round((this.moneyMakerPrice+1)*1.1);
    this.moneyRatePerSecond += 2;
    $('#moneyPerSecond').html(this.moneyRatePerSecond);
    $('#buyMoneyMaker').text(this.moneyMakerPrice);
  }
};




/**
   * Cross browser RequestAnimationFrame
   */
  var requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback) {
          window.setTimeout(callback, 1000 / 60);
        };
  })();

function numberWithCommas(x) {
    x = Math.round(x);
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var gameInstance = new Game();

$(window).focus(function() {
    gameInstance.focused = true;
});
$(window).blur(function() {
    gameInstance.focused = false;
    var estimatedMonies = gameInstance.monies;
    var estimate = window.setInterval(function() {
    estimatedMonies+= gameInstance.moneyRatePerSecond;
    document.title = ""+Math.round(estimatedMonies);

	// when i = 4, stop repeating
	if(gameInstance.focused)
	   window.clearInterval(estimate);

	}, 1000);
});
$('#buyMoneyMaker').click(function(){
  gameInstance.buyMoneyMaker();
});