<!-- 视频水平滚动组件 -->
<template>
	<view class="vedio-con">
		<video v-if="val.vedioPath" :enable-play-gesture="true" v-for="(val,index,key) in vedioArr" :key="index+key" class="item"  :poster="val.swiperImgPath" object-fit="fill" :src="val.vedioPath" controls></video>
	</view>
</template>

<script>
	export default{
		props:{
			vedioArr:{
				type:Array,
				default:[]
			}
		}
	}
</script>

<style lang="less" scoped>
	.vedio-con{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.item{
		height: 250rpx;
		width: 48%;
		margin: 10rpx 8rpx 10rpx 5rpx;
	}
</style>
