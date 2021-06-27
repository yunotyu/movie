<template>
	<view class="">
		<navbar :cityName="value"></navbar>
		<ss-select-city
		  v-model="value"
		  :hot-citys="hotCitys"
		  @on-select="curCitySelect"
		/>
	</view>
</template>

<script>
	import ssSelectCity from '@/components/ss-select-city/index.vue'
	import navbar from '../../../components/navBar/navBar.vue'
	export default{
		onLoad(data) {
			this.value=data.name;
		},
		components:{
			ssSelectCity,
			navbar,
		},
		data(){
			return{
				hotCitys: [
				        '杭州',
				        '天津',
				        '北京',
				        '上海',
				        '深圳',
				        '广州',
				        '成都',
				        '重庆',
				        '厦门'
				      ],
				value:'北京',//显示的城市名		
			}
		},
		methods:{
			curCitySelect(city){
				this.value=city
			}
		}
	}
</script>

<style>
</style>
