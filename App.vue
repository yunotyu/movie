<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			console.log('uview版本'+ uni.$u.config.v);
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
		@import "uview-ui/index.scss";
	/*每个页面公共css */
	.page{
		width: 100%;
		height: 100%;
		background-color: #f7f7f7;
		// position: absolute;
	}
</style>
