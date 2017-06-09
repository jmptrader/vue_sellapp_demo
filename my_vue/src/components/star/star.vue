<template>
  <div class="star">
    <div class="star_light" :style="starLength">
      <img src="../../assets/start_light.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  props: {
    score: {
      type: Number
    }
  },
  data () {
    return {
    };
  },
  computed: {
    starLength () {
      return 'width:' + this.score / 5 * 93 + 'px';
    }
  }
};
</script>

<style scoped>
.star {
  width: 93px;
  height: 16px;
  background-image: url('../../assets/star.png');
}
.star_light {
  width: 93px;
  height: 100%;
  overflow: hidden;
}
.star_light  img{
  width: 93px;
  height: 16px;  
}
</style>
