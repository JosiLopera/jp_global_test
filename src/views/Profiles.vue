<template>
  <Search :page-name="this.$options.name" />
</template>

<script>
import Search from '../components/Search'

export default {
  name: 'people',
  components: { Search },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped></style>
