export default {
	
	//成功弹窗
	showSuccess:function(){
		uni.showToast({
			title:'成功!',
			duration:1500,
			icon:'none',
			image:'/static/images/success.png'
		})
	},
	
	//失败弹窗
	showError:function(){
		uni.showToast({
			title:'失败!',
			duration:1500,
			icon:'none',
			image:'/static/images/error.png'
		})
	},
	
	//显示加载中
	showLoading:()=>{
		uni.showLoading({
			title:'加载中',
			mask:true
		})
	},
	//隐藏加载中
	hideLoading:()=>{
		uni.hideLoading();
	}
}

