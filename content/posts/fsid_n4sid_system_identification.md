title: fsid, N4SID system identification
date: 2020-08-25
author: Mladen Gibanica
category: Projects
tags: julia, system identification
type: 
image: 
status: published

I have, together with Tomas McKelvey, implemented the Julia version of fsid, a frequency-domain N4SID system identification algorithm.

The <a href="https://github.com/tomasmckelvey/fsid" target="_blank">fsid</a> repository contains both the Julia and Python versions. The Julia folder can be found <a href="https://github.com/tomasmckelvey/fsid/tree/master/julia" target="_blank">here</a>.

The Julia version can be installed using Pkg as
```julia-repl
julia> ]
pkg> add https://github.com/tomasmckelvey/fsid:julia
```