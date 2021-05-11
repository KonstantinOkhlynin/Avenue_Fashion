export class Zoom {
constructor (container, zoomer) {
this.container = container;
this.zoomer = zoomer;
}

handleOffset = (e = null, el) => {
  let offsetX = e.offsetX
  let offsetY = e.offsetY

  let x = offsetX / el.offsetWidth * 100
  let y = offsetY / el.offsetHeight * 100

  this.zoomer.style.backgroundPosition = `${x}% ${y}%`
}

zoomIn = () => {
  this.zoomer.style.display = 'block'
  this.zoomer.style.backgroundImage = `url('${this.container.dataset.slideItemLink}')`
}

zoomMove = (e) => {
  this.handleOffset(e, this.zoomer)
}

zoomOut = () => {
  this.zoomer.style.backgroundImage = 'unset'
  this.zoomer.style.display = 'none'
}

listener = () => {
  if (document.querySelector('.main-js')) {
  this.container.addEventListener('mouseover', this.zoomIn)
  this.zoomer.addEventListener('mousemove', this.zoomMove)
  this.zoomer.addEventListener('mouseleave', this.zoomOut)
  }
}




}