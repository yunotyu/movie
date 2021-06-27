<template>
	<view class="score">
			<image v-for="(val,key,index) in starNum" src="../../static/images/star.png"></image>
			<image v-for="(val,key,index) in 5-starNum" src="../../static/images/unstar.png"></image>
			<text>{{score}}</text>
	</view>
</template>

<script>
	export default {
		name:"score",
		data() {
			return {
				
			};
		},
		props:{
			starNum:{
				type:Number,
				default:0
			},
			score:{
				type:String,
				default:''
			}
		}
	}
</script>

<style lang="less" scoped>
	.score{
		margin-top: 2rpx;
		image{
			width: 24rpx;
			height: 24rpx;
		}
		text{
			margin-left: 10rpx;
		}	
	}
</style>
