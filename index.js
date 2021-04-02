const draw = require("./modules/draw");
const Runner = require("./testRunner");
const runner = new Runner();
let response;

const LIMIT = 200000;
response = runner.run("sumOfN", [LIMIT]);

// const DIM = 100;
// response = runner.run("mandelBrot", [DIM]);
// console.log("mandelBrot", response.time);
// const pixelsCpp = response.result.cpp;
// const pixelsJs = response.result.js;
// if (pixelsCpp) draw(pixelsCpp, { is1D: true, DIM, fileName: "cpp" });
// if (pixelsJs) draw(pixelsJs, { is1D: true, DIM, fileName: "js" });

console.log("sumOfN", response);
