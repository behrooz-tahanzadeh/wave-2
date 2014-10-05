Main = 
{
	canvas:false,
	canvasX:false,
	
	intervalTime:50,
	intervalID:-1,
	
	BgOpacity:1,
	
	
	
	
	init:function()
	{
		this.canvas = jQuery('#drawingArea').eq(0);
		this.canvasX = this.canvas.get(0).getContext("2d");
		Seeker.Ctx = Main.canvasX;
		
		MouseTracker.init(this.canvas);
		
		jQuery("div#pp").click(Main.pp);
		
		this.intervalID = setInterval(this.loop, this.intervalTime);
		
		jQuery('input#tail').change(Main.tailChange);
		
		jQuery(window).keydown(Main.windowOnKeyDown);
		
		Seeker.Init();
	},
	
	
	
	
	windowOnKeyDown: function(e)
	{
		switch (e.keyCode)
		{
		case Keyboard.Right:
			var v = parseFloat(jQuery('input#tail').val())+(e.shiftKey?0.1:0.01);
			jQuery('input#tail').val(v);
			Main.tailChange(null);
			
			break;
			
		case Keyboard.Left:
			var v = parseFloat(jQuery('input#tail').val())-(e.shiftKey?0.1:0.01);
			jQuery('input#tail').val(v);
			Main.tailChange(null);
			
			break;
			
		case Keyboard.Space:
			Main.pp();
			break;
		
		default:
			console.log(e.keyCode);
		}
	},
	
	
	
	
	tailChange:function(e)
	{
		Main.BgOpacity = jQuery('input#tail').val();
	},
	
	
	
	
	loop: function()
	{
		MouseTracker.run();
		
		var ctx = Main.canvasX;
		
		ctx.fillStyle = "rgba(255,255,255,"+Main.BgOpacity+")";
		ctx.fillRect(0,0,600,400);
		
		ctx.beginPath();
		
		Seeker.DrawAll();
		
		ctx.lineWidth = 1;
		ctx.strokeStyle = 'black';
		ctx.stroke();
	},
	
	
	
	
	pp: function()
	{
		if(Main.intervalID == -1)
		{
			Main.intervalID = setInterval(Main.loop, Main.intervalTime);
			jQuery("div#pp").html('pasue');
		}
		else
		{
			clearInterval(Main.intervalID);
			Main.intervalID = -1;
			jQuery("div#pp").html('play');
		}
	}
};//eo Main{}


jQuery(document).ready(function(){
	Main.init();
});