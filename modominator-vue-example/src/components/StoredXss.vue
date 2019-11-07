<template>
  <div>
    <h1 class="title">Stored XSS</h1>
    <p>
      The POST API endpoint used by the form below is vulnerable to stored XSS.<br/>
      moDOMinator should be able to detect and attack the API endpoint once the form is submitted.
    </p>
    <br/>

    <div class="box">
      <h5 class="title is-5">Create a new article</h5>
      <div class="field">
        <label class="label" for="input-title">Title</label>
        <div class="control">
          <input id="input-title" class="input" type="text" v-model="title">
        </div>
      </div>
      <div class="field">
        <label class="label" for="input-content">Content</label>
        <div class="control">
          <textarea id="input-content" class="textarea" placeholder="Supports Markdown." v-model="content"></textarea>
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" @click="addArticle">Submit</button>
      </div>
    </div>

    <div class="box">
      <h5 class="title is-5" v-if="isLoading">Loading...</h5>
      <h5 class="title is-5" v-else-if="articles.length === 0">No articles found.</h5>
      <article class="media" :key="article.id" v-for="article in articles">
        <div class="media-content">
          <div class="content">
            <h5 class="subtitle is-5">{{ article.title }}</h5>
            <div v-html="article.content"></div>
          </div>
        </div>
        <div class="media-right">
          <button class="delete" @click="deleteArticle(article.id)"></button>
        </div>
      </article>

      <template v-if="canLoadMore && !isLoading">
        <br/>
        <br/>
        <button :class="'button is-rounded is-info ' + (isLoadingMore ? 'is-loading' : '')" @click="loadMoreArticles">
          Load more
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import marked from 'marked';
  import Vue from 'vue';

  import api from '@/api';
  import { Article } from '@/types/article';

  export default Vue.extend({
    name: 'StoredXss',
    data() {
      return {
        isLoading: true,
        isLoadingMore: false,
        canLoadMore: true,
        articles: [] as Article[],
        prevId: null as number | null,
        title: '',
        content: ''
      };
    },
    mounted() {
      this.reloadArticles();
    },
    methods: {
      appendArticles(articles: Article[]): void {
        for (const article of articles) {
          article.content = marked(article.content);
        }
        if (articles.length > 0) {
          this.prevId = articles[articles.length - 1].id;
        } else {
          this.canLoadMore = false;
        }
        this.articles.push(...articles);
      },
      reloadArticles(): void {
        this.isLoading = true;
        this.isLoadingMore = false;
        this.canLoadMore = true;
        api.articles.getArticles().then((res) => {
          this.articles = [];
          this.appendArticles(res.data);
        }).finally(() => this.isLoading = false);
      },
      loadMoreArticles(): void {
        if (!this.prevId) {
          return;
        }
        this.isLoadingMore = true;
        api.articles.getArticles(this.prevId).then((res) => {
          this.appendArticles(res.data);
        }).finally(() => this.isLoadingMore = false);
      },
      addArticle(): void {
        if (this.title.length === 0 || this.content.length === 0) {
          return;
        }
        api.articles.addArticle(this.title, this.content).then(() => {
          this.title = '';
          this.content = '';
          this.reloadArticles();
        });
      },
      deleteArticle(id: number): void {
        api.articles.deleteArticle(id).then(() => {
          this.articles = this.articles.filter((article) => article.id !== id);
        });
      }
    }
  });
</script>
