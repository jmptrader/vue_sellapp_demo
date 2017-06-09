<template>
	<div class="header-top">
		<div class="top">
			<img class="img_ban" :src="seller.avatar" alt="no">
			<div>
				
			</div>
		</div>
		<div class="bottom">
			<span class="notice_title">公告</span>
			<span class="notice_content">{{seller.bulletin}}</span>
			<i class="notice_more">ok</i>			
		</div>
	</div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style scoped>
.header-top {
	background-color: rgba(7, 17, 27, 0.5);
}
.img_ban {
	width: 64px;
	height: 64px;
	margin: 24px 0 18px 24px;
	border-radius: 2px; 
}
.top {

}
.bottom {
	position: relative;
	height: 28px;
	font-size: 10px;
	padding: 0 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	background-color: rgba(7, 17, 27, 0.2);
}
.notice_title {
	display: inline-block;
	height: 14px;
	line-height: 14px;
	background-color: #fff;
	margin: 7px 0;
}
.notice_content {
	position: relative;
	overflow: hidden;
	white-space: nowrap;
	color: #fff;
	font-weight: 100;
	line-height: 28px;
	text-overflow: ellipsis;
}
.notice_more {
	position: absolute;
	right: 12px;
	top: 8px;
}
</style>
