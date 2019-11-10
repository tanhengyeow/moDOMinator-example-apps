<template>
  <div>
    <h1 class="title">Stored CSS Injection</h1>
    <p>
      The POST API endpoint used by the form below is vulnerable to stored CSS injection.<br/>
      moDOMinator should be able to detect and attack the API endpoint once the form is submitted.
    </p>
    <br/>

    <div class="box">
      <h5 class="title is-5">Create a new comment</h5>
      <div class="field">
        <label class="label" for="input-content">Comment</label>
        <div class="control">
          <textarea id="input-content" class="textarea" v-model="content"></textarea>
        </div>
      </div>
      <div class="field">
        <label class="label" for="input-title">Style</label>
        <div class="control">
          <input id="input-title" class="input" type="text" placeholder="background-color: #B2EBF2;" v-model="title">
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" @click="addComment">Submit</button>
      </div>
    </div>

    <div class="box">
      <h5 class="title is-5" v-if="isLoading">Loading...</h5>
      <h5 class="title is-5" v-else-if="comments.length === 0">No comments found.</h5>
      <article class="media" :key="comment.id" v-for="comment in comments">
        <div class="media-content">
          <div class="content">
            <div :style="comment.style">{{ comment.content }}</div>
          </div>
        </div>
        <div class="media-right">
          <button class="delete" @click="deleteComment(comment.id)"></button>
        </div>
      </article>

      <template v-if="canLoadMore && !isLoading">
        <br/>
        <br/>
        <button :class="'button is-rounded is-info ' + (isLoadingMore ? 'is-loading' : '')" @click="loadMoreComments">
          Load more
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  import api from '@/api';
  import { Comment } from '@/types/comment';

  export default Vue.extend({
    name: 'StoredCssi',
    data() {
      return {
        isLoading: true,
        isLoadingMore: false,
        canLoadMore: true,
        comments: [] as Comment[],
        prevId: null as number | null,
        title: '',
        content: ''
      };
    },
    mounted() {
      this.reloadComments();
    },
    methods: {
      appendComments(comments: Comment[]): void {
        if (comments.length > 0) {
          this.prevId = comments[comments.length - 1].id;
        } else {
          this.canLoadMore = false;
        }
        this.comments.push(...comments);
      },
      reloadComments(): void {
        this.isLoading = true;
        this.isLoadingMore = false;
        this.canLoadMore = true;
        api.comments.getComments().then((res) => {
          this.comments = [];
          this.appendComments(res.data);
        }).finally(() => this.isLoading = false);
      },
      loadMoreComments(): void {
        if (!this.prevId) {
          return;
        }
        this.isLoadingMore = true;
        api.comments.getComments(this.prevId).then((res) => {
          this.appendComments(res.data);
        }).finally(() => this.isLoadingMore = false);
      },
      addComment(): void {
        if (this.title.length === 0 || this.content.length === 0) {
          return;
        }
        api.comments.addComment(this.title, this.content).then(() => {
          this.title = '';
          this.content = '';
          this.reloadComments();
        });
      },
      deleteComment(id: number): void {
        api.comments.deleteComment(id).then(() => {
          this.comments = this.comments.filter((comment) => comment.id !== id);
        });
      }
    }
  });
</script>
