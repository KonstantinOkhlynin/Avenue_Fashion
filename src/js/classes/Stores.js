export class Stores {
  constructor(button, arr) {
    this.arr = arr
    this.button = button
  }

  stores = (item) => {
    const storesInfoMap = document.querySelector('.stores-info__map')
    const storesinfoTitle = document.querySelector('.stores-info__title')
    const storesinfoSubtitle = document.querySelector('.stores-info__subtitle')
    const storesInfoText = document.querySelector('.stores-info__text')
    const storesInfolink = document.querySelector('.stores-info__link')


    console.log(storesInfoMap.src)



    storesInfoMap.src = item.map;
    storesinfoTitle.textContent = item.title;
    storesinfoSubtitle.textContent = item.subtitle;
    storesInfoText.textContent = item.text;
    storesInfolink.href = item.link_map;
    storesInfolink.textContent = item.link_text;


  }

  nextStores = (num) => {

    this.arr.forEach((item, i, arr) => {
      this.stores(arr[num])
    })

  }

  listener = (num) => {
    document.addEventListener('click', (event) => {
      if (event.target.classList.contains(this.button)) {
        this.nextStores(num)
      }
    })
  }

}