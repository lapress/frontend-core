<template>
  <affix :offset="32">
    <header class="header">
      <div class="header__left">
        <slot name="title" :title="title" :subtitle="subtitle">
          <h1 v-if="title" class="title-1" v-text="title" />
          <p v-if="subtitle" class="s-title" v-text="subtitle" />
        </slot>
      </div>
      <div class="header__middle">
        <slot name="middle"></slot>
      </div>
      <div class="header__actions">
        <slot />
      </div>
    </header>
  </affix>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    title: {
      type: String,
      default:null,
    },
    subtitle: {
      type: String,
      default:null,
    }
  },
};
</script>
<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  background: #32373c;
  padding: 15px 20px;

  &__middle {
    margin: 0 auto;
  }
}

.title-1 {
  color: #ffffff;
  opacity: .8;
}

.s-title {
  color: #ffffff;
  opacity: .5;
}

.button {
  border: none;
  box-shadow: none;
}
</style>
