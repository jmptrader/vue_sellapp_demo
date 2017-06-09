<template>
	<div class="cartcontrol">
		<transition name="remove-circle">
			<i class="icon-remove_circle_outline cart_circle" v-if="obj.count>0" @click.stop.prevent="decreaseCount"></i>
		</transition>
		<span class="cart_count" v-if="obj.count>0">{{obj.count}}</span>
		<i class="icon-add_circle cart_circle" @click.stop.prevent="addCount"></i>
	</div>
</template>

<script>
import Vue from 'vue';
export default {
  props: {
    obj: {
      type: Object,
      default () {
        return {
          count: 0
        };
      }
    }
  },
  methods: {
    addCount () {
      if (!this.obj.count) {
        Vue.set(this.obj, 'count', 1);
      } else {
        this.obj.count++;
        console.log(this.obj.count);
      }
    },
    decreaseCount () {
      if (this.obj.count) {
        this.obj.count--;
      }
    }
  }
};
</script>

<style>
@import '../../common/styles/icon-style.css';
.cartcontrol {
	font-size: 0;
	display: inline-block;
}
.cart_circle {
	display: inline-block;
	font-size: 24px;
	line-height: 24px;
	padding: 6px;
	color: #00a0dc;
}
.cart_count {
	display: inline-block;
	width: 12px;
	text-align: center;
	font-size: 10px;
	line-height: 24px;
	padding: 6px 0;
	color: rgb(147, 153, 159);
	vertical-align: top;
}
.remove-circle-enter, .remove-circle-leave-active{
	transform: translateX(36px) rotateZ(360deg);
	opacity: 0;
}
.remove-circle-enter-active, .remove-circle-leave-active {
	transition: all .6s ease;
}
</style>
