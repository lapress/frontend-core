<template>
  <transition name="fade">
    <div v-show="isActive" class="overlay" :class="{ 'is-active': isActive }">
      <a href="#" class="overlay__close" @click.prevent="handleCancel">
        <LpCloseSvg />
      </a>
      <header class="overlay__header">
        <slot name="header">
          <strong v-if="title" v-text="title" />
        </slot>
      </header>
      <div class="overlay__content">
        <slot />
      </div>
      <footer class="overlay__footer">
        <slot name="footer" />
      </footer>
    </div>
  </transition>
</template>

<script>
import ModalMixin from 'vue-blu/src/components/modal/ModalMixin';

export default {
  name: 'Overlay',
  mixins: [ModalMixin],
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
@import '../../sass/variables';

.overlay {
  background: rgba(255, 255,255, .98);
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 0 20px;

  &__header {
    border-bottom: 1px solid map-get($snowStorm, 100);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    &:empty {
      display: none;
    }
  }

  &__footer {
    border-top: 1px solid map-get($snowStorm, 100);
    padding: 20px;

    &:empty {
      display: none;
    }
  }

  &__content {
    flex: 1;
  }

  &__close {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 50px;
    position: absolute;
    top: 8px;
    right: 20px;
    z-index: 10;

    .close {
      font-size: 36px;
    }
  }
}
</style>
