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
        <img :src="item.imgUrl"
             alt="暂无头像">
        <a :href="item.url"
           :title="item.introduce"
           target="_blank">{{item.introduce}}</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      list: [
        {
          imgUrl: 'http://ycf.mobi/static/img/top1.22374f18.jpg',
          url: 'http://ycf.mobi/',
          introduce: '市民松松的博客'
        },
        {
          imgUrl: 'https://q1.qlogo.cn/g?b=qq&nk=1196192447&s=640',
          url: 'https://www.hmister.cn/',
          introduce: 'Hmister - IT小白-Good Luck To You!'
        }
      ]
    }
  },
}

</script>