let BaseUrl;
if( process.env.NODE_ENV==='development'){
	//开发环境
	BaseUrl='http://localhost:10021/';
}else{
	//生成环境
	BaseUrl='/';
}

let req=function(url,method,data,isBase=true){
	if(isBase){
		url=BaseUrl+url
	}
	return new Promise((reslove,reject)=>{
		uni.request({
			url:url,
			method:method,
			data:data,
			success(res) {
				reslove(res)
			},
			fail(res) {
				reject(res);
				uni.showToast({
					title:'出现错误，请联系管理员',
					icon:'none',
					// image:'/static/images/err_tip.png',
					mask:true,
					duration:1500
				})
			}
		})
	})
}
export default req;