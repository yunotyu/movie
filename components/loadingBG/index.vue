<!-- 骨架屏 -->
<template>
	<view>
		<view class="header"></view>
		<view class="content-swiper">
			<view v-for="item in 4">
			</view>
		</view>
		<view class="content-viedos">
			<view v-for="item in 4">
			</view>
		</view>
		<view class="scroll">
			<view class="scroll-item">
				<view class="left"></view>
				<view class="right"></view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.header{
		height: 500rpx;
		width: 100%;
		background-color: #C0C0C0;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}
	.content-swiper{
		height: 200rpx;
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin-bottom: 40rpx;
		view{
			width:23%;
			height: 100%;
			background-color: #C0C0C0;
		};
	}
	.content-viedos{
		height: 400rpx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		margin-bottom: 30rpx;
		view{
			height: 190rpx;
			width: 45%;
			background-color: #C0C0C0;
		}
	}
	.scroll{
		.scroll-item{
			display: flex;
			height: 300rpx;
			justify-content: space-around;
			.left{
				height: 100%;
				width: 30%;
				background-color: #C0C0C0;
			}
			.right{
				height: 100%;
				width: 60%;
				background-color: #C0C0C0;
			}
		}
	}
</style>
