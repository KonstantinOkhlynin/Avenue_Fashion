export class Stores {
  constructor(button, arr, container) {
    this.button = button
    this.arr = arr
    this.container = container



    this.listen()
  }

   stores = (num) => {
    const storesInfoMap = this.container.querySelector('.stores-info__map')
    const storesinfoTitle = this.container.querySelector('.stores-info__title')
    const storesinfoSubtitle = this.container.querySelector('.stores-info__subtitle')
    const storesInfoText = this.container.querySelector('.stores-info__text')
    const storesInfolink = this.container.querySelector('.stores-info__link')



    storesInfoMap.src = this.arr[num].map;
    console.log(storesInfoMap.src)

    storesinfoTitle.textContent = this.arr[num].title;
    storesinfoSubtitle.textContent = this.arr[num].subtitle;
    storesInfoText.textContent = this.arr[num].text;
    storesInfolink.href = this.arr[num].link_map;
    storesInfolink.textContent = this.arr[num].link_text;



}

 nextStores = (num) => {
    if (this.button){
      this.stores(num)
    }
  }

  listen = () => {
    document.addEventListener('click', this.nextStores())
  }

}


