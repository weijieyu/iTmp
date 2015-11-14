/**
 * Created by weijieyu on 15/11/4
 */
function Template() {//简单模板替换
	this.tpl = document.getElementById('myTmpl').innerHTML
}

Template.prototype.init = function(model) {
	this.model = model
	if (!model.length) {//model为单一json
		return this.render(model)//返回data替换处理结果
	} else {//model为arr放置json
		return this.arrRen()
	}
}

Template.prototype.render = function(model) {//$$内数据替换  
	var reg = new RegExp('\\$([\\w|\||\\s|\-]+)\\$', 'g')
	var This = this
	this.tpl = this.tpl.replace(reg, function() {
		arguments[1] = arguments[1].replace(/\s/g,'')//空格兼容，有利排版

		if (arguments[1].indexOf('v-') == 0) {//是否使用v-控制显示隐藏的指令
			var val = arguments[1].substring(2)//获取出属性
			return This.vShow(model[val])//返回处理后的display值
		}

		var tmpA = arguments[1].split('|')
		if (tmpA.length == 1) {//未使用filter
			return model[arguments[1]]
		} else {//使用filter
			return This.filters[tmpA[1]](model[tmpA[0]])
		}
	})
	return this.tpl
}

Template.prototype.vShow = function(val) { //实现类似v-show功能  //判断条件是Number(val)
	return Number(val) ? '' : 'style="display:none;"'
}

Template.prototype.arrRen = function() {
	var html = ''
	for (var i=0; i<this.model.length; i++) {
		var val = this.model[i]
		html += this.render(val, this.tpl)//输出结果
	}
	return html
}

Template.prototype.filters = {//接收自定义滤镜
	
}

/* html中的用法   

<script type="text/tmpl" id="myTmpl"> //注意这个要写在itmp.js的前边
终于不用千辛万苦的字符串拼接了，放在这里边自带两边的引号

tpl语法
1.$数据$，输出特定str
<h2>$title$</h2>  <img src="$url$">

2.$数据|filter名$  //过滤器
<p>$content | filterN$</p>

3.$v-数据$ ，开始标签内v-后面的属性控制display值
<div $v-onoff$></div>

</script>
*/

/* js中的用法  每次需要动的就是model   //todo 复杂model的处理   //如何更好的完善，全面向实战靠拢
var t = new Template()//实例化

t.filter.test = function () {} //这里添加filter更方便合理

var html = t.init(tpl, model)//接收str结果  //model支持简单json和json放数组中

$('body')[0].innerHTML += html//写入到特定的容器中

*/