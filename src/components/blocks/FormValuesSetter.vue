<template>
  <div>
    <input
      v-for="key in Object.keys(form)"
      :key="key"
      type="hidden"
      :name="getInputName(key)"
      :value="getValue(key)"
    >
  </div>
</template>

<script>
export default {
  name: 'LpFormValuesSetter',
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    name: {
      type: String,
      default: null
    }
  },
  data: () => ({}),
  computed: {},
  methods: {
    getInputName(key) {
      if (this.name) {
        return `${this.name}[${key}]`;
      }
      return key;
    },
    getValue(key){
      if(!this.form[key]) {
        return null;
      }

      // if(typeof this.form[key] === 'string' || this.form[key] instanceof String) {
      //   return this.form[key];
      // }
      //
      // return JSON.stringify(this.form[key]);


      if(Array.isArray(this.form[key])) {
        return JSON.stringify(this.form[key]);
      }

      return this.form[key];
    },
  },
};
</script>
