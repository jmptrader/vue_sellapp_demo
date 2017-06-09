<template>
	<div class='header-nav'>
	  <ul class='nav'>
		<li><router-link to='/goods'>商品</router-link></li>
		<li><router-link to='/ratings'>评论</router-link></li>
		<li><router-link to='/seller'>商家</router-link></li>
	  </ul>
	</div>
</template>

<script>
export default {
  name: 'header-nav'
};
</script>

<style scoped>
.header-nav .nav {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.header-nav .nav li { 
  flex: 1; 
  height: 100%;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
  color: rgb(77, 85, 93);	
}
.router-link-active {
  color: rgb(240, 20, 20);
}
</style>  
