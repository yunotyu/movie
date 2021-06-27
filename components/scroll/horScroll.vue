//水平滚动组件
<template>
	<view>
		<scroll-view scroll-with-animation="true"  show-scrollbar="true" @scroll="scroll" scroll-x="true"  class="h-scrollView">
			<!-- 注意要在外面再包一层view，然后把display设置为inline-block,这样才能水平滚动 -->
			<view class="single-item" v-for="val in movieData">
				<view class="movie-con">
					<image class="img" :src="val.priviewImgPath" ></image>
					<view class="title">
						<text>{{val.name}}</text>
					</view>
				<!-- 评分组件-->
				<score :starNum='val.star' :score='val.score'/>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import score from '../score/score.vue'
	
	export default {
		components:{
			score
		},
		name:"scroll",
		data() {
			return {
			
			};
		},
		props:{
			//预览图片列表
			movieData:{
				type:Array,
				default:[]
			}
		},
		methods:{
			scroll(){
				
			}
		}
	}
</script>

<style lang="less" scoped>
.h-scrollView{
	//宽度设置为100%,可以容纳无数个
	width: 100%;
	// 设置不换行
	white-space: nowrap;
}
.single-item{
	display: inline-block;
	height: 100%;
}
.movie-con{
		display: flex;
		flex-direction: column;
		justify-content: center;
		overflow: hidden;
		padding: 3px;
		width: 190rpx;
		.img{
			width: 100%;
			height: 241rpx;
		}
	}
.title{
	overflow:hidden;
	text-overflow:ellipsis;
	white-space:nowrap;
	text-align: center;
	font-size: 14px;
	font-weight: 700;
	margin-top: 8rpx;
}	
</style>
