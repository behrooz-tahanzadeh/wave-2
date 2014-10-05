function Seeker(col)
{
	this.col = col;
	Seeker.List.push(this);
}//eoc

Seeker.H = 400;
Seeker.Hs = 10;
Seeker.List = [];
Seeker.Ctx = null;

Seeker.DrawAll = function()
{
	for (var i=0; i<Seeker.List.length; i++)
		Seeker.List[i].draw();
};
Seeker.Init = function()
{
	for(var i=0; i<60; ++i)
		new Seeker(i);
};



Seeker.prototype.draw = function()
{
	var dist = 0;
	var charge = 0;
	
	var row = Seeker.H/Seeker.Hs;
	
	Seeker.Ctx.moveTo(this.col*10, 0);
	
	for(var i=0; i<row; ++i)
	{
		dist = 0;
		charge = 0;
		
		for(var j=this.col; j<MouseTracker.charge[i].length; ++j)
		{
			if(MouseTracker.charge[i][j]-dist>0)
			{
				charge += MouseTracker.charge[i][j]-dist;
				dist+=0.5;
			}
		}
		
		dist = 0;
		
		for(var j=this.col; j>=0; --j)
		{
			if(MouseTracker.charge[i][j]-dist>0)
			{
				charge -= MouseTracker.charge[i][j]-dist;
				dist+=0.5;
			}
		}
		
		Seeker.Ctx.lineTo(this.col*10+(charge), i*10);
		Seeker.Ctx.lineTo(this.col*10+(charge), i*10+10);
	}
};