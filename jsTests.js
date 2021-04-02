const { getImage } = require("./modules/mandelBrot");
module.exports = {
  mandelBrot: (DIM) => {
    return getImage(DIM);
  },
  sumOfN: (LIMIT) => {
    let sum = 0;
    for (let i = 0; i < LIMIT; i++) {
      sum += i;
    }
    return sum;
  },
};
