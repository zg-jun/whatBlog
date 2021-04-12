<style lang="scss" scoped>
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
  <div>
    <articleCard
      v-for="item in articleData"
      :key="item._id"
      :data="item"
    ></articleCard>
  </div>
</template>

<script>
import { getArticle } from '@service/client/article/article'
import articleCard from '@components/articleCard/articleCard'
export default {
  data() {
    return {
      articleData: [],
    }
  },
  components: { articleCard },
  filters: {},
  created() {
    document.title = 'Whatblog'
    this.getArticleList()
  },
  methods: {
    getArticleList() {
      getArticle().then((res) => {
        this.articleData = res.data.data
      })
    },
  },
}
</script>
