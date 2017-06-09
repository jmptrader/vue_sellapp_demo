<template>
  <div class="ratingselect">
    <ul class="ratingselect_items">      
      <li v-for="(item, index) in desc" class="item" :class="{'active': selectType===index}" @click="select(index, $event)">
        {{item}}<span>{{index}}</span>
      </li>
    </ul>
    <div class="only_wrapper" @click="toggleContent">
      <i class="icon-check_circle" :class="{'on': onlyContent}"></i>
      <span class="only_desc">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    ratings: {
      type: Array,
      default () {
        return [];
      }
    },
    desc: {
      type: Array,
      default () {
        return ['全部', '满意', '不满意'];
      }
    },
    onlyContent: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectType: 0
    };
  },
  computed: {
  },
  methods: {
    toggleContent (event) {
      console.log(this.onlyContent);
      this.$emit('content_toggle', this.onlyContent);
    },
    select (index, ev) {
      this.selectType = index;
      this.$emit('content_select', index);
    }
  }
};
</script>

<style scoped>
.ratingselect_items {
  padding: 18px 0 18px 0;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
}
.item {
  display: inline-block;
  padding: 8px 12px;
  margin-right: 8px;
  font-size: 12px;
  line-height: 16px;
  background-color: rgba(77, 85, 93, 0.2);
  border-radius: 1px;
  color: rgb(77, 85, 93);
}
.item span {
    font-size: 8px;
    line-height: 16px;
    margin-left: 6px;
}
.active {
  background-color: rgb(0, 166, 220);
  color: #fff;
}
.icon-check_circle {
  font-size: 24px;
}
.only_wrapper {
  padding: 12px 0;
}
.on {
  color: #00c850;
}
.only_desc {
  font-size: 12px;
  line-height: 24px;
  color: rgb(147, 153, 159);
  vertical-align: top;
}
</style>
