<template>
  <div class="ratings">
    <div>
      <div class="overview_left">
        <h3 class="score">
          {{seller.score}}
        </h3>
        <div class="title">
          综合评分
        </div>
        <div class="rank">
          高于周边商家{{seller.rankRate}}%
        </div>
      </div>
      <div class="overview_right">
        <div class="score_wrapper">
          <span class="score_title">服务态度</span>
          <div class="score_star">
            <star :score="seller.serviceScore"></star>
          </div>
          <span class="score_number">{{seller.serviceScore}}</span>
        </div>
        <div class="score_wrapper">
          <span class="score_title">商品评分</span>
          <div class="score_star">
            <star :score="seller.foodScore"></star>
          </div>          
          <span class="score_number">{{seller.foodScore}}</span>
        </div>
        <div class="delivery_time">
          送达时间
          <span class="time_number">{{seller.deliveryTime}}分钟</span>
        </div>        
      </div>
    </div>
    <div class="split"> 
    </div>
    <div class="rating_select_wrapper">
      <rating-select :onlyContent="onlyContent" @content_toggle="toggleContent" @content_select="select"></rating-select>      
    </div>
   <div class="ratings_content">
     <ul>
       <li v-for="item in ratings" class="content_item">
         <div class="avatar_wrapper">
           <img :src="item.avatar" alt="" class="avatar">
         </div>
         <div class="content_date">
           {{formatTime(item.rateTime)}}
         </div>
         <div class="content">
           <h3 class="content_username">{{item.username}}</h3>
           <div class="content_star_wrapper">
             <star :score="item.score" class="content_star"></star>
             <span>{{item.score}}星</span>
             <span v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
           </div>
           <p class="content_text">{{item.text}}</p>
           <div v-show="item.recommend.length">
             <i class="icon-thumb_up"></i>
             <ul class="recommend_wrapper">
               <li v-for="recommend in item.recommend" class="recommend_item">{{recommend}}</li>
             </ul>
           </div>
         </div>
       </li>
     </ul>
   </div>
  </div>
</template>

<script>
import star from '../star/star.vue';
import ratingSelect from '../ratingselect/ratingselect.vue';
import {formatDate} from '../../common/js/date.js';

export default {
  name: 'ratings',
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      ratings: {
        type: Object
      },
      onlyContent: true,
      selectType: 0
    };
  },
  created () {
    this.$http.get('/api/ratings').then((response) => {
      response = response.body;

      if (response.errno === 0) {
        this.ratings = response.data;
      }

      // console.log(this.ratings);
    });
  },
  components: {
    'star': star,
    'rating-select': ratingSelect
  },
  methods: {
    toggleContent (onlyContent) {
      this.onlyContent = !onlyContent;
      console.log('this.onlyContent');
    },
    select (index) {
      console.log(index);
      this.selectType = index;
    },
    formatTime (time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    },
    needShow (rateType, text) {
      if (this.onlyContent && !text) {
        return false;
      }

      if (this.selectType === 0) {
        return true;
      } else {
        return (this.selectType - 1) === rateType;
      }
    }
  }
};
</script>

<style scoped>
@import '../../common/styles/icon-style.css';
.ratings {
  height: 100%;
  overflow: auto;
}
.overview_left {
  float: left;
  width: 137px;
  padding: 18px 0;
  text-align: center;
}
.score {
  width: 100%;
  line-height: 28px; 
  font-size: 24px;
  color: rgb(255, 153, 0); 
  margin-bottom: 6px;
}
.title {
  line-height: 12px; 
  font-size: 12px;
  color: rgb(7, 17, 27);
  margin-bottom: 8px;
}
.rank {
  line-height: 10px; 
  font-size: 10px;
  color: rgb(7, 17, 27);
  margin-bottom: 6px;  
}
.overview_right {
  margin-left: 137px;
  padding: 18px 0 18px 24px;
  color: rgb(7, 17, 27);
  font-size: 12px;
}
.score_wrapper {
  margin-bottom: 8px;
}
.score_title {
  line-height: 18px;
  font-size: 12px;
  margin-right: 12px;
}
.score_star {
  display: inline-block;
  margin-right: 12px;
  vertical-align: top;
}
.score_number {
  line-height: 18px;
  font-size: 12px;
  margin-right: 12px;
  color: rgb(255, 153, 0);  
}
.delivery_time {
  line-height: 18px;
  font-size: 12px; 
}
.time_number {
  line-height: 18px;
  margin-left: 12px;
  color: rgb(147, 153, 159)
}
.split {
  width: 100%;
  height: 16px;
  background-color: #f3f5f7;
}
.rating_select_wrapper {
  padding: 0 18px;
}
.ratings_content {
  padding: 0 18px;
  font-size: 12px;
  color: rgb(7, 17, 27);
  border-top: 1px solid rgba(7, 17, 27, 0.1);
}
.content_item {
  padding: 18px 0;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.avatar_wrapper {
  float: left;
  width: 28px;
  height: 28px;
}
.content_date {
  float: right;
  font-size: 10px;
  line-height: 12px;
  font-weight: 200;
  color: rgb(147, 153, 159);
}
.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.content {
  margin-left: 28px;
  padding-left: 12px;
}
.content_username {
  font-size: 10px;
  line-height: 12px;
  margin-bottom: 4px;
}
.content_star_wrapper {
  margin-bottom: 6px;
}
.content_star {
  display: inline-block;
  vertical-align: bottom;
}
.content_text {
  margin-bottom: 8px;
}
.recommend_wrapper {
  display: inline-block;
  margin-left: 8px;
}
.icon-thumb_up {
  color: rgb(0, 160, 220);
}
.recommend_item {
  height: 18px;
  display: inline-block;
  font-size: 9px;
  line-height: 18px;
  padding: 0 6px;
  margin-right: 8px;
  border: 1px solid rgba(7, 17, 27, 0.1);
}
</style>
