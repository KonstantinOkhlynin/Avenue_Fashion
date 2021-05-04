export class Modal {
  constructor(container) {
    this.container = container

  }

createModal = () => {
  const modal = document.createElement('div');
  modal.classList.add('modal');

  const content = `
  <nav class="modal__nav">
                  <ul class="modal__list modal__list-js">
                  </ul>

                  <ul class="modal__list modal__list-js-two">
                  </ul>
                </nav>

                <div class="modal__sale">
                  <p class="modal__sale-title">autumn sale!</p>
                  <p class="modal__sale-subtitle">up to 50% off</p>
                </div>

`
 modal.innerHTML = content;
  return this.container.appendChild(modal);
}

addModal = (arr) => {
  this.createModal()
  this.appendTitle(arr)
  this.appendItem(arr)
}

appendItem = (arr) => {
  const list = this.container.querySelector('.modal__list-js')
  const listTwo = this.container.querySelector('.modal__list-js-two')

  arr[0].forEach((item)=>{
list.innerHTML += `<li class="modal__item">${item}</li>`
})

arr[1].forEach((item)=>{
  listTwo.innerHTML += `<li class="modal__item">${item}</li>`
  })

}

appendTitle = (arr) => {
  const list = this.container.querySelector('.modal__list-js')
  const listTwo = this.container.querySelector('.modal__list-js-two')

  arr[2].forEach((item)=>{
    list.innerHTML = `<p class="modal__title">${item}</p>`
    })

  arr[3].forEach((item)=>{
    listTwo.innerHTML = `<p class="modal__title">${item}</p>`
    })


}

}
