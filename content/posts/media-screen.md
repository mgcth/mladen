title: media-screen
date: 2022-01-09
modified:
author: Mladen Gibanica
category: Projects
tags: python, Raspberry Pi, spotify, last.fm, e-ink
data: media_screen
status: published

I've been using a Raspberry Pi 3 for years with a DAC HAT connected to a pair of powered monitors. I thought it was time to upgrade to a Raspberry Pi 4. This time, I opted for a USB DAC: the MOTU M4. I also wanted to hide the Raspberry Pi behind a display. The Waveshare 3.7 e-ink display seemed to cover the whole Raspberry Pi and also attach to it nicely. It has support for partial refreshes and is fairly fast at updating the whole screen. It sits on top of the MOTU M4 and shows some music information (from Spotify's API) like track name, album, artist, play count (through my last.fm account) and the time of day. For now, I'm not using the partial refresh, but plan to in the future. Instead, I only update the screen once a track changes (so the time is usually lagging a few minutes).
The Python code can be found here: <a href="https://github.com/mgcth/media_screen" target="_blank">media screen</a>.

<div>
	<img width="100%" src="{{post_url}}/data/20220130_111004.jpg" type="image/jpg">
	<small>Front view.</small>
</div>

<div>
	<video playsinline autoplay loop mute id="video1" height="100%" width="100%">
	    <source src="{{post_url}}/data/media_screen.mp4" type="video/mp4">
		Your browser does not support HTML video.
	</video>
	<small>Example of screen update.</small>
</div>

<div>
    <div style="display: flex; justify-content: space-between;">
        <img style="width: 49% !important;" src="{{post_url}}/data/20220130_111022.jpg" type="image/jpg">
        <img style="width: 49% !important;" src="{{post_url}}/data/20220130_111037.jpg" type="image/jpg">
    </div>
	<small>Top view (left) and side view (right).</small>
</div>

<div>
	<img width="100%" src="{{post_url}}/data/20220130_110951.jpg" type="image/jpg">
	<small>Close-up view.</small>
</div>