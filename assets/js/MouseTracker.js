var MouseTracker = 
{
	jq:null,
	isOut:true,
	lastPos:new Point2D(0,0),
	
	charge:[]
};

MouseTracker.init = function(jq)
{
	MouseTracker.jq = jq;
	MouseTracker.jq.mousemove(MouseTracker.mouseMove);
	MouseTracker.jq.mouseout(MouseTracker.mouseOut);
	
	MouseTracker.charge = [];
	
	for(var i=0; i<40; ++i)
	{
		MouseTracker.charge.push([]);
		
		for(var j=0; j<60; ++j)
			MouseTracker.charge[i][j] = 0;
	}
		
};

MouseTracker.mouseMove = function(e)
{
	if(MouseTracker.isOut)
		MouseTracker.isOut = false;
	
	MouseTracker.lastPos.x = e.pageX - jQuery(this).offset().left;
	MouseTracker.lastPos.y = e.pageY - jQuery(this).offset().top;
};

MouseTracker.mouseOut = function(e)
{
	MouseTracker.isOut = true;
};

MouseTracker.run = function()
{
	if(!MouseTracker.isOut)
	{
		var r = parseInt(MouseTracker.lastPos.y/10);
		var c = parseInt(MouseTracker.lastPos.x/10);
		
		MouseTracker.charge[r][c]+=5;
		
		if(r+1 < 40)
			if(c+1<60)
				MouseTracker.charge[r+1][c+1]+=3;
			if(c-1>=0)
				MouseTracker.charge[r+1][c-1]+=3;
		if(r-1 >= 0)
			if(c+1<60)
				MouseTracker.charge[r-1][c+1]+=3;
			if(c-1>=0)
				MouseTracker.charge[r-1][c-1]+=3;
	}
	
	for(var i=0; i<40; ++i)
	{	
		for(var j=0; j<60; ++j)
			if(MouseTracker.charge[i][j]>0)
				MouseTracker.charge[i][j]-=0.2;
	}
};