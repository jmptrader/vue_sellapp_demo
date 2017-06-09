<template>
	<div id='header'>
		<header-top :seller='seller'></header-top>
		<header-nav></header-nav>
	</div>
</template>

<script>
import headerNav from './header-nav.vue';
import headerTop from './header-top.vue';

export default {
  name: 'header',
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    'header-nav': headerNav,
    'header-top': headerTop
  }
};
</script>

<style scoped>
</style>
