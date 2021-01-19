let obj1 = {
  姓: "傅",
  名: "英俊",
  姓名() {
    return this.姓 + this.名;
  },
};

console.log(obj1.姓名());

let obj2 = {
  姓: "傅",
  名: "英俊",
  get 姓名() {
    return this.姓 + this.名;
  },
};

console.log(obj2.姓名);

let obj3 = {
  姓: "傅",
  名: "英俊",
  get 姓名() {
    return this.姓 + this.名;
  },
  set 姓名(name) {
    (this.姓 = name[0]), (this.名 = name.substring(1));
  },
};

let obj3_dream = "whatever";
Object.defineProperty(obj3, "dream", {
  get() {
    return obj3_dream;
  },
  set(value) {
    obj3_dream = value;
  },
});

obj3.姓名 = "傅菁";
console.log(`姓${obj3.姓}，名${obj3.名}`);

console.log(obj3.dream);
obj3.dream = "idol";
console.log(obj3.dream);

let data = {};
data._n = 0;

Object.defineProperty(data, "n", {
  get() {
    return this._n;
  },
  set(value) {
    if (value < 0) return;
    this._n = value;
  },
});

let test = fn();
function fn() {
  return 1;
}
console.log("test:", test);

let data2 = proxy({ data1: { n: 0 } });
function proxy({ data1 }) {
  const obj = {};
  Object.defineProperty(obj, "n", {
    get() {
      return data1.n;
    },
    set(value) {
      if (value < 0) return;
      data1.n = value;
    },
  });
  return obj;
}

console.log(data2.n);
data2.n = -1;
console.log(data2.n);
data2.n = 1;
console.log(data2.n);

let myData3 = {
  n: 0,
};
let data3 = proxy2({ data: myData3 });
//const vm = new Vue({data:{n:0}})
//vm成为myData3的代理
function proxy2({ data }) {
  let value = data.n;

  //delete data.n （可省略）因为下面重新命名一个同名的n，会覆盖掉原本的
  Object.defineProperty(data, "n", {
    get() {
      return value;
    },
    set(newValue) {
      if (newValue < 0) return;
      value = newValue;
    },
  });
  //监听data
  const obj = {};
  Object.defineProperty(obj, "n", {
    get() {
      return data.n;
    },
    set(newValue) {
      if (newValue < 0) return;
      data.n = newValue;
    },
  });

  return obj;
}
data3.n = 1;
console.log(data3.n);
