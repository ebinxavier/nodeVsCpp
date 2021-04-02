class Complex {
  // a + ib form
  a;
  b;
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  add(num) {
    const real = this.a + num.a;
    const imag = this.b + num.b;
    return new Complex(real, imag);
  }
  square() {
    const a = this.a;
    const b = this.b;
    return new Complex(a * a - b * b, 2 * a * b);
  }
  abs() {
    return Math.sqrt(this.a * this.a + this.b * this.b);
  }
  toString() {
    return (
      this.a.toString() +
      (this.b < 0 ? "-" : "+") +
      "i" +
      Math.abs(this.b).toString()
    );
  }
}

const mandelBrot = (c, MAX_ITERATION) => {
  let z = new Complex(0, 0);
  let n = 0;
  while (z.abs() <= 2 && n < MAX_ITERATION) {
    z = z.square().add(c);
    n += 1;
  }
  return n;
};

const getImage = (DIM) => {
  // Change this window values to get different patterns
  const RE_START = -1.5;
  const RE_END = 1.5;
  const IM_START = -2.5;
  const IM_END = 0.5;
  const MAX_ITERATION = 100;
  const pixels2D = [];
  for (let x = 0; x < DIM; x++) {
    for (let y = 0; y < DIM; y++) {
      const a = IM_START + (y / DIM) * (IM_END - IM_START);
      const b = RE_START + (x / DIM) * (RE_END - RE_START);
      let c = new Complex(a, b);
      const intensity = mandelBrot(c, MAX_ITERATION);
      let intensityNormalized =
        ((MAX_ITERATION - intensity) / MAX_ITERATION) * 255;
      pixels2D[x * DIM + y] = Math.floor(intensityNormalized);
    }
  }
  return pixels2D;
};

module.exports = {
  getImage,
};
