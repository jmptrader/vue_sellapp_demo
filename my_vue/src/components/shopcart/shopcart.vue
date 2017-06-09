<template>
	<div class="shopcart">
		<div class="shopcart_content" @click="showList">
			<div class="shopcart_left">
				<div class="logo_wrapper">
					<div class="logo"  :class="{'logo_highlight':totalCount>0}">
						<i class="icon-shopping_cart cart"></i>
					</div>	
				</div>
				<span class="num" v-show="totalCount>0">{{totalCount}}</span>
				<span class="total_price">￥{{totalPrice}}</span>
				<span class="info_desc">另需配送费￥{{shopInfo.deliveryPrice}}</span>	
			</div>
			<div class="shopcart_right">
				<span class="min_pay" :class="payClass" @click.stop.prevent="accountsPay">{{payDesc}}</span>
			</div>			
		</div>
		<div class="shopcart_list" v-show="isShow&&shopInfo.foodList.length>0">
			<div class="list_head">
				<h3 class="list_title">购物车</h3>
				<span class="list_clear" @click="clearEvent">清空</span>
			</div>
			<ul class="list_content" v-show="shopInfo.foodList.length>0">
				<li v-for="item in shopInfo.foodList" class="list_item">
					<span class="list_item_left">{{item.name}}</span>
					<div class="list_item_right">
						<span class="list_item_price">￥{{item.price*item.count}}</span>
						<cart-control :obj="item" class="cart_control"></cart-control>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import cartControl from '../cartcontrol/cartcontrol.vue';
export default {
  props: {
    shopInfo: {
      type: Object
    }
  },
  data () {
    return {
      price: 10,
      count: 10,
      isShow: false
    };
  },
  components: {
    'cart-control': cartControl
  },
  computed: {
    totalPrice () {
      var totalPrice = 0;
      if (this.shopInfo.foodList.length) {
        for (var i = 0; i < this.shopInfo.foodList.length; i++) {
          totalPrice += this.shopInfo.foodList[i].count * this.shopInfo.foodList[i].price;
        }
      }
      return totalPrice;
    },
    totalCount () {
      var totalCount = 0;
      if (this.shopInfo.foodList.length) {
        for (var i = 0; i < this.shopInfo.foodList.length; i++) {
          totalCount += this.shopInfo.foodList[i].count;
        }
      }
      return totalCount;
    },
    payDesc () {
      var minPay = this.shopInfo.minPrice;
      if (this.totalPrice === 0) {
        return (`￥${minPay}起配送`);
      } else if (this.totalPrice >= minPay) {
        return (`去结算`);
      } else {
        return `还差￥${minPay - this.totalPrice}配送`;
      }
    },
    payClass () {
      if (this.totalPrice >= this.shopInfo.minPrice) {
        return 'enough';
      } else {
        return '';
      }
    }
  },
  methods: {
    clearEvent () {
      this.shopInfo.foodList.forEach((food) => {
        food.count = 0;
      });
      this.shopInfo.foodList.splice(0);
      this.isShow = false;
      console.log('clear');
    },
    showList () {
      if (this.shopInfo.foodList.length) {
        this.isShow = !this.isShow;
        console.log(this.isShow);
      }
    },
    accountsPay () {
      if (this.totalPrice >= this.shopInfo.minPrice) {
        alert('$' + this.totalPrice);
      }
    }
  }
};

</script>

<style scoped>
@import '../../common/styles/icon-style.css';
.shopcart {
	position: fixed;
	width: 100%;
	height: 48px;
	left: 0;
	bottom: 0;
	z-index: 50;
	background-color: #141d27;
}
.shopcart_content {
	height: 100%;
	width: 100%;
	display: flex;
	display: -webkit-flex;
}	
.shopcart_left {
	position: relative;
	height: 100%;
	flex: 1;
}
.logo_wrapper {
	display: inline-block;
	box-sizing: border-box;
	position: relative;
	top: -10px;
	margin-left: 12px;
	width: 56px;
	height: 56px;
	padding: 6px;
	background-color: #141d27;
	border-radius: 50%;

}
.logo {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #2b343c;	
	text-align: center;
}
.logo_highlight {
	background-color: #00a0dc;
}
.logo_highlight i {
	color: #fff;
}
.cart {
	font-size: 24px;
	line-height: 44px;
	color: rgba(255, 255, 255, 0.4);
}
.total_price {
	display: inline-block;
	vertical-align: top;
	margin: 12px 0 12px 12px;
	font-size: 16px;
	line-height: 24px;
	font-weight: 700;
	padding-right: 12px;
	color: rgba(255, 255, 255, 0.4);
}
.num {
	position: absolute;
	left: 44px;
	top: -8px;
	display: inline-block;
	width: 24px;
	text-align: center;
	border-radius: 8px;
	font-size: 9px;
	font-weight: 700;
	line-height: 16px;
	color: #fff;
	background-color: red;
}
.info_desc {
	display: inline-block;
	line-height: 24px;
	font-size: 12px;
	color: rgba(255, 255, 255, 0.4);
	padding: 0 12px;
	margin: 12px 0;
	vertical-align: top;
	border-left: 1px solid rgba(255, 255, 255, 0.1);
}
.shopcart_right {
	width: 105px;
	height: 100%;
	flex: 0 0 105px;
	background-color: rgba(255, 255, 255, 0.1);
}
.min_pay {
	display:inline-block;
	width: 100%;
	line-height: 24px;
	text-align: center;
	font-size: 12px;
	font-weight: 700;
	color: rgba(255, 255, 255, 0.4);
	padding: 12px 0;
}
.enough {
	background-color: #00b43c;
	color: #fff;
}
.shopcart_list {
	z-index: -1;
	position: absolute;
	bottom: 48px;
	width: 100%;
}
.list_head {
	height: 40px;
	background: #f3f5f7;
	padding: 0 18px;
	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.list_title {
	float: left;
	font-size: 14px;
	font-weight: 200;
	color: rgb(7, 17, 27);
	line-height: 40px;
}
.list_clear {
	float: right;
	font-size: 12px;
	line-height: 40px;
	color: rgb(0, 160, 220);
}
.list_content {
	width: 100%;
	max-height: 200px;
	overflow: hidden;
	background-color: #fff;
}
.list_item {
	height: 48px;
	margin: 0 18px;
	border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.list_item_left {
	float: left;
	height: 24px;
	line-height: 24px;
	padding: 12px 0;
	font-size: 14px;
	color: rgb(7, 17, 27);
}
.list_item_price {
	display: inline-block;
	line-height: 48px;
	font-size: 14px;
	font-weight: 700;
	color: rgb(240, 20, 20);
	vertical-align: top;
}
.cart_control {
	margin: 6px 0;
}
.list_item_right {
	float: right;
	height: 48px;
}
</style>
