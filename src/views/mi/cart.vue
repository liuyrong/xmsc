<template>
  <div>
      <table class="table" border="0px">
          <thead>
              <tr>
                  <th>
                      <input type="checkbox" :checked="checked" @change="checkAll"/>全选
                  </th>
                  <th>商品图片</th>
                  <th>商品价格</th>
                  <th>商品数量</th>
                  <th>商品小计</th>
                  <th>操作</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,index) in cartList" :key="index">
                  <td>
                      <input type="checkbox" v-model="item.checked" /> 
                  </td>
                  <td>
                      <img :src="'/img/'+item.productImage"/>
                      <span>{{item.productName}}</span>
                  </td>
                  <td>￥{{item.salePrice | numFormat}}</td>
                  <td>
                      <button @click="decr(index)">-</button>
                      <input type="text" v-model="item.num"/>
                      <button @click="item.num++">+</button>
                  </td>
                  <td>
                      ￥{{item.salePrice*item.num | numFormat}}
                  </td>
                  <td>
                      <i class="el-icon-delete" @click="remove(index)"/>
                  </td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td colspan="1"></td>
                  <td colspan="5" style="text-align: right;">
                      商品总价:<strong>￥{{totalAmounts |numFormat}}</strong>
                      &nbsp;&nbsp;&nbsp;
                      <el-button type="danger">去结算</el-button>
                      <el-button type="info" @click="$router.push('/mi/home')">继续购物</el-button>
                  </td>
              </tr>
          </tfoot>
      </table>
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
      this.cartList = this.$store.state.cartList;
  },
  data() {
    return {
        cartList: [],
        checked: true
    };
  },
  computed:{
      totalAmounts(){
          let amounts = 0;
          this.cartList.forEach(item=>{
            if(item.checked){
                amounts += item.salePrice*item.num;
            }
          })
          console.log(this.cartList);

          if(this.cartList.length>0){
              this.$store.commit("submitCart",this.cartList);
          }

          return amounts;
      }
  },
  filters:{
      numFormat(val,num=2){
          return val.toFixed(num);
      }
  },
  watch: {
      //监听购物车的列表数据
      cartList:{
          handler(newValue){
              let arr = newValue.filter(item=>{
                  return item.checked == true;
              });

              if(arr.length == newValue.length){
                  this.checked = true
              }else{
                  this.checked = false;
              }
          },
          deep: true,
      }
  },
  methods: {
      //设置全选的操作
      checkAll(e){
          this.cartList.map(item=>{
              item.checked = e.target.checked;
          })
      },
      decr(index){
          if(this.cartList[index].num<=1){
              alert("数量不能小于1");
              return false;
          }
          this.cartList[index].num--;
      },
      remove(index){
          this.cartList.splice(index,1);
      }
  },
};
</script>

<style lang="scss" scoped>
.table{
    width: 90%;
    margin: 20px auto;
    border-spacing: 0px;
    border-collapse: collapse;
    tr{
        border-bottom: #dddddd 1px solid;
    }
    td,th{
        text-align: center;
        padding: 5px 0px;
    }
    img{
        width: 80px;
    }
}
</style>