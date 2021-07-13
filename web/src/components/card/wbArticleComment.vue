<style lang="scss" scoped>
.article-comment-container {
  & > div {
    display: flex;
    padding-bottom: 10px;
    &:nth-last-child(1) {
      padding: 0;
    }
    .container-l {
      img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
      }
    }
    .container-r {
      flex: 1;
      .container-r-parent {
        padding: 0 30px 0 10px;
        div + div {
          margin-top: 10px;
        }
        .container-r-c {
          p {
            font-size: 14px;
            text-align: justify;
          }
        }
        .container-r-b {
          display: flex;
          justify-content: flex-end;
          span {
            font-size: 12px;
            color: #aeaeae;
          }
        }
      }
    }
  }
}
</style>

<template>
  <div class="article-comment-container">
    <!-- 评论列表 -->
    <div v-for="item in commentData" :key="item._id">
      <div class="container-l">
        <img :src="item.avatar" />
      </div>
      <div class="container-r">
        <!-- 父级 -->
        <div class="container-r-parent">
          <div class="container-r-t">
            <h5>{{ item.nickName }}</h5>
          </div>
          <div class="container-r-c">
            <p>
              {{ item.content }}
            </p>
          </div>
          <div class="container-r-b">
            <span>{{ item.datetime | formatTime }}</span>
          </div>
        </div>
        <!-- 子级 -->
        <div class="container-r-children">
          <wb-article-comment
            v-if="item.children"
            :commentData="item.children"
          ></wb-article-comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['commentData'],
  data() {
    return {}
  },
}
</script>
