<template>
	<view class="con">
		<view class="bar-con">
			<view class="back">
				<image @click="back" src="/static/images/back.png" ></image>
			</view>
			<view class="search">
				<input type="text" value=""  placeholder="请输入" />
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			back(){
				let data={
					city:this.cityName
				}
				let pages=getCurrentPages();
				console.log(pages);
				let prePage=pages[pages.length-2];//获取上一个页面
				prePage.$vm.getCity(data);//将数据传递给上一个页面
				uni.navigateBack();
			}
		},
		props:{
			cityName:{
				type:String,
				default:'天津'
			}
		}
	}
</script>

<style lang="less" scoped>
	.con{
		background-color: #C8C7CC;
		margin-bottom: 20rpx;
	}
	.bar-con{
		display: flex;
		height: 100rpx;
		align-items: center;
		/* #ifdef MP-WEIXIN */
		margin-top: 100rpx;
		/* #endif */	
		.back{
			width:20%;	
			text-align: center;
			image{
				width: 48rpx;
				height: 48rpx;
				background-color: #C8C7CC;
			}
		}
		.search{
			flex: 1;
			input{
				width: 500rpx;
				height: 60rpx;
				border: 1px solid #C0C0C0;
				border-radius: 30rpx;
				background-color: #FFFFFF;
			}
		}
	}
</style>
