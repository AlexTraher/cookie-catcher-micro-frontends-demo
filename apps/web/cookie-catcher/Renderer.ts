import Box from "./Box";
import Cookie from "./Cookie";
import { Direction } from "./types";



export default class Renderer {
  static listener: (interceptCount: number) => void;
  static doneListener: (interceptCount: number) => void
  static canvasContext: CanvasRenderingContext2D;
  static canvasWidth: number;
  static canvasHeight: number;
  static initialised: boolean = false;
  static direction: Direction = Direction.NONE;
  static cookieImage: HTMLImageElement;

  static init(canvasContext: CanvasRenderingContext2D, cookieCount: number, canvasWidth: number, canvasHeight: number, boxSpeed: number, listener: (interceptCount: number) => void, doneListener: (interceptCount: number) => void) {
    this.listener = listener;
    this.doneListener = doneListener;
    this.canvasContext = canvasContext;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;

    for (let i = 0; i < cookieCount; i++) {
      Cookie.create(
        Math.floor(this.random(canvasWidth)),
        Math.floor(this.random(canvasHeight * 0.01)) + 1,
        this.random(0.1, 0.01),
      );
    }

    Box.create(this.canvasWidth / 2, this.canvasHeight - 50, boxSpeed, canvasWidth - 100);
    
    const img = new Image()
    img.src = "./cookie.png";
    img.onload = () => {
      debugger;
      this.cookieImage = img;
      this.initialised = true;
      this.listener(Cookie.interceptCount);
    }

    console.log(this.canvasHeight);
  }

  static reset() {
    // TODO - might need to do more stuff here with removing setup state
    this.initialised = false;
    Box.reset();
    Cookie.reset();
  }

  static setDirection(direction: Direction) {
    this.direction = direction;
  }

  // TODO - this doesn't belong here
  private static random(max: number, min?: number) {
    const num = Math.random() * max;
    if (min === undefined) {
      return num;
    }
    
    return num > min ? num : min;
  }


  private static renderCookie(cookie: Cookie) {
    this.canvasContext.save();
    this.canvasContext.drawImage(this.cookieImage, cookie.x, cookie.y, 25, 25);
  }

  private static renderBox(box: Box) {
    this.canvasContext.save();
    this.canvasContext.fillStyle = "black";
    this.canvasContext.beginPath();
    this.canvasContext.rect(box.x, box.y, box.width, box.height);
    this.canvasContext.stroke();
    this.canvasContext.fill();
  }

  private static testIntercept(box: Box, cookies: Set<Cookie>) {
    const lowerX = box.x;
    const upperX = box.x + box.width;

    const lowerY = box.y;
    const upperY = box.y + box.height;

    cookies.forEach((cookie) => {
      const intercepted = (cookie.x >= lowerX)
        && (cookie.x <= upperX)
        && (cookie.y >= lowerY)
        && (cookie.y <= upperY);
      if (intercepted) {
        console.log("intercepted cookie!");
      }
      cookie.intercepted = cookie.intercepted || intercepted;
    })
  }


  static tick() {
    if(!this.canvasContext || !Box.box || !this.cookieImage) {
      return;
    }

    Cookie.moveAllCookies(this.canvasHeight);
    Box.move(this.direction);
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    
    Cookie.cookies.forEach(this.renderCookie.bind(this));
    this.testIntercept(Box.box, Cookie.cookies);

    this.renderBox(Box.box);

    if (Cookie.cookies.size === 0) {
      this.doneListener(Cookie.interceptCount);
    } else {
      this.listener(Cookie.interceptCount);
    }
  }

}