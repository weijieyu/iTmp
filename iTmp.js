function Template() {//简单模板替换

}
Template.prototype.init = function(tpl,model,arr) {
	this.tpl = tpl
	this.arr = arr
	this.model = model
	if (!model.length) {//model为单一json
		this.batchVs(arr, this.model)//批量处理布尔类型data
		return this.render(model, tpl)//返回data替换处理结果
	} else {//model为arr放置json
		return this.arrRen()
	}
}
Template.prototype.render = function(model, tpl) {//$$内数据替换  
	var reg = new RegExp('\\$([\\w|\||\\s]+)\\$', 'g')
	var This = this
	tpl = tpl.replace(reg, function() {
		arguments[1] = arguments[1].replace(/\s/g,'')//空格兼容，有利排版
		var tmpA = arguments[1].split('|')
		if (tmpA.length == 1) {//未使用filter
			return model[arguments[1]]
		} else {//使用filter
			return This.filters[tmpA[1]](model[tmpA[0]])
		}
		
	})
	return tpl
}

Template.prototype.vShow = function(val) { //实现类似v-show功能  //判断条件是Number(val)
	return Number(val) ? '' : 'style="display:none;"'
}

Template.prototype.batchVs = function(model) {//批量处理需要vShow转换的数据
	for (var i=0; i<this.arr.length; i++) {
		var val = this.arr[i]
		model[val] = this.vShow(model[val])
	}
}

Template.prototype.arrRen = function() {
	var html = ''
	for (var i=0; i<this.model.length; i++) {
		var val = this.model[i]
		this.batchVs(val) //数据转换
		html += this.render(val, this.tpl)//输出结果
	}
	return html
}

Template.prototype.filters = {//滤镜功能填写
	test: function (value) {
		return value+'haha'
	}
}

/* html中的用法   tpl语法
$数据$ ，控制显示与否的属性写在开始标签内
$数据|filter名$  //过滤器
<script type="text/tmpl" id="myTmpl">
终于不用千辛万苦的字符串拼接了，放在这里边自带两边的引号
</script>
*/

/* js中的用法
var tpl = document.getElementById('myTmpl').innerHTML
var arr = ['is_want', 'is_zhida'] //控制显示隐藏的属性名
var t = new Template()//实例化
var html = t.init(tpl, model, arr)//接收str结果
$('body')[0].innerHTML += html//写入到特定的容器中
*/