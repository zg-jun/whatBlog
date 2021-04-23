<style lang='scss' scoped>
.list-title {
  text-align: center;
  color: #606975;
  span {
    font-size: 14px;
  }
}
.list-box {
  display: flex;
  flex-wrap: wrap;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 15px 30px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-bottom: 10px;
      border: 2px solid #ccc;
      &:hover {
        transition: all 0.5s linear;
        transform: scale(1.2) rotate(360deg);
      }
    }
    a {
      display: inline-block;
      max-width: 60px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 12px;
    }
  }
}
</style>

<template>
  <div>
    <h3 class="list-title">友链列表<span>{{`(共捕获${list.length}位小伙伴)`}}</span></h3>
    <div class="list-box">
      <div v-for="(item,index) in list"
           :key="index">
        <img :src="item.url"
             :alt="item.name">
        <a :href="item.url"
           :title="item.avatar"
           target="_blank">{{item.avatar}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getFriends } from '@service/front/friends/friends'

export default {
  data () {
    return {
      list: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList(){
      getFriends().then(res=>{
        this.list = res.data.data;
      })
    }
  },
}

</script>