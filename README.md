# iTmp
简单的前端模板

v 1.0

###

<script type="text/tmpl" id="myTmpl">

..模板放置地方

<div>$text$<div>

<span $onoff$></span> //写在标签内的数据用来控制display的显示/隐藏

<p>$text1 | filter$</p> // $数据|filter名$ 过滤器

</script>

###
/* js中的用法
var tpl = document.getElementById('myTmpl').innerHTML//获取模板内容

var arr = ['is_want', 'is_zhida'] //用来控制显示/隐藏的属性名

var t = new Template()//实例化

var html = t.init(tpl, model, arr)//接收返回的str结果

$('body')[0].innerHTML += html//将拼接好的str写入到特定的容器中
*/

###

TODO
优化控制隐藏让程序自己识别
