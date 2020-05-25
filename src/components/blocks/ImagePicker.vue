<template>
  <div>
    <div class="placeholder" :style="placeholderStyle" @click="open">
      <div v-if="!image || !image.src" class="placeholder__inner">
        <LpImageSvg class="placeholder__icon" color="#9DABC8" />
        Wybierz obraz
      </div>
      <img v-else :src="image.src" alt="" class="image">
    </div>

  </div>
</template>

<script>
export default {
  name: 'ImagePicker',
  props: {
    value: {
      type: [Object, String],
      default: null
    },
    width: {
      type: Number,
      default: 450
    },
    height: {
      type: Number,
      default: 250
    },
    title: {
      type: String,
      default: 'Wybierz obraz'
    },
    pickerBtnText: {
      type: String,
      default: 'Wstaw obraz'
    },
    placeholder: Boolean,
    linkable: Boolean,
    multiple: Boolean,
  },
  data() {
    return {
      tries: 5,
      image: typeof this.value === 'object' ? this.value : {},
      editor: null
    };
  },
  computed: {
    placeholderStyle() {
      const style = {};

      style.width = `${this.width}px`;
      style.height = `${this.height}px`;

      return style;
    }
  },
  watch: {
    image(image) {
      this.$emit('input', image);
    }
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 3000);
  },
  methods: {
    init() {
      try {
        this.editor = window.wp.media({
          title: this.title,
          multiple: this.multiple,
        });

        this.editor.on('select', () => {
          const {url, id} = this.editor.state().get('selection').toJSON().pop();
          if (!this.image) {
            this.image = {}
          }
          this.$set(this.image, 'src', url);
          this.$set(this.image, 'id', id);

          // eslint-disable-next-line no-console
          console.log('@@@image', this.image)

          // setTimeout(() => {
          //   this.bindClickOutsideEvent();
          // }, 800);
        });

      }
      catch (e) {
        if (this.tries === 0) {
          return;
        }
        setTimeout(() => {
          this.init();
          --this.tries;
        }, 500);
      }
    },
    open() {
      this.editor.open();
    },
  },
};
</script>
<style lang="scss" scoped>
@import '../../sass/variables';

.placeholder {
  background: map-get($snowStorm, 300);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  padding: 15px;

  max-width: 100%;

  &__icon {
    margin-bottom: 20px;
    height: 32px;
    width: 32px;
  }

  &__inner {
    align-items: center;
    border: 2px dashed map-get($snowStorm, 400);
    border-radius: 4px;
    color: map-get($snowStorm, 400);
    display: flex;
    flex-direction: column;
    flex: 1;
    font-size: 14px;
    justify-content: center;
  }
}
.image {
  max-width: 100%;
  height: auto;
  max-height: 100%;
}
</style>
