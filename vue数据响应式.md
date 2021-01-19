## 什么是 Vue 数据响应式
* 当更新或者增加data(数据)时，页面(UI)会有响应，重新渲染对应的数据。
* vue的data是响应式的
~~~
const vm=new Vue({data:{n:0}});
我如果修改vm.n，那么UI中的n就会响应我
~~~

## Vue中如何实现数据响应式
1. 使用 Object.defineProperty 中的 getter和setter修改对象属性实现数据响应

```js
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
  // -----上面完成了监听
  
  // -----下面完成了代理
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
```
2. Object.defineProperty需要一开始就写好数据，才能对已有的数据监听和代理从而实现响应式。如果data里面没有此数据，后面直接在非data的地方写入则需要用到
```js
    Vue.set(this.obj, "b", 1);
    this.$set(this.obj, "b", 1);
```
```js
new Vue({
  data: {
    obj: {
      a: 0,
    },
  },
  template: `    
    <div>
      {{obj.b}}
      <button @click='setB'>set_b</button>
      <button @click='add'>+1</button>
    </div>`,
  methods: {
    setB() {
      // Vue.set(this.obj, "b", 1);
      this.$set(this.obj, "b", 1);
    },
    add() {
      this.obj.b += 1;
    },
  },
}).$mount("#app");
```
3. data为数组，需要给数组添加元素时,通过使用
```js
this.array.push('d');实现数据响应
```
```js
new Vue({
  data: {
    arr: [1, 2, 3, 4, 5],
  },
  template: `    
    <div>
      {{arr}}
      <button @click='arr_push'>push</button>
    </div>`,
  methods: {
    arr_push() {
      this.arr.push(this.arr[this.arr.length - 1] + 1);
      console.log(this.arr.length - 1);
    },
  },
}).$mount("#app");
```

4. 数组变异方式7个
```js
push(),pop(),shift(),unshift(),splice(),sort(),reverse()会自动添加监听和代理，this.$set 作用于数组时，并不会自动添加监听和代理
```