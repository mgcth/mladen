title: Isolate moving objects in video with SVD
date: 2020-08-22
modified:
author: Mladen Gibanica
category: Projects
tags: julia, math, svd
type:
image:
data: isolate_video_20200822
status: published

A video can be interpreted as snapshots in time (frames) of a dynamical system. It should then be possible to identify and separate the background and foreground components, e.g. see <a href="https://en.wikipedia.org/wiki/Foreground_detection" target="_blank">video surveillance</a>.

For a video (from a static camera), the background (non-moving parts) can be interpreted as the low-frequency (static) component of a dynamical system while the moving objects are the high-frequency (non-static) components. Another interpretation is that the background and foreground are the low-dimensional and sparse representations of the video, respectively. A simple approach to separate a video into the low-dimensional and sparse components is to use the singular value decomposition (SVD). A more advanced method relies on the Robust PCA (RPCA) which is more *robust* to outliers in the data.

I find the problem formulation interesting. In structural dynamics, the SVD (or proper orthogonal decomposition (POD) as it's often called) can be used to estimate the structural system's dynamics. A set of snapshots (solutions at various points in time for example) for some degrees-of-freedom (DOFs) are collected in a matrix. From that matrix, the SVD can be used to separate the dynamical components of the system, e.g. to find the mode shapes, see this paper by <a href="https://www.sciencedirect.com/science/article/abs/pii/S0022460X01939306" target="_blank">Kerschen and Golinval</a>.

We can do the same thing with videos. Each frame can be viewed as a snapshot in time and stored as a matrix. If we collect many such frames in a larger matrix (by stacking each frame matrix into a column vector), we can separate the dynamical components in the video.

The idea is simple. Assume that the video is made up of frames, which can be viewed as 3D arrays of numbers, three matrices for each colour: red, green and blue. We will consider each colour component ($c = \\{\mathrm{r}, \mathrm{g}, \mathrm{b} \\}$) separately and vectorise each frame matrix to create the video matrix for frames $1$ to $n$
$$
A_c = [f_{c, 1}, \dots, f_{c, n}]
$$
Then, we compute the SVD of that matrix
$$
A_c = U_c S_c V_c^\mathrm{T} = U_{c, \mathrm{L}} S_{c, \mathrm{L}} V_{c, \mathrm{L}}^\mathrm{T} + U_{c, \mathrm{H}} S_{c, \mathrm{H}} V_{c, \mathrm{H}}^\mathrm{T} = A_{c, \mathrm{L}} + A_{c, \mathrm{H}}
$$
Here, subscripts $\mathrm{L}$ and $\mathrm{H}$ denote the low- and high-dimensional components, respectively. Matrices $U$, $S$, and $V$ are the standard SVD matrices, see <a href="https://en.wikipedia.org/wiki/Singular_value_decomposition" targte="_blank">Wikipedia</a>.

We don't need to compute the high-dimensional component $A_{c, \mathrm{H}}$ of $A_c$, instead we can find it as
$$
A_{c, \mathrm{H}} = A_c - A_{c, \mathrm{L}}
$$

Below, a simple example is shown. The video consists of 12 frames with height 5px and width 6px. There are three moving objects (light), on an otherwise dark background. Subscript $c$ is dropped in the notation for brevity.
<div>
	<div style="display: flex; justify-content: space-between; text-align: center;">
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame1.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_1$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame2.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_2$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame3.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_3$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame4.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_4$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame5.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_5$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame6.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_6$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame7.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_7$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame8.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_8$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame9.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_9$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame10.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_{10}$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame11.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_{11}$</div>
		</div>
		<div style="margin: 0 2px 0; width: 8%;">
			<img src="{{posturl}}/isolate_video_frame12.png" type="image/png" class="isolate_moving_object-image">
			<div>$f_{12}$</div>
		</div>
	</div>
	<small>The 12 frames (frame 1 left and frame 12 right). 0.0 <img src="{{posturl}}/isolate_video_legend.png" type="image/png" class="isolate_moving_object-image" style="height: 6px; width: 100px; border: 1px solid #000000;"> 1.0</small>
</div>

Below is a visualisation of the vectorisation procedure of the video to crate matrix $A$. The negative values have been visualised in red, and scaled up twice their original values (in the images) for better visual effect. The numerical values in the legend remain unchanged.
<div>
	<div style="display: flex; justify-content: center; align-items: flex-end; text-align: center;">
		<div style="width: 5%;">
			<div>
				<!-- <img width="3px" height="90px" src="{{posturl}}/isolate_video_frames1.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames2.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames3.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames4.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames5.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames6.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames7.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames8.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames9.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames10.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames11.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;">
				<img width="3px" height="90px" src="{{posturl}}/isolate_video_frames12.png" type="image/png" style="image-rendering: crisp-edges; margin: 0 1px 0; width: 3px;"> -->
				<img src="{{posturl}}/isolate_video_Vm.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A$</div>
		</div>
		<div style="width: 1.75%">
			<div>$=$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Vml.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_{\mathrm{L}}$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Vmh.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_{\mathrm{H}}$</div>
		</div>
		<div style="width: 1.75%">
			<div>$=$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve1.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_1$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve2.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_2$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve3.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_3$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve4.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_4$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve5.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_5$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve6.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_6$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve7.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_7$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve8.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_8$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve9.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_9$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve10.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_{10}$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve11.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_{11}$</div>
		</div>
		<div style="width: 1.75%">
			<div>$+$</div>
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve12.png" type="image/png" class="isolate_moving_object-image">
			</div>
			<div>$A_{12}$</div>
		</div>
	</div>
	<small>Matrix $A$ and its decomposition. Here, $A_i$ for $i=1,\dots,12$, represents the low-dimensional video matrix for each of the 12 singular values. -0.31 <img src="{{posturl}}/isolate_video_legend_c.png" type="image/png" class="isolate_moving_object-image" style="height: 6px; width: 100px; border: 1px solid #000000;"> 1.0</small>
</div>

<div>
	<div style="display: flex; justify-content: center; align-items: flex-end; text-align: center;">
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Vm.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Vml.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_{\mathrm{L}}$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Vmh.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_{\mathrm{H}}$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve1.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_1$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve2.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_2$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve3.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_3$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve4.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_4$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve5.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_5$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve6.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_6$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve7.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_7$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve8.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_8$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve9.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_9$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve10.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_{10}$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve11.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_{11}$</div>
		</div>
		<div style="width: 1.75%">
		</div>
		<div style="width: 5%;">
			<div>
				<img src="{{posturl}}/isolate_video_Ve12.gif" type="image/gif" class="isolate_moving_object-image">
			</div>
			<div>$A_{12}$</div>
		</div>
	</div>
	<small>Animated view of the decomposition. -0.31 <img src="{{posturl}}/isolate_video_legend_c.png" type="image/png" class="isolate_moving_object-image" style="height: 6px; width: 100px; border: 1px solid #000000;"> 1.0</small>
</div>

It can be seen that $A_1$ (or $A_\mathrm{L}$) have some artefacts from the moving objects. Therefore, this can also be expected for the examples below.

I have implement this method in Julia, see this <a href="https://github.com/mgcth/isolate_moving_objects_in_video/blob/master/video_isolate_public.ipynb" target="_blank">Jupyter notebook</a>.

I though this might be fun to test as a vacation video to photo converter. Imagine we want to take a photo of something interesting, but without all other tourists in the image without having to ask everyone to move out of the frame. This should be possible from a 4K video, and still produce large enough pictures. Below is such a video from <a href="https://en.wikipedia.org/wiki/Ale%27s_Stones" target="_blank">Ale's stones</a> in Sweden. I filmed this video with a phone camera, and as can be seen on the left, it's quite shaky. To stabilise the video, I used <a href="https://www.blackmagicdesign.com/products/davinciresolve/" target="_blank">DaVinci Resolve</a>.
<div>
	<div style="display: flex; justify-content: space-between;">
		<video playsinline autoplay loop mute id="video1" height="100%" width="49%">
		  <source src="{{posturl}}/ale_original_show.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
		<video playsinline autoplay loop mute id="video2" height="100%" width="49%">
		  <source src="{{posturl}}/ale_stabilised_show.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
	</div>
	<small>Original video (left) and stabilised video (right).</small>
</div>

The 4K video was resized down to 720p (and even further for visualisation on this page). It was recorded at 60 frames per second (fps), but this was reduced down to 12 fps, reducing the 51 s video down to approximately 10 s. Results are shown below, with only the first singular value used in constructing the background.
<div>
	<div style="display: flex; justify-content: space-between;">
		<video playsinline autoplay loop mute id="video3" height="100%" width="49%">
		  <source src="{{posturl}}/ale_stabilised_o_w.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
		<video playsinline autoplay loop mute id="video4" height="100%" width="49%">
		  <source src="{{posturl}}/ale_stabilised_f_w.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
	</div>
	<small>Original video (left) and high-frequency component (right).</small>
</div>
<div>
	<img width="100%" src="{{posturl}}/ale_stabilised_b.jpg" type="image/jpg">
	<small>Larger view of the background video's first frame.</small>
</div>

That's not exactly what I had hoped for. My hope was that if I filmed for long enough, people would move around enough. I also hoped that I could stabilise the video well enough after filming it. I later found that some people moved very slowly, or not at all (even after filming for close to a minute), meaning it would be impossible to filter them out. The stabilisation also didn't work out as well as I had hoped. This can be seen from the stones moving around in each frame in the right video (high-dimensional components).

But, the technique does work. A more controlled example is shown below where I used a tripod. Also in this example, only the first singular value is used to reconstruct the background.
<div>
	<div style="display: flex; justify-content: space-between;">
		<video playsinline autoplay loop mute id="video5" height="100%" width="33%">
		  <source src="{{posturl}}/mov2_o_w.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
		<video playsinline autoplay loop mute id="video6" height="100%" width="33%">
		  <source src="{{posturl}}/mov2_f_w.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
		<video playsinline autoplay loop mute id="video7" height="100%" width="33%">
		  <source src="{{posturl}}/mov2_b_w.mp4" type="video/mp4">
		  Your browser does not support HTML video.
		</video>
	</div>
	<small>Original video (left), high-frequency component (middle) and low-frequency component (right).</small>
</div>
<div>
	<img width="100%" src="{{posturl}}/mov2_b.jpg" type="image/jpg">
	<small>Larger view of the background video's first frame.</small>
</div>

This is much better. Closer inspection shows that some leg artefacts are present on the hedge.

The technique is extremely simple, yet very powerful when the video is stable and the objects to be filtered are moving most of the time. There are probably more tricks that could have been performed in pre-processing the data for better results. It would also be interesting to try an RPCA algorithm, e.g. <a href="https://arxiv.org/abs/1410.7660" target="_blank">Non-convex Robust PCA</a>.

From the assumption that the video consists of two components, the background and the foreground (moving objects), it would be interesting to see how well a <a href="https://en.wikipedia.org/wiki/Non-negative_matrix_factorization" target="_blank">non-negative matrix factorisation (NMF)</a> algorithm would perform.

<script>
// POSTs SCRIPT
var _video = document.getElementsByTagName('video');

function isScrolledIntoView( element ) {
  var elementTop    = element.getBoundingClientRect().top,
      elementBottom = element.getBoundingClientRect().bottom;

  return elementTop >= 0 && elementBottom <= window.innerHeight;
}

window.addEventListener("scroll", function(){
  for (var i = 0, l = _video.length; i < l; i++){
	if (isScrolledIntoView(_video[i])) {
	  _video[i].play();
	}
	else {
	  _video[i].pause()
	}
  }
})
</script>