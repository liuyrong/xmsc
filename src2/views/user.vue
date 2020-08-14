<template>
  <div>
    <div class="box">
      <div class="dbl_add" v-if="dbl_show">
        <p>用户名</p>
        <input type="text" v-model="user_name" />
        <p>手机号</p>
        <input type="text" v-model="user_sjh" />
        <p>注册时间</p>
        <input type="text" v-model="user_zcsj" />
        <p>邮箱</p>
        <input type="text" v-model="user_yx" />
        <el-button type="primary" @click="add">确定</el-button>
      </div>
      <div class="dbl_xg" v-if="dbl_xgshow">
        <p>手机号</p>
        <input type="text" v-model="newuser_sjh" />
        <p>邮箱</p>
        <input type="text" v-model="newuser_yx" />
        <el-button type="primary" @click="xgqd">确定</el-button>
      </div>
      <p>
        <el-input v-model="input" placeholder="请输入内容" class="dbl_search"></el-input>
        <el-button type="primary" @click="dbl_show = true">添加用户</el-button>
      </p>
      <div class="dbl_body">
        <table>
          <thead>
            <tr>
              <td>用户Id</td>
              <td>用户角色明</td>
              <td>用户姓名</td>
              <td>注册时间</td>
              <td>手机号</td>
              <td>邮箱</td>
              <td>用户状态</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in newuser" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.role_name }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.create_time }}</td>
              <td>{{ item.mobile }}</td>
              <td>{{ item.email }}</td>
              <td>
                <input type="checkbox" v-model="item.mg_state" />
              </td>
              <td>
                <span @click="del(index)">删除</span>
                <span @click="xg(index)">修改</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.dbl_getUser();
  },
  data() {
    return {
      dbl_user: [],
      dbl_newuser: [],
      dbl_new: [],
      dbl_show: false,
      dbl_xgshow: false,
      input: "",
      user_name: "",
      user_sjh: "",
      user_zcsj: "",
      user_yx: "",
      newuser_sjh:'',
      newuser_yx:'',
      xgIndex: 0,
    };
  },
  components: {},
  methods: {
    add() {
      var obj = new Object();
      obj.role_name = this.user_name;
      obj.mobile = this.user_sjh;
      obj.id = 1111;
      obj.username = "laalla";
      obj.create_time = this.user_zcsj;
      obj.email = this.user_yx;
      obj.mg_state = true;
      this.dbl_user.unshift(obj);
      this.dbl_show = false;
    },
    dbl_getUser() {
      this.$axios({
        url: "/userlist.json",
      }).then((res) => {
        this.dbl_user = res.data.data.users;
      });
    },
    del(i) {
      this.dbl_user.splice(i, 1);
    },
    xg(i) {
      this.xgIndex = i;
      this.dbl_xgshow = true
    },
    xgqd(){
        var i = this.xgIndex
        console.log(this.dbl_user[i])
        this.dbl_user[i].mobile = this.newuser_sjh
        this.dbl_user[i].email = this.newuser_yx
        this.dbl_xgshow = false
    }
  },
  computed: {
    newuser() {
      var arr = this.dbl_user;
      if (this.input == []) {
        return arr;
      }
      arr = this.dbl_user.filter((item) => {
        return item.role_name.indexOf(this.input) != -1;
      });
      return arr;
    },
  },
};
</script>

<style scoped lang="scss">
.dbl_right {
  background: #e9eef3;
  width: 80%;
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  p {
    width: 100%;
    height: 50px;
  }
  .dbl_body {
    width: 100%;
    background: white;
  }
  tr {
    height: 50px;
  }
}
.dbl_search {
  width: 200px;
}
.dbl_add {
  position: fixed;
  width: 400px;
  background: white;
  top: 200px;
  left: 300px;
}
.dbl_xg {
  position: fixed;
  width: 400px;
  background: white;
  top: 200px;
  left: 300px;
}
</style>
