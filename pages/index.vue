<template>
  <div>
    <!-- <Tutorial :res="res" />-->
    <h1>{{ res }}</h1>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(`/docker`)
      return { res: res?.data }
    } catch (e) {
      return { res: e?.message }
    }
  }
}
</script>
