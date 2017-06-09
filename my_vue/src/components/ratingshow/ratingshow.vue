<template>
	<div class="rating">
		<h1>ping</h1>
	</div>
</template>

<script>
export default {
  data () {
    return {
      ratings: {
        type: Object
      }
    };
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;

      if (response.errno === 0) {
        this.ratings = response.data;
      }

      console.log(this.ratings);
    });
  }
};
</script>

<style scoped>

</style>
