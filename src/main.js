const Vue = window.Vue;

Vue.config.productionTip = false;
import getter from "./set.js";
new Vue({
  components: { getter },
  data: {
    obj: {
      a: 0,
    },
    arr: [1, 2, 3, 4, 5],
  },
  template: `    
    <div>
      {{obj.b}}
      <button @click='setB'>set_b</button>
      <button @click='add'>+1</button>
      {{arr}}
      <button @click='arr_push'>push</button>
    </div>`,
  methods: {
    setB() {
      // Vue.set(this.obj, "b", 1);
      this.$set(this.obj, "b", 1);
    },
    add() {
      this.obj.b += 1;
    },
    arr_push() {
      this.arr.push(this.arr[this.arr.length - 1] + 1);
    },
  },
}).$mount("#app");
