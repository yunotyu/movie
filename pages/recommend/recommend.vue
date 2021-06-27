<template>
	<view>
		<view  class="">
			<view @click="selectCity" class="pos">
				<image style="width: 48rpx;height: 48rpx;" src="/static/images/pos.png"></image>
				<text class="city">{{city}}</text>
			</view>
		</view>
		<!-- //瀑布流 -->
		<view class="water-flow">
			<u-waterfall v-model="flowList" ref="uWaterfall">
						<template v-slot:left="{leftList}">
							<view class="left" v-for="(item, index) in leftList" :key="index">
								<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
								<u-lazy-load threshold="-450" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
								<view class="title">
									{{item.title}}
								</view>
								<view class="price">
									{{'￥'+item.price}}元
								</view>
							</view>
						</template>
						<template v-slot:right="{rightList}">
							<view class="right" v-for="(item, index) in rightList" :key="index">
								<u-lazy-load threshold="-450" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
								<view class="title">
									{{item.title}}
								</view>
								<view class="price">
									{{'￥'+item.price}}元
								</view>
							</view>
						</template>
					</u-waterfall>
					<!-- 加载更多 -->
					<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
		</view>
	</view>
</template>

<script>
	//引入高德地图微信小程序和app端的定位js
	import amap from '../../common/amap-wx.js'; 
	export default {
		data() {
			return {
				loc:'',
				amapPlugin: null,  
				//这里填写高德开放平台上申请的key
				wxKey: '2a3b00708ee6c2cdd01e9c53c605b1a9' ,
				appKey:'',
				city:'深圳',
				geocoder:{},
				flowList:[],
				loadStatus:'loadmore'
			}
		},
		methods: {
			//选择城市
			selectCity(){
				uni.navigateTo({
					url:`./components/selectCity?name=${this.city}`
				})
			},
			//获取从选择城市页面返回的值
			getCity(data){
				this.city=data.city;
			},
		},
		onLoad() {
			let that=this;
			//下面高德地图api加载完的回调函数,注意这个函数必须放在window对象上
			//在下面的url的最后callback=mapLoaded
			// H5端使用高德地图
			// #ifdef H5 
			 window.mapLoaded  = function(){
				 //将经纬度转换为城市名
				 // H5端使用高德地图
				 // #ifdef H5 
				 window.AMap.plugin('AMap.Geocoder', function() {
				 	that.geocoder = new AMap.Geocoder({})
				 })
				 // #endif
			 }
			//异步加载高德地图的js API文件
			var url = 'https://webapi.amap.com/maps?v=1.4.15&key=c1fd14c32ec8721e6e878569117c4072&callback=mapLoaded';
			var jsapi = document.createElement('script');
			jsapi.charset = 'utf-8';
			jsapi.src = url;
			document.head.appendChild(jsapi);
			// #endif
			
			//微信小程序和app端使用高德地图
			//#ifdef MP-WEIXIN||APP-PLUS
			 this.amapPlugin = new amap.AMapWX({  
			            key: this.wxKey  
			        }); 
			//#endif
			
			//获取位置经纬度
			uni.getLocation({
				type:'gcj02',
				success: (location) => {
					this.loc=location.longitude.toFixed(6)+','+location.latitude.toFixed(6);
					
					let that=this;
					
					//将经纬度转换为城市名
					// H5端使用高德地图
					// #ifdef H5 
					that.geocoder.getAddress(that.loc, (status, result) =>{
					    if (status === 'complete' && result.info === 'OK') {
					        // result为对应的地理位置详细信息
							console.log(result);
							that.city=result.regeocode.addressComponent.city;
							if(that.city.indexOf('市')){
								that.city=that.city.split('市')[0];
							}
					    }
					  })
					// #endif
					
					//微信小程序和APP
					//#ifdef MP-WEIXIN||APP-PLUS
					 this.amapPlugin.getRegeo({  
					                success: (data) => {  
					                    console.log(data)  
										that.city=data[0].regeocodeData.addressComponent.city;
										if(that.city.indexOf('市')){
											that.city=that.city.split('市')[0];
										}
					                },
									fail:(info)=>{
										console.log(info);
									}
					            });  
					// #endif
				},
				fail:()=> {
					console.log('fail');
				},
				complete:()=>{
					console.log('完成');
				}
			})
			
			this.utils.showLoading();
			this.$req('home/GetRecommends','get').then(res=>{
				console.log(res);
				this.flowList=res.data;
			}).catch(err=>{
				console.log(err);
				this.utils.hideLoading();
			}).finally(()=>{
				this.utils.hideLoading();
			})
			
			
		},
		//滚动到底部，重新请求数据
		onReachBottom(){
			this.loadStatus='loading';//显示加载更多数据
			this.$req('home/GetRecommends','get').then(res=>{
				if(this.flowList.length>30){
					this.loadStatus='nomore';//获取到数据为0时，显示没有更多数据
					return
				}
				console.log(res);
				this.flowList=this.flowList.concat(res.data)
				this.loadStatus='loadmore';//显示加载更多
			}).catch(err=>{
				console.log(err);
			}).finally(()=>{
			})
		}
		
	}
</script>

<style scoped>
.pos{
	display: flex;
	width: 25%;
	align-items: center;
	margin-top: 20rpx;
	padding-left: 20rpx;
}
.water-flow{
	margin-top: 60rpx;
}
.left{
	padding: 10rpx;
}
.right{
	padding: 10rpx;
}

</style>
