import express from "express";
const app = express();

// respond with "hello world" when a GET request is made to the homepage

const cb0 = function (req: string, res: string, next) {
  console.log("CB0");
  next();
};

const cb1 = function (req: string, res: string, next) {
  console.log("CB1");
  next();
};

const cb2 = function (req: string, res: string) {
  console.log("Hello from C!");
};

function middleware(
  callbacks: ((req: any, res: any, next: any) => void)[]
): void {
  let index = 0;

  const req = "req";
  const res = "res";

  const next = () => {
    if (index < callbacks.length) {
      callbacks[index++](req, res, next);
    } else {
      console.log("Middleware chain completed");
    }
  };

  console.log(JSON.stringify(next));

  next();

  //   for (let i = 0; i < callbacks.length; i++) {
  //     callbacks[i](req, res, next.bind(req, res)());
  //   }
}

middleware([cb0, cb1]);
