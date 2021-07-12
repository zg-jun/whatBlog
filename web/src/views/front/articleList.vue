<style lang="scss" scoped>
.article-list-container{
  display: grid;
  grid-template-columns: repeat(1,1fr);
  gap: 20px 0;
}

@media (max-width: 1200px) {
  .article-list-container{
    // grid-template-columns: repeat(1,1fr);
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>

<template>
  <div class="article-list-container">
    <wb-article-card
      v-for="item in articleData"
      :key="item._id"
      :data="item"
    ></wb-article-card>
    <p v-if="loading">加载中...</p>
    <p v-else-if="articleData.length===0">咋回事，啥也没搜到~</p>
  </div>
</template>

<script>
import { getArticle } from '@service/front/article/article';

export default {
  data() {
    return {
      articleData: [],
      loading:false
    }
  },
  filters: {},
  created() {
    this.getList()
  },
  methods: {
    getList(searchData={}) {
      this.loading = true;
      getArticle(searchData).then((res) => {
        this.articleData = res.data.data;
        this.loading = false;
      })
    },
  },
}
</script>
