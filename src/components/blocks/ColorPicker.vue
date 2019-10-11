<template>
  <div class="lp-color-picker">
    <div v-if="label" class="lp-color-picker__label" v-text="label" />
    <ColorPicker
      :value="value"
      :show-alpha="alpha"
      :predefine="predefine"
      @input="(value) => $emit('input', value)"
    />
  </div>
</template>

<script>
import { ColorPicker } from 'element-ui';

export default {
  name: 'LpColorPicker',
  components: { ColorPicker },
  props: {
    label: {
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    },
    alpha: {
      type: Boolean,
      default: true
    },
    disabled: Boolean
  },
  computed: {
    predefine() {
      if (!this.$lapress.data.colorpicker) {
        return [];
      }

      return this.$lapress.data.colorpicker.predefine || [];
    }
  }
};
</script>
<style lang="scss" scoped>
@import '../../sass/variables';

.lp-color-picker {
  display: flex;
  align-items: center;

  &__label {
    font-weight: 600;
    margin-right: 10px;
  }
}
</style>
<style lang="scss">
.el-color-dropdown.el-color-picker__panel {
  z-index: 200000 !important;

}
</style>
