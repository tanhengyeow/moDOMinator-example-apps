<template>
  <div>
    <h1 class="title">Safe Implementations</h1>
    <p>
      This page demonstrates correct implementations for the widgets found in the attack pages.<br/>
      Note that moDOMinator will keep trying to attack the input field if it is unable to achieve a successful attack.
    </p>
    <br/>

    <div class="box">
      <h5 class="title is-5">Show your favorite image</h5>
      <input
        class="input"
        placeholder="Paste your favorite image URL, like https://placeimg.com/320/320/any"
        v-model="imageUrl"
      />
      <template v-if="imageUrl">
        <br/>
        <br/>
        <img :src="imageUrl" alt="Failed to load image."/>
      </template>
    </div>

    <div class="box">
      <h5 class="title is-5">Create a new review</h5>
      <div class="field">
        <label class="label" for="input-name">Your Name</label>
        <div class="control">
          <input id="input-name" class="input" type="text" v-model="name">
        </div>
      </div>
      <div class="field">
        <label class="label" for="input-content">Content</label>
        <div class="control">
          <textarea id="input-content" class="textarea" v-model="content"></textarea>
        </div>
      </div>
      <div class="control">
        <button class="button is-primary" @click="addReview">Submit</button>
      </div>
    </div>

    <div class="box">
      <h5 class="title is-5" v-if="isLoading">Loading...</h5>
      <h5 class="title is-5" v-else-if="reviews.length === 0">No reviews found.</h5>
      <article class="media" :key="review.id" v-for="review in reviews">
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ review.name }}</strong>
              <br/>
              {{ review.content }}
            </p>
          </div>
        </div>
        <div class="media-right">
          <button class="delete" @click="deleteReview(review.id)"></button>
        </div>
      </article>

      <template v-if="canLoadMore && !isLoading">
        <br/>
        <br/>
        <button :class="'button is-rounded is-info ' + (isLoadingMore ? 'is-loading' : '')" @click="loadMoreReviews">
          Load more
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  import api from '@/api';
  import { Review } from '@/types/review';

  export default Vue.extend({
    name: 'Safe',
    data() {
      return {
        imageUrl: '',
        isLoading: true,
        isLoadingMore: false,
        canLoadMore: true,
        reviews: [] as Review[],
        prevId: null as number | null,
        name: '',
        content: ''
      };
    },
    mounted() {
      this.reloadReviews();
    },
    methods: {
      appendReviews(reviews: Review[]): void {
        if (reviews.length > 0) {
          this.prevId = reviews[reviews.length - 1].id;
        } else {
          this.canLoadMore = false;
        }
        this.reviews.push(...reviews);
      },
      reloadReviews(): void {
        this.isLoading = true;
        api.reviews.getReviews().then((res) => {
          this.reviews = [];
          this.appendReviews(res.data);
          this.isLoading = false;
        });
      },
      loadMoreReviews(): void {
        if (!this.prevId) {
          return;
        }
        this.isLoadingMore = true;
        api.reviews.getReviews(this.prevId).then((res) => {
          this.appendReviews(res.data);
        }).finally(() => this.isLoadingMore = false);
      },
      addReview(): void {
        if (this.name.length === 0 || this.content.length === 0) {
          return;
        }
        api.reviews.addReview(this.name, this.content).then(() => {
          this.name = '';
          this.content = '';
          this.reloadReviews();
        });
      },
      deleteReview(id: number): void {
        api.reviews.deleteReview(id).then(() => {
          this.reviews = this.reviews.filter((review) => review.id !== id);
        });
      }
    }
  });
</script>
