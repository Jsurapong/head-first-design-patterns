let cb1 = (data, next) => {
  console.log("cb:", data.num);
  data.num = data.num + 100;
  next();
};

let cb2 = (data, next) => {
  console.log("cb2:", data.num);
  data.num = data.num + 20;
  next();
};

let cb3 = (data, next) => {
  console.log("cb3:", data.num);
};

function middleware(cbs, data) {
  let index = 0;

  let next = () => {
    if (index < cbs.length) {
      let cb = cbs[index];
      index++;
      cb(data, next);
    }
  };
  next();
}

function main() {
  middleware([cb1, cb2, cb3], { num: 10 });
}

main();
