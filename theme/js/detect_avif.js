const AVIF = new Image();
AVIF.onload = function () {
  document.getElementById("avif-element").classList.add("avif-true")
  document.getElementById("avif-element").setAttribute("title", "Your browser supports the AVIF format!")
};
AVIF.onerror = function () {
  document.getElementById("avif-element").classList.add("avif-false")
  document.getElementById("avif-element").setAttribute("title", "No support for AVIF format, pictures won't show.")
};
AVIF.src =
  "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=";

const P3 = window.matchMedia('(color-gamut: p3)').matches
if (P3 === false) {
  document.getElementById("color-p3").classList.remove("color-true-p3")
  document.getElementById("color-srgb").classList.remove("color-true-srgb")
  document.getElementById("color-p3").classList.add("color-false-p3")
  document.getElementById("color-srgb").classList.add("color-false-p3")

  document.getElementById("color-gamut").setAttribute("title", "No support for P3 color space, colours will look wrong.")
} else {
  document.getElementById("color-gamut").setAttribute("title", "Your browser supports the P3 color space!")
}