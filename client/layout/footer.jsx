import '../assets/styles/footer.styl'

export default {
	data() {
		return {
			author: 'wkiwi',
			blog: 'https://blog.csdn.net/Wkiwi_'
		}
	},
	render() {
		return (
			<div id="footer">
				<span>Power by {this.author}，欢迎访问作者博客：{this.blog}</span>
			</div>
		)
	}
}