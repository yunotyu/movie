<!-- 水平滚动条容器 -->
<template>
	<view class="">
		<scroll-view scroll-with-animation="true"  show-scrollbar="true" @scroll="scroll" scroll-x="true"  class="h-scrollView">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		methods:{
			scroll(){
				
			}
		},
		components:{
			
		},
	}
</script>

<style lang="less" scoped>
	.h-scrollView{
		//宽度设置为100%,可以容纳无数个
		width: 100%;
		// 设置不换行
		white-space: nowrap;
	}
</style>
