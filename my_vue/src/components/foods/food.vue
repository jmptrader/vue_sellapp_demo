<template>
	<div class="food">
		<div class="food_header">
			<div>
				<img :src="src" alt="" class="food_img">
				<div>
					<i class="icon-arrow_lift"></i>
				</div>
			</div>
			<div>
				<h3>{{food.name}}</h3>
				<div>
					<span>月售{{food.sellCount}}份</span>
					<span>好评率{{food.rating}}</span>
				</div>
				<div>
					<span>￥{{food.price}}</span>
					<span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    },
    showFlag: false
  },
  data () {
    return {
    };
  },
  computed: {
    src () {
      return this.food.image;
    }
  },
  methods: {
    show () {
      this.showFlag = true;
      console.log(this.showFlag);
    }
  }
};
</script>

<style>
.food {
	width: 100%;
	height: 100%;
}
.food_img {
	width: 100%;
	height: 375px;
}
</style>
