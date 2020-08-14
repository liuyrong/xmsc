import Vue from 'vue'
import Vuex from 'vuex'

import VuexPersist from "vuex-persist";//导入持久化的工具
Vue.use(Vuex)

//实例化插件
const vuexLocal = new VuexPersist({
  key:"mi_vuex",
  storage: window.localStorage
});


export default new Vuex.Store({
  state: {
    user:"", //用户信息
    cartList:[]  //购物车数据
  },
  mutations: {
    login(state,payload){
      state.user = payload;
    },
    logout(state){   
      state.user = "";
    },
    //加入购物车的数据
    addCart(state,payload){
      //通过findIndex找到当前商品的_id是否存在
      console.log(payload)
      let index = state.cartList.findIndex(item=>{
        return item._id == payload._id;
      })
      console.log(index);
      if(index > 1){
        state.cartList[index].num++;
      }else{
        payload.num = 1;
        payload.checked = true;
        // vue.set(payload,"num",1)
        // vue.set(payload,"checked",true)
        
        state.cartList.push(payload)
      }
      console.log(state.cartList)
    },
    submitCart(state,payload){
      state.cartList = payload;
    }
  },
  actions: {

  },
  plugins:[vuexLocal.plugin]
})
