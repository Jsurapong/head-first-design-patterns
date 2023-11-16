export { };

function print() {
  console.log(this.name);

}

print.bind({ name: "foo" })()

function increment(x) {
  console.log(this.initialValue + x);

}

increment.bind({ initialValue: 5 })(10)

function sumXY(x, y) {
  console.log(x + y)
}

sumXY.bind(null, 1, 2)()
sumXY.bind(null, 1)(2)
sumXY.bind(null)(1, 2)


function sumXY2(x) {
  return function (y) {
    console.log(x + y)
  }
}

sumXY2(1)(4)