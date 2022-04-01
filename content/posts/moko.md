title: moko
date: 2022-03-27
modified:
author: Mladen Gibanica
category: Projects
tags: python, react, sanic, Raspberry Pi, camera
type:
image:
data:
status: unpublished

When I moved into my new place, which is on the first floor, I thought about installing some sort of surveillance camera directed towards the window and balcony that are on ground level. There exist paid solutions, all too expensive and not hackable enough. Then you have some open-source variants, e.g. <a href="https://github.com/Motion-Project/motion" target="_blank">motion</a> and the web frontend for it <a href="https://github.com/motioneye-project/motioneye" target="_blank">motioneye</a>. Motioneye probably works great (apart from having a somewhat dated ui), however, I had recently started using VS Code to ssh into my devices, in this case a Raspberry Pi Zero 2. I set everything up and it worked for a few minutes, but the computer would randomly crash. After a few reinstalls, I concluded that motioneye wasn't any good and decided to write my own server and client, in the process learning som python backend development (using <a href="https://sanic.dev/en/" target="_blank">sanic</a>) and frontend (<a href="https://reactjs.org/" target="_blank">react</a>). Needles to say, motioneye works great, VS Code was installing Node.js in the background on a computer with only 512 MB RAM. I found out about this by trying to develop on the Raspberry Pi through VS Code, and at this point I was too excited to learn react to go back to motioneye. So, here we are.
