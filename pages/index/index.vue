<template>
	<view>
		<view class="page" v-if="movieData.length>0&&likeData.length>0">
			<!-- 轮播图 -->
			<view class="swiper">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
					:duration="duration">
					<swiper-item v-for="(val,key,index) in movieData">
						<!-- 图片还没加载完成的占位符,利用下面的set函数修改状态，从而隐藏站位图片 -->
						<u-image v-show="!val.loaded" mode="widthFix" style="height: 200rpx;" class="swiperImg"
							src="../../static/images/wait.jpg"></u-image>
		
						<u-image v-show="val.loaded" :lazy-load="false" @load="imgLoaded(val)" class="swiperImg"
							mode="widthFix" :src="val.swiperImgPath">
							<!-- 图片加载完成显示的图片 -->
							<!-- <u-loading slot="loading"></u-loading> -->
							<!-- <view slot="error" style="font-size: 60rpx;height: 100%;width: 100%;text-align: center;margin-top: 50%;">加载失败!</view>						 -->
						</u-image>
		
					</swiper-item>
				</swiper>
			</view>
			<!-- 热门电影 -->
			<view class="hot">
		
				<view class="hot-hd">
					<image src="../../static/images/hot.png"></image>
					<text>热门影片</text>
				</view>
				<!-- //热门电影模块 -->
				<view class="hot-bd">
					<h-scroll-view :movieData="movieData"></h-scroll-view>
				</view>
				<!-- 预告模块 -->
				<view>
					<yugao></yugao>
					<hor-scr-con>
						<vedio-scr-item :vedioArr="movieData"></vedio-scr-item>
					</hor-scr-con>
				</view>
				<!-- 猜你喜欢	 -->
				<view>
					<love :data=likeData></love>
				</view>
			</view>
		</view>
		<!-- 加载显示 -->
		<bgc v-else></bgc>
	</view>
</template>

<script>
	import hScrollView from '../../components/scroll/horScroll.vue'
	import yugao from '../../components/yugao/yugao.vue'
	import love from '../../components/love/love.vue'
	import horScrCon from '../../components/scroll/hScrollCon.vue'
	import vedioScrItem from '../../components/scroll/components/videoHScrItem.vue'
	import bgc from '../../components/loadingBG/index.vue'

	export default {
		components: {
			hScrollView,
			yugao,
			horScrCon,
			vedioScrItem,
			love,
			bgc
		},
		data() {
			return {
				movieData: [],
				likeData: [],
				duration: 1000,
				indicatorDots: true,
				interval: 2000,
				autoplay: true,
			}
		},
		//注意使用onShow在会在每次tabbar切换页面时执行，
		//onLoad在tabbar切换页面时不执行
		onLoad() {
			this.getMoviesAndLikes();
		},
		methods: {
			async getMoviesAndLikes() {
				uni.showLoading({
					title: '加载中'
				})
				let [res1, res2] = await Promise.all([this.$req('home/GetMoveis'), this.$req('home/GetLikes')])
				if (res1.data) {
					this.movieData = res1.data;
				}
				if (res2.data) {
					this.likeData = res2.data;
				}
				console.log(res1);
				console.log(res2);
				uni.hideLoading();
			},
			//图片加载完成
			imgLoaded(item) {
				this.$set(item, 'loaded', true);
			}
		},
		//下拉刷新重新请求猜你喜欢部分数据 
		onPullDownRefresh() {
			this.$req('home/GetLikes').then(res => {
				if (res.data) {
					this.likeData = res.data
				}
			}).catch(err => {
				console.log(err);
			}).finally(() => {
				//停止刷新动画
				uni.stopPullDownRefresh()
			})
		},
	}
</script>

<style lang="less">
	.swiper {
		height: 500rpx;
	}

	.swiperImg {
		width: 100%;
	}

	.hot {
		margin-top: 20rpx;

		.hot-hd {
			image {
				height: 48rpx;
				width: 48rpx;
				vertical-align: bottom;
			}

			text {
				font-size: 18px;
				font-weight: 800;
			}
		}
	}

	.hot-bd {
		height: 350rpx;
	}
</style>
