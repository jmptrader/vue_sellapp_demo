<template>
	<div id='app'>
		<v-header :seller='seller'></v-header>
		<div id="content">
	      <keep-alive>
	        <router-view :seller="seller"></router-view>
	      </keep-alive>
		</div>
	</div>
</template>

<script>
import header from './components/header/header.vue';

export default {
  name: 'app',
  data () {
    return {
      seller: {}
    };
  },
  created () {
    this.$http.get('/api/seller').then((reponse) => {
      reponse = reponse.body;
      if (reponse.errno === 0) {
        this.seller = reponse.data;
      }
    });
    // console.log('created');
  },
  components: {
    'v-header': header
  }
};
</script>

<style>
#content {
  width: 100%;
  position: absolute;
  top: 177px;
  bottom: 0;
  overflow: hidden;
}
</style>
