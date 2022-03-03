title: Cloudflare Pages hosting
date: 2022-03-03
author: Mladen Gibanica
category: Projects
tags: mysgen
type: §§
image:
status: published

I used to host this site on a <a href="https://www.raspberrypi.org/" target="_blank">Raspberry Pi 2</a> (running <a href="https://httpd.apache.org/" target="_blank">Apache HTTP</a>, <a href="https://www.debian.org/" target="_blank">Debain</a> and <a href="https://letsencrypt.org/" target="_blank">Let's Encrypt</a>) in my apartment, but decided it was time to switch over to something more reliable. Hence, Cloudflare Pages.

I'm using GitHub LFS for media files, and this just works with Cloudflare Pages.

The build command used. I will simplify this, but think it serves as a good example of a rather custom build.
```bash
bash> echo "python-3.7" > runtime.txt && pip3 install python-markdown-math==0.8 && pip3 install MarkupSafe==2.0.0 && pip3 install https://github.com/mgcth/mysgen/archive/master.zip && python -m mysgen.main
```

I've also set the environment variable PYTHON_VERSION=3.7.