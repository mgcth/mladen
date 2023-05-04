title: NastranResults.jl, a Nastran file reader in Julia
date: 2018-06-13
author: Mladen Gibanica
category: Projects
tags: julia, nastran
status: published

I have been working on a Nastran op4 file reader in Julia for a while in my spare time. The idea is to use it in my research on model-order reduction that I'm implementing in Julia.

A version with support for OP4 and SOL103, SOL111/108  punch file reading can be found here: <a href="https://github.com/mgcth/NastranResults.jl" target="_blank">NastranResults.jl</a>. HDF5 ability will be added later.

Installed using Pkg as
```julia-repl
julia> ]
pkg> add https://github.com/mgcth/NastranResults.jl
```
