title: moko
date: 2022-04-14
modified:
author: Mladen Gibanica
category: Projects
tags: python, react, sanic, Raspberry Pi, camera
status: published

*In progress:*
*This work is currently in progress, and most of my focus now is on writing more tests and not developing new features.*

moko consists of a <a href="https://github.com/mgcth/moko_server" target="_blank">server</a> and a <a href="https://github.com/mgcth/moko_client" target="_blank">client</a>.
The server runs on the hardware hosting the camera in question, so far the server only supports Raspberry Pi cameras, and starts a server you can expose to the world wide web.
The client can be run anywhere, as long as it can connect to the server, from which the camera can be configured and a live view seen.
The client can for example be accessed from this address: <a href="https://moko.linearspan.com/" target="_blank">https://moko.linearspan.com/</a>.
That site is just a Cloudflare Pages hosted version of the <a href="https://github.com/mgcth/moko_client" target="_blank">moko client</a> repo.
In the spirit of simplicity, only JPEGs are streamed, so expect a rather low quality feed.
Authentication is handled through JWT.

When I moved into my new place, which is on the first floor, I thought about installing some sort of surveillance camera directed towards the window and balcony that are on ground level.
Paid solutions exist, all too expensive and not hackable enough.
Then you have some open-source variants, e.g. <a href="https://github.com/Motion-Project/motion" target="_blank">motion</a> and the web frontend for it <a href="https://github.com/motioneye-project/motioneye" target="_blank">motioneye</a>.
Motioneye probably works great (apart from having a somewhat dated ui), however, I had recently started using VS Code to ssh into my devices, in this case a Raspberry Pi Zero 2.
I set everything up and it worked for a few minutes, after which the computer would crash, seemingly at random.
After a few reinstalls, I concluded that motioneye wasn't any good and decided to write my own server and client, in the process learning som python backend development (using <a href="https://sanic.dev/en/" target="_blank">sanic</a>) and frontend (<a href="https://reactjs.org/" target="_blank">react</a>).
Needles to say, motioneye works great, but VS Code was installing Node.js in the background on a computer with only 512 MB RAM.
If you try it, you're gonna have a bad time.
I found out about this when trying to develop *moko* on the Raspberry Pi through VS Code and the computer kept crashing (and `top` showed a node task running).
However, at this point I was too excited to learn react.
So, here we are.
