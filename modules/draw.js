const Jimp = require("jimp");
const tinygradient = require("tinygradient");
var gradient = tinygradient([
  "yellow",
  // "#dae046",
  "orange",
  "#0022aa",
]);
var colorsRgb = gradient.rgb(256);

module.exports = (pixels, { is1D = false, DIM, fileName = "file" }) => {
  console.log("Rendering image to " + fileName + ".jpg ...");
  let pixels2D = [];
  if (is1D) {
    if (!DIM) return;
    for (let i = 0; i < DIM; i++) {
      pixels2D[i] = pixels.slice(i * DIM, i * DIM + DIM);
    }
  } else {
    pixels2D = pixels;
  }
  const W = pixels2D.length;
  const H = pixels2D[0].length;
  new Jimp(W, H, function (err, image) {
    if (err) throw err;

    pixels2D.forEach((row, y) => {
      row.forEach((color, x) => {
        pixel =
          color <= 50 ? 0x0000ff : parseInt(colorsRgb[color].toHex8(), 16);
        image.setPixelColor(pixel, x, y);
      });
    });

    image.write("images/" + fileName + ".png", (err) => {
      if (err) throw err;
    });
  });
};
