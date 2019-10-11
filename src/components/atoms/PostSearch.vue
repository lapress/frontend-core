<template>
  <div class="p-search">
    <p class="control">
      <input
        class="input"
        type="text"
        placeholder="Szukaj artykułu..."
        @click.prevent="isSidebarOpen = true"
      >
    </p>

    <b-aside
      :is-show="isSidebarOpen"
      placement="right"
      title="Wyszukiwanie artykułu"
      :show-ok="false"
      cancel-text="Anuluj"
      style="z-index: 10000000"
      @close="isSidebarOpen = false"
    >
      <p class="control" :class="{ 'is-loading': loading }">
        <input
          ref="search"
          v-model="query"
          class="input"
          type="text"
          placeholder="Szukaj artykułu..."
          @keydown.enter="submit"
          @keydown.esc="reset"
        >
        <span v-if="count" class="input__desc">Znaleziono {{ count }} wpisów</span>
      </p>
      <transition name="slideDown">
        <ul v-show="showResults">
          <li
            v-for="post in items"
            :key="post.id"
            class="p-item"
            @click="select(post)"
          >
            <strong class="p-item__title" v-text="post.title" />
            <div class="p-item__footer">
              <span class="p-item__date" v-text="post.date" />
              <span class="p-item__separator">&#183;</span>
              <span class="p-item__author" v-text="post.author.name" />
            </div>
          </li>
        </ul>
      </transition>
    </b-aside>
  </div>
</template>

<script>
import bodybuilder from 'bodybuilder';
import { quickSearchByQuery } from '../../utils/search';

export default {
  name: 'PostSearch',
  props: {
    type: {
      type: String,
      default: 'post'
    },
    includeFields: {
      type: Array,
      default: () => ['id', 'title', 'thumbnail', 'author', 'date', 'excerpt']
    },
    excludeFields: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    isSidebarOpen: false,
    loading: false,
    submited: false,
    count: null,
    query: '',
    items: []
  }),
  computed: {
    showResults() {
      if (this.loading) {
        return false;
      }

      return this.items.length > 0;
    }
  },
  watch: {
    isSidebarOpen(isOpen) {
      if (isOpen) {
        this.$nextTick(() => {
          this.$refs.search.focus();
        });
      }
    },
  },
  methods: {
    select(post) {
      this.$emit('select', post);
      this.isSidebarOpen = false;
      this.reset();
    },
    reset() {
      this.count = null;
      this.query = '';
      this.loading = false;
      this.items = [];
    },
    submit() {
      this.loading = true;
      this.submited = true;

      const query = bodybuilder()
        .filter('term', 'type', this.type)
        .query('multi_match', 'fields', ['title', 'body', 'excerpt', 'categories.name', 'tags.name', 'cars.name', 'author.name'], { query: this.query });

      quickSearchByQuery({
        query,
        includeFields: this.includeFields,
        excludeFields: this.excludeFields,
        size: 10
      }).then(({ hits }) => {
        const map = hits.hits.map(item => item._source);
        this.items = map;
        this.count = hits.total;
        this.loading = false;
      }).catch(() => {
        this.loading = false;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '../../sass/variables';

.control {
  margin-bottom: 20px;
}

.input {
  box-shadow: none;

  &__desc {
    color: map-get($polarNight, 100);
    font-size: 12px;
  }
}

.p-item {
  cursor: pointer;
  padding: 10px 14px;
  transition: .3s ease all;

  &:hover {
    background: map-get($snowStorm, 100);
  }

  &__title {
    color: map-get($polarNight, 300);
    display: block;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 5px;
  }

  &__footer {
    color: map-get($polarNight, 100);
    font-size: 10px;
  }

  &__separator {
    color: map-get($polarNight, 100);
    display: inline-block;
    margin: 0 5px;
    opacity: .7;
  }
}

</style>
