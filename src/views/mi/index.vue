<template>
  <div class="box">
    <el-container class="container">
      <el-header>
        <div>
          <span v-if="this.$store.state.user.token">
            <a>{{this.$store.state.user.name}}</a>
            <a @click="logout">Logout</a>
            <i class="el-icon-shopping-cart-1" @click="toogle"></i>
          </span>
          <span v-else>
            <a @click="doLogin">Login</a>
            <i class="el-icon-shopping-cart-1"></i>
          </span>
        </div>
        <div>
          Sort By
          <span @click="changeSort">
            price
            <i class="el-icon-d-caret" v-show="sort==0"></i>
            <i class="el-icon-caret-top" v-show="sort==1"></i>
            <i class="el-icon-caret-bottom" v-show="sort==2"></i>
          </span>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <ul>
            <li
              :class="{active:index==activePrice}"
              @click="activePrice=index"
              v-for="(item,index) in priceAll"
              :key="index"
            >{{item}}</li>
          </ul>
        </el-aside>
        <el-main class="main" v-loading="loading" element-loading-text="拼命加载中">
          <div class="items" v-for="(item,index) in searchGoods" :key="index">
            <div>
              <img :src="'/img/'+item.productImage" />
            </div>
            <div>
              <p>{{item.productName}}</p>
              <p>￥{{item.salePrice}}</p>
            </div>
            <div>
              <el-button type="danger" plain @click="addCart(item)">加入购物车</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getGoodsList();
    window.addEventListener("scroll", this.getMore);
  },
  data() {
    return {
      priceAll: [
        "All",
        "0.00-100",
        "100.00-200.00",
        "200.00-500.00",
        "500.00-1000.00",
        "1000.00-5000.00",
      ], //价格区间
      activePrice: 0,
      sort: 0,
      goodsList: [],
      page: 2,
      flag: true, //可以加载
      loading: false,
    };
  },
  computed: {
    //商品搜索信息
    searchGoods() {
      let goods = this.goodsList;
      //sort排序
      goods.sort((a, b) => {
        if (this.sort == 1) {
          return a.salePrice - b.salePrice;
        } else if (this.sort == 2) {
          return b.salePrice - a.salePrice;
        }
      });

      if (this.activePrice != 0) {
        let price = this.priceAll[this.activePrice];
        let min = price.split("-")[0];
        let max = price.split("-")[1];

        goods = goods.filter((item) => {
          return item.salePrice >= min && item.salePrice < max;
        });
      }

      return goods;
    },
  },
  methods: {
    changeSort() {
      if (this.sort == 0 || this.sort == 2) {
        this.sort = 1;
      } else {
        this.sort = 2;
      }
    },

    getGoodsList() {
      this.$axios({
        url: "/data.json",
      }).then((res) => {
        console.log(res);
        this.goodsList = res.data.result.list;
      });
    },
    //获取更多的数据
    getMore() {
      if (this.page > 3 || this.flag == false) {
        return false;
      }
      this.flag = false;
      this.loading = true;

      setTimeout(() => {
        this.$axios({
          url: `/data${this.page}.json`,
        }).then((res) => {
          this.goodsList.push(...res.data.result.list);
          this.page++;
          this.flag = true;
          this.loading = false;
        });
      }, 1500);
    },
    doLogin() {
      this.$store.commit("login", { name: "lyr", token: "1234567" });
    },
    logout() {
      this.$store.commit("logout");
    },
    addCart(data) {
      if (this.$store.state.user == "") {
        this.$message("用户必须要登录");
        return false;
      }
      //加入购物车的代码
      this.$store.commit("addCart", data);

      this.$message({
        message: "加入购物车",
        type: "success",
      });
    },
    toogle() {
      this.$router.push("/mi/cart");
    },
  },
};
</script>

<style lang="scss">
.box {
  width: 100%;
  .container {
    cursor: pointer;
    width: 90%;
    margin: 0px auto;
    background: #f0f0f0;
    .el-header {
      width: 100% !important;
      height: 110px !important;
      margin-bottom: 10px;
      padding: 0px;
      div {
        width: 100%;
        padding: 0px 10px;
        box-sizing: border-box;
        height: 50px;
        line-height: 50px;
        background: #fff;
        text-align: right;
        a {
          padding: 0px 5px;
          color: #0088dd;
        }
        span {
          padding-left: 10px;
        }
      }
      div:nth-of-type(1) {
        margin-bottom: 10px;
      }
    }
    @media screen and(min-width: 750px) {
      .el-aside {
        width: 15% !important;
        overflow: hidden;
        ul {
          width: 100%;
          list-style: none;
          padding: 0px;
          li {
            width: 100%;
            line-height: 50px;
            text-indent: 10px;
          }
          li.active {
            border-left: #a00000 2px solid;
            background: #fff;
          }
        }
      }
    }
    @media screen and (max-width: 750px) {
      .el-aside {
        display: none;
      }
    }

    .main {
      width: 80% !important;
      display: flex;
      flex-wrap: wrap;
      .items:hover {
        transform: scale(1.02);
        box-shadow: 0px 3px 5px rgba($color: #000000, $alpha: 0.5);
      }
      @media screen and(min-width:960px) {
        .items {
          width: 23%;
          margin: 1%;
          background: #fff;
          padding: 5px;
          box-sizing: border-box;
          div {
            width: 100%;
            img {
              width: 90%;
            }
            .el-button {
              width: 100%;
            }
            p:nth-of-type(2) {
              color: #a00000;
            }
          }
        }
      }

      @media screen and (min-width: 750px) and (max-width: 960px) {
        .items {
          width: 48%;
          margin: 1%;
          background: #fff;
          padding: 5px;
          box-sizing: border-box;
          div {
            width: 100%;
            img {
              width: 90%;
            }
            .el-button {
              width: 100%;
            }
            p:nth-of-type(2) {
              color: #a00000;
            }
          }
        }
      }

      @media screen and (max-width: 750px) {
        .items {
          width: 98%;
          margin: 1%;
          background: #fff;
          padding: 5px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          div {
            width: 100%;
            img {
              width: 90%;
            }
            .el-button {
              width: 100%;
            }
            p:nth-of-type(2) {
              color: #a00000;
            }
          }
        }
      }
    }
  }
}
</style>