<template>
  <div class="dbl_box">
   
    <div class="dbl_header">
      <p>
        公司名称-Logo
        <span>后台管理系统</span>
      </p>
    </div>
    <div class="dbl_container">
      <div class="dbl_left">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#0a0f2f"
          text-color="#fff  "
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="dbl_push">用户列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1">角色列表</el-menu-item>
              <el-menu-item index="1-1">权限列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="dbl_right">
        <router-view></router-view>
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
      list: [],
    };
  },
  components: {},
  methods: {
    dbl_getUser() {
      this.$axios({
        url: "/userlist.json",
      }).then((res) => {
        console.log(res);
        this.dbl_user = res.data.data.users;
        console.log(this.dbl_user)
      });
    },
    dbl_push() {
      this.$router.push({
        path: "/user",
        query: this.dbl_user,
      });
    },
  },
};
</script>

<style scoped lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
.dbl_box {
  width: 100%;
  height: 100%;
  background: #0a0f2f;
}
.dbl_header {
  color: white;
  line-height: 50px;
  text-indent: 20px;
}
.dbl_container {
  display: flex;
  width: 100%;
  height: 100%;
  .dbl_left {
    width: 20%;
  }
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
}
.dbl_search {
  width: 200px;
}

</style>
