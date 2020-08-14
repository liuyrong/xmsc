<template>
  <div>
    <input type="text" v-model="kes" @click="sou" />
111
    <ul>
      <li v-for="(item,index) in list" :key="index">{{ item.name }}</li>
    </ul>
    <ol>

    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "烤全羊",
          price: 3000
        },
        {
          id: 2,
          name: "烤猪蹄",
          price: 30
        },
        {
          id: 3,
          name: "烤鱼",
          price: 108
        },
        {
          id: 4,
          name: "烤乳猪",
          price: 6000
        },
        {
          id: 5,
          name: "烤辣椒",
          price: 4
        },
        {
          id: 6,
          name: "涮羊肉",
          price: 39
        },
        {
          id: 7,
          name: "涮牛肚",
          price: 40
        },
        {
          id: 8,
          name: "涮菠菜",
          price: 4
        },
        {
          id: 9,
          name: "涮牛丸",
          price: 18
        },
        {
          id: 10,
          name: "涮大虾",
          price: 39
        },
        {
          id: 11,
          name: "涮虾滑",
          price: 39
        },
        {
          id: 2,
          name: "烤猪尾巴",
          price: 30
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    sou() {
      if (this.kes == "") {
        return false;
      }

      if (kes.value) {
        let ff = json.filter(item => {
          return item.name.includes(kes.value);
        });
      }

      if (ff.length > 0) {
        let url = "";
        ff.forEach(item => {
          url += `
                               <li>
                            <p>${item.name}</p>
                        </li>
                  `;
        });
        ol.innerHtml = url
      }
    }
  }
};
</script>

<style scoped lang="less">
</style>
