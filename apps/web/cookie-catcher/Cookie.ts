

export default class Cookie {
  x: number;
  y: number;
  speed: number;
  height: number = 15;
  done: boolean = false;
  intercepted = false;
  static cookies: Set<Cookie> = new Set();
  static interceptCount = 0;

  constructor(x: number, y: number, speed: number) {
    this.x = x;
    this.y = y;
    this.speed = speed;
  }

  move(max: number) {
    if (this.done) {
      return;
    }
    let newY = this.y + (this.y * this.speed);
    // if (newY >= max - this.height) {
    //   newY = max - this.height;
    // }

    this.y = newY;

    if (this.y >= max + this.height) {
      this.done = true;
    }
  }

  static create(x: number, y: number, speed: number) {
    const cookie = new Cookie(x, y, speed);
    this.cookies.add(cookie);
  }

  static moveAllCookies(max: number) {
    this.cookies.forEach((cookie) => {
      if (cookie.intercepted) {
        this.interceptCount++;
        this.cookies.delete(cookie);
      }
      if (cookie.done) {
        this.cookies.delete(cookie);
      } else {
        cookie.move(max);
      }
    });
  }

  static reset() {
    this.cookies = new Set();
    this.interceptCount = 0;
  }
}

let d = true;