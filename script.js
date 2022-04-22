// define carousel class
class Carousel {
  // pass target HTML element to be basis of carousel
  constructor(element) {
    // initialize carousel index to 0
    console.log(this);
    this.index = 0;

    // initialize carousel lock state and duration
    this.locked = false;
    this.lockDuration = 350;

    // copy references of passed element into property
    this.element = element;

    // query element's ul aka "container"
    this.container = element.querySelector("ul");

    // query ALL element's li aka "items"

    this.list = element.querySelectorAll("li");

    // query element's prev button and bind click event
    this.element
      .querySelector(".prevButton")
      .addEventListener("click", (event) => {
        event.preventDefault();

        // if carousel's state is locked, do nothing
        if (this.locked) {
          return;
        }

        // move carousel backword
        this.prev();

        // lock carousel
        this.lock();
      });

    // query element's next button and bind click event
    this.element
      .querySelector(".nextButton")
      .addEventListener("click", (event) => {
        event.preventDefault();

        // if carousel's state is locked, do nothing
        if (this.locked) {
          return;
        }

        // move carousel foward??
        this.next();

        // lock carousel
        this.lock();
      });

    // loop through all carousel items
    for (let i = 0; i < this.list.length; i++) {
      // bind click event to each carousel item
      this.list[i].addEventListener("click", (event) => {
        console.log(event)
        event.preventDefault();

        // on click of item set carousel index to that value
        this.index = i;

        // update carousel visuals
        this.update();
      });
    }

    // update carousel visuals on init
    this.update();
  }

  next() {
    // increment carousel index
    this.index++;

    // wrap carousel index to start if exceeds length
    if (this.index >= this.list.length) {
      this.index = 0;
    }

    // update carousel visuals
    this.update();
  }

  prev() {
    // decrement carousel index
    this.index--;

    // wrap carousel index to end if below start
    if (this.index < 0) {
      this.index = this.list.length - 1;
    }

    // update carousel visuals
    this.update();
  }

  update() {
    // set carousel's container transform translations based on current index
    this.container.style.transform = `translateX(-${this.index * 100}%)`;

    // loop through all carousel items and remove "current" class
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].classList.remove("current");
    }

    // select current carousel items @ index and add "current" class
    this.list[this.index].classList.add("current");
  }

  lock() {
    // set carousel's state to locked
    this.locked = true;

    // timeout for duration, and unlock on callback
    setTimeout(() => {
      this.locked = false;
    }, this.lockDuration);
  }
}

// create instance of carousel with #carousel1 element
const carousel = new Carousel(document.querySelector("#projects .carousel"));

// create instance of carousel with #carousel2 element
// const carousel2 = new Carousel(document.querySelector("#carousel2"));
