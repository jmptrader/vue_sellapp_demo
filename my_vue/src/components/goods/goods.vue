<template>
	<div class="goods">
		<div class="wrapper_menu" ref="menu">
			<ul>
				<li v-for="(item, index) in goods" class="menu_item" :class="{'current': currentIndex===index}" @click="setMenu(index, $event)">
					<span>{{item.name}}</span>
				</li>
			</ul>
		</div>
		<div class="wrapper_content" ref="content">
      <ul>
        <li v-for="item in goods" class="content_list_hook">
            <h3 class="title">{{item.name}}</h3>
            <ul>
              <li v-for="food in item.foods" class="food_item" @click="selectFood(food, $event)">
                <div class="food_icon"><img :src="food.image"></div>
                <div class="food_info">
                  <h4 class="name">{{food.name}}</h4>
                  <p class="desc" v-show="food.description">{{food.description}}</p>
                  <div class="extra">
                    <span v-show="food.sellCount">月销售{{food.sellCount}}份</span>
                    <span v-show="food.rating">好评率{{food.rating}}%</span>
                  </div> 
                  <div class="price">
                    <span class="current_price">￥{{food.price}}</span>
                    <span v-if='food.oldPrice' class="old_price">￥{{food.oldPrice}}</span>
                  </div>
                  <div class='cartcontrol_wrapper'>
                    <cart-control :obj="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>   
        </li>        
      </ul>
		</div>
    <div class="food_wrapper" v-show="showFlag">
      <food :food="selectedFood" ref="food"></food>  
    </div>  
    <shop-cart :shopInfo="shopInfo"></shop-cart>
	</div>
</template>

<script>
import BScroll from 'better-scroll';
import shopCart from '../shopcart/shopcart.vue';
import cartControl from '../cartcontrol/cartcontrol.vue';
import food from '../foods/food.vue';

export default {
  name: 'goods',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      scrollY: 0,
      listHeight: [],
      selectedFood: {},
      showFlag: false
    };
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let minHeight = this.listHeight[i];
        let maxHeight = this.listHeight[i + 1];
        if (!maxHeight || (this.scrollY >= minHeight && this.scrollY < maxHeight)) {
          return i;
        }
      }
      return 0;
    },
    foodList () {
      var foods = [];
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      return foods;
    },
    shopInfo () {
      var shops = {};
      shops.minPrice = this.seller.minPrice;
      shops.deliveryPrice = this.seller.deliveryPrice;
      shops.foodList = this.foodList;
      return shops;
    }
  },
  components: {
    'shop-cart': shopCart,
    'cart-control': cartControl,
    'food': food
  },
  created () {
    this.$http.get('/api/goods').then((reponse) => {
      reponse = reponse.body;
      if (reponse.errno === 0) {
        this.goods = reponse.data;
        this.$nextTick(() => {
          this._initScroll();
          this._getContentListHeight();
        });
      }
    });
  },
  methods: {
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menu, {probeType: 3, click: true});
      this.contentScroll = new BScroll(this.$refs.content, {probeType: 3});
      this.contentScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _getContentListHeight () {
      var list = this.$refs.content.getElementsByClassName('content_list_hook');
      var height = 0;
      this.listHeight.push(height);

      for (var i = 0; i < list.length; i++) {
        let item = list[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    setMenu (index, event) {
      if (!event._constructed) {
        return;
      }

      var setElem = this.$refs.content.getElementsByClassName('content_list_hook');
      this.contentScroll.scrollToElement(setElem[index], 300);
    },
    selectFood (food, event) {
      // if (!event._constructed) {
      //   return;
      // }
      // console.log(this.$refs.food);
      this.selectedFood = food;
      this.showFlag = true;
      // console.log(this.showFlag);
    }
  }
};
</script>

<style scoped>
  .goods {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 48px;
    display: flex;
    display: -webkit-flex;
    flex-flow: row nowrap;
    overflow: hidden;
  }
  .wrapper_menu {
    flex: 0 0 80px;
    width: 80px;
  }
  .menu_item {
    display: table;
    width: 56px;
    height: 56px;
    padding: 0 12px;
    background-color: #f3f5f7;
  }
  .current {
    background-color: #fff;
  }
  .menu_item span {
    display: table-cell;
    height: 55px;
    font-size: 12px;
    line-height: 14px;
    font-weight: 200;
    vertical-align: middle;
    text-align: center;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .current span {
    font-weight: 700;
  }
  .wrapper_content {
    flex-grow: 1;
  }
  .title {
    padding-left: 14px;
    background-color: #f3f5f7;
    font-size: 12px;
    color: rgb(147, 153, 159);
    line-height: 26px;
    border-left: 2px solid #d9dde1;
  }
  .food_item {
    display: -webkit-flex;
    display: flex;
    margin: 18px 18px 0;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  }
  .food_icon {
    flex: 0 0 57px;
    height: 100%;
    display: inline-block;
    vertical-align: top;
  }
  .food_icon img {
    width: 57px;
    height: 57px;
  }  
  .food_info {
    position: relative;
    display: inline-block;
    flex-grow: 1;
    margin-left: 10px;
  }
  .name {
    font-size:  14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    margin-bottom: 8px;
    margin-top: 2px;
  }
  .desc {
    font-size:  10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
    margin-bottom: 8px;  
  }
  .extra {
    font-size:  10px;
    line-height: 10px;
    margin-bottom: 8px;
    color: rgb(147, 153, 159);
  }
  .extra span{
    margin-right: 12px;
  }
  .price {
    font-size: 0;
  }
  .price .current_price{
    font-size: 14px;
    line-height: 14px;
    font-weight: 700;
    color: #f01414;
    margin-right: 8px;
  }
  .price .old_price {
    font-size: 10px;
    line-height: 24px;
    color: rgb(147, 153, 159);
    text-decoration: line-through;     
  }
  .cartcontrol_wrapper {
    position: absolute;
    right: 12px;
    bottom: -6px;
  }
  .food_wrapper {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 48px;
    background-color: #fff;
    z-index: 30;
  }
</style>
