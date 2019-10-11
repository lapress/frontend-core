<template>
  <svg
    v-if="mini"
    width="8px"
    height="8px"
    viewBox="0 0 8 8"
  >
    <g
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g transform="translate(-346.000000, -66.000000)" :fill="color">
        <g transform="translate(20.000000, 20.000000)">
          <polygon points="331.4026 49.9641 333.5026 52.0641 332.1026 53.4641 330.0026 51.3641 327.9026 53.4641 326.5026 52.0641 328.6026 49.9641 326.5026 47.8641 327.9026 46.4641 330.0026 48.5641 332.1026 46.4641 333.5026 47.8641" />
        </g>
      </g>
    </g>
  </svg>
  <svg
    v-else
    width="20px"
    height="20px"
    viewBox="0 0 20 20"
  >
    <g
      id="Icons"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <g id="Utils" transform="translate(-380.000000, -100.000000)" :fill="color">
        <g id="icons" transform="translate(20.000000, 20.000000)">
          <polygon points="371.4489 89.9997 380.0029 98.5537 378.5559 99.9997 370.0029 91.4457 361.4489 99.9997 360.0029 98.5537 368.5559 89.9997 360.0029 81.4457 361.4489 79.9997 370.0029 88.5537 378.5559 79.9997 380.0029 81.4457" />
        </g>
      </g>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Close',
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    mini: Boolean
  },
  data: () => ({}),
  computed: {},
  methods: {},
};
</script>
