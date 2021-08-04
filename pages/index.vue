<template>
  <div>
    <Tutorial :res="res" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const res = await $axios.get(`/user`)
      console.log('res.data =', res.data);
      return { res: res.data }
    } catch (e) {
      return { res: e.message }
    }
  }
}
</script>
