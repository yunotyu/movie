<!-- 热门预告模块 -->
<template>
	<view class="love">
		<view class="title">
			<image src="../../static/images/love.png"></image>
			<text>猜你喜欢</text>
		</view>
		<!-- 电影部分 -->
		<view class="content-hd">
			<view class="content-bd" v-for="(item,index) in data" :key="index">
				<view class="box">
					<u-image width="190rpx" height="241rpx" :src="item.mainImg" ></u-image>
					<view class="info">
						<text class="info-title">{{item.name}}</text>
						<text>{{item.zhuyan}}</text>
						<text>{{item.shoTime.split('T')[0]+'上映'}}</text>
					</view>
					<view class="like" @click="showAnimation(index)" >
						<u-image  src="/static/images/like.png" height="48rpx" width="48rpx"></u-image>
						<!-- 动画元素原生的位置 -->
						<view :animation="animationDataArr[index]" class="ani">
							+1
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			data:{
				type:Array,
				default:[]
			},
		},
		data(){
			return{
				//动画数据
				animationData:{},
				animationDataArr:[{},{},{},{}]
			}
		},
		onLoad() {
		},
		onUnload() {
			//页面卸载清除动画
			// animation={}
		},
		methods:{
			//点赞动画效果
			showAnimation(index){
				let animation=uni.createAnimation();
				//先往y轴上移动，再将透明度变为1,动画为1s
				animation.translateY(-60).opacity(1).step({duration:500})
				//导出动画，让对应组件执行	
				this.$set(this.animationDataArr,index,animation.export())
				
				//还原动画
				setTimeout(function() {
					animation.opacity(0).translateY(0).step({duration:0})
					this.$set(this.animationDataArr,index,animation.export())
				}.bind(this), 700);
			}
		}
	}
</script>

<style lang="less" scoped>
	.love{
		margin-top: 10rpx;
		.title{
			image{
				height: 48rpx;
				width: 48rpx;
				vertical-align: middle;
			}
			text{
				font-size: 16px;
				font-weight: 700;
				
			}
		}
		.content-hd{
			display: flex;
			flex-direction: column;
			padding-left: 20rpx;
			.content-bd{
				margin-top: 20rpx;
				margin-bottom: 20rpx;
				.box{
					display: flex;
					.info{
						flex: 1;
						display: flex;
						flex-direction: column;
						margin-left: 20rpx;
						.info-title{
							font-size: 16px;
							font-weight: 600;
						}
					}
					.like{
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						border-left: 6rpx dashed #dbdbda;
						.ani{
							opacity: 0;
							color: orange;
							font-size: 16px;
						}
					}
				}
			}
		}
	}
</style>
