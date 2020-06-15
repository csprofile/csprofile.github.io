$.fn.keyboard = function(mainOptions){
	var mainSettings = $.extend({
		width:800,
		height:0,
		writeIn:'',
		id:'keyboard',
		nextAction:function(){},
		beforeAction:function(){},
		background:'#ccc',
		keyColor:'#fff',
		fontSize:25
	}, mainOptions );


	var holdTimer;
	var shift = false;
    var capslock = false;
	var write = mainSettings.writeIn instanceof jQuery ? $(mainSettings.writeIn) : $("#"+mainSettings.writeIn);
	var thisKeyboard = this;
	var keyboardContainer = $("<div>");

	thisKeyboard.css({
		"width": mainSettings.width+"px",
		"min-width":"400px"
	});
	
	//Adjust height
	if(mainSettings.height == 0){
		//thisKeyboard.height(mainSettings.width * 0.32);
		thisKeyboard.height(mainSettings.width * 0.175);
	}else{
		thisKeyboard.height(mainSettings.height);
	}
	
	keyboardContainer.css({
		"width":thisKeyboard.width(),
		"height":thisKeyboard.height(),
		"padding-left":"0.22%",
		"padding-top":"0.45%",
		"background":mainSettings.background
	});
	
	keyboardContainerUL = $("<ul id='"+mainSettings.id+"'>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>1</span><span class='on'>!</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>2</span><span class='on'>@</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>3</span><span class='on'>#</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>4</span><span class='on'>$</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>5</span><span class='on'>%</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>6</span><span class='on'>^</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>7</span><span class='on'>&amp;</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>8</span><span class='on'>*</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric'><span class='off'>9</span><span class='on'>(</span></li>");
	keyboardContainerUL.append("<li class='symbol numeric lastitem'><span class='off'>0</span><span class='on'>)</span></li>");
	keyboardContainerUL.append("<li class='tab firstitem'>tab</li>");
	keyboardContainerUL.append("<li class='letter'>q</li>");
	keyboardContainerUL.append("<li class='letter'>w</li>");
	keyboardContainerUL.append("<li class='letter'>e</li>");
	keyboardContainerUL.append("<li class='letter'>r</li>");
	keyboardContainerUL.append("<li class='letter'>t</li>");
	keyboardContainerUL.append("<li class='letter'>y</li>");
	keyboardContainerUL.append("<li class='letter'>u</li>");
	keyboardContainerUL.append("<li class='letter'>i</li>");
	keyboardContainerUL.append("<li class='letter'>o</li>");
	keyboardContainerUL.append("<li class='letter'>p</li>");
	keyboardContainerUL.append("<li class='delete lastitem'>del</li>");
	keyboardContainerUL.append("<li class='capslock firstitem'>caps lock</li>");
	keyboardContainerUL.append("<li class='letter'>a</li>");
	keyboardContainerUL.append("<li class='letter'>s</li>");
	keyboardContainerUL.append("<li class='letter'>d</li>");
	keyboardContainerUL.append("<li class='letter'>f</li>");
	keyboardContainerUL.append("<li class='letter'>g</li>");
	keyboardContainerUL.append("<li class='letter'>h</li>");
	keyboardContainerUL.append("<li class='letter'>j</li>");
	keyboardContainerUL.append("<li class='letter'>k</li>");
	keyboardContainerUL.append("<li class='letter'>l</li>");
	keyboardContainerUL.append("<li class='symbol'><span class='off'>\\</span><span class='on'>{</span></li>");
	keyboardContainerUL.append("<li class='symbol lastitem'><span class='off'>/</span><span class='on'>}</span></li>");
	keyboardContainerUL.append("<li class='left-shift firstitem'>shift</li>");
	keyboardContainerUL.append("<li class='symbol'><span class='off'>'</span><span class='on'>&quot;</span></li>");
	keyboardContainerUL.append("<li class='letter'>z</li>");
	keyboardContainerUL.append("<li class='letter'>x</li>");
	keyboardContainerUL.append("<li class='letter'>c</li>");
	keyboardContainerUL.append("<li class='letter'>v</li>");
	keyboardContainerUL.append("<li class='letter'>b</li>");
	keyboardContainerUL.append("<li class='letter'>n</li>");
	keyboardContainerUL.append("<li class='letter'>m</li>");
	keyboardContainerUL.append("<li class='symbol'><span class='off'>,</span><span class='on'>&lt;</span></li>");
	keyboardContainerUL.append("<li class='symbol'><span class='off'>.</span><span class='on'>&gt;</span></li>");
	keyboardContainerUL.append("<li class='symbol lastitem'><span class='off'>-</span><span class='on'>|</span></li>");
	keyboardContainerUL.append("<li class='before firstitem'> Anterior</li>");
	keyboardContainerUL.append("<li class='space'>&nbsp;</li>");
	keyboardContainerUL.append("<li class='next lastitem'>Próximo </li>");
	
	keyboardContainer.append(keyboardContainerUL);
	thisKeyboard.append(keyboardContainer);
	
	//Adjust line-height after append
	keyboardContainerUL.find("li").css({
		"display":"inline-block",
		"line-height": ((thisKeyboard.height() * 0.009) + (thisKeyboard.height() / 6)) + "px",
		"background":mainSettings.keyColor,
		"height":((thisKeyboard.height() * 0.009) + (thisKeyboard.height() / 6)) + "px",
		"font-size":mainSettings.fontSize + "px",
		"cursor": "pointer"
	});
	
	keyboardContainerUL.find(".before").css({
		"background":"#ff4d4d"
	})
	
	keyboardContainerUL.find(".next").css({
		"background":"#00c300"
	})
	
	//Block user select
	keyboardContainer.find("*").css({
		"-moz-user-select":"-moz-none",
		"-khtml-user-select": "none",
		"-webkit-user-select": "none",
		"-o-user-select": "none",
		"user-select": "none"
	});
	
	keyboardContainer.find("*").each(function(){
		$(this).attr('unselectable', 'on')
	});
	
	
	//Actions
	//Delete all
	$(keyboardContainerUL).find(".delete").mousedown(function(){
		holdTimer = setTimeout(function(){write.html("")}, 500);
	});
	
	$(keyboardContainerUL).find('.delete').bind('mouseup mouseleave',function(){
		clearTimeout(holdTimer);
	});
	
	$(keyboardContainerUL).find("li").click(function(){
		var $this = $(this),
			character = $this.html();

		// Shift keys
		if ($this.hasClass('left-shift') || $this.hasClass('right-shift')) {
			$('.letter').toggleClass('uppercase');
			$('.symbol span').toggle();
			 
			shift = (shift === true) ? false : true;
			capslock = false;
			return false;
		}

		// Caps lock
		if ($this.hasClass('capslock')) {
			$('.letter').toggleClass('uppercase');
			$('.symbol span').toggle();
			
			capslock = true;
			return false;
		}

		// Delete
		if ($this.hasClass('delete')) {
			var html = write.html();
			 
			write.html(html.substr(0, html.length - 1));
			return false;
		}
		
		// Next
		if ($this.hasClass('next')) {
			mainSettings.nextAction(keyboardContainer);
			return false;
		}
		
		// Before
		if ($this.hasClass('before')) {
			mainSettings.beforeAction(keyboardContainer);
			return false;
		}
		
		// Special characters
		if ($this.hasClass('symbol')) character = $('span:visible', $this).html();
		if ($this.hasClass('space')) character = ' ';
		if ($this.hasClass('tab')) character = "\t";
		if ($this.hasClass('return')) character = "\n";
		
		// Uppercase letter
		if ($this.hasClass('uppercase')) character = character.toUpperCase();
		
		// Remove shift once a key is clicked.
		if (shift === true) {
			$('.symbol span').toggle();
			if (capslock === false) $('.letter').toggleClass('uppercase');
			 
			shift = false;
		}
		 
		// Add the character
		write.html(write.html() + character);
	});
	
	return keyboardContainer;
}


