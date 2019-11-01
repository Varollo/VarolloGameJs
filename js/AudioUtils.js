class Sound extends Audio
{
	constructor(src)
	{
		super(src);
		this.src = src;
		
		objectsLoading++;

        this.oncanplaythrough = function()
        {
            objectsLoading--;
        };
	}
	
	play(loop, startTime)
	{
		this.currentTime = startTime | 0;
		this.loop = loop | false;
		super.play();
	}
	
	setPlaybackTime(time)
	{
		this.currentTime = time;
	}
	
	stop()
	{
		this.pause();
		this.currentTime = 0;
	}
}