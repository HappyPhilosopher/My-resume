;(function() {
	$(document).ready(function() {
		// 设置字符串
		var introduce = '\n\/*大家好，我叫杨阳，来自三国之源襄阳；呃...也是郭大侠守过的襄阳*\/\n\/*从事幕墙设计四年，然而为了面包和牛奶，咳咳咳...*\/\n\/*目标就得大一些——我期望能成为一名大前端，做全栈开发工程师*\/\n\/*好了，闲话少说，讲故事得有酒才成。下面是我为大家展现的诚意（借鉴）*\/\n\/*先来点CSS，加点基本样式*\/\n';

		var style1 = '\n* {\n    	padding: 0;\n    	margin: 0;\n}\nbody {\n        transition: all 1s;\n    	background: #224B60;\n}\n#sourceBoard {\n        width: 45%;\n    	height: 600px;\n    	position: absolute;\n    	left: 2%;\n    	top: 20px;\n    	font-size: 14px;\n        font-family: "microsoft yahei";\n        overflow: auto;\n    	border: 2px solid #F1F9F9;\n    	border-radius: 5px;\n}';

		var trans1 = '\n\/*似乎有点单调，先让语法高亮显示吧*\/';

		var lightheight = '\n#sourceBoard {\n        background: #272822;\n}\n';

		var trans2 = '\n\/*接下来，我需要准备一下简历。先将刚才写的样式踢到一边去*\/';

		var animateToRight1 = '\n#sourceBoard {\n    	animation: translate 2s ease normal 1 forwards;\n}\n@keyframes translate {\n    	from {left: 2%;}\n    	to {left:50%;}\n}\n';

		var animateToRight2 = '\n#sourceBoard {\n        box-shadow: -5px 4px 6px rgba(255, 255, 255, .2);\n}\n';

		var resumeBoard = '#resumeBoard {\n        width: 45%;\n        height: 620px;\n        color: #fff;\n        padding: 10px;\n        background: #272822;\n        text-indent: 24px;\n        line-height: 2em;\n        position: absolute;\n        left: 2%;\n        top: 30px;\n        border: 2px solid #F1F9F9;\n        border-radius: 5px;\n        overflow: auto;\n        box-shadow: 5px 4px 6px rgba(255, 255, 255, .2);\n}\n';

		var resume = '\n  # <center>杨阳_前端开发简历</center>\n<hr/>\n  ## 工作经历: ## \n<hr/>\n### 1、幕墙设计师###    \n四年幕墙设计师，熟练使用图形设计软件，做过三维图、效果图，有一定的审美能力，是前端开发的一味辅药\n### 2、前端初学者###    \n2017年年底，发现继续做幕墙设计没前（钱）途，便转身投向前端开发的学习中。利用下班时间，看“菜鸟教程”，\n看入门书籍，谁说前端简单的，来来来我们坐下聊聊。。。后来又跟着视频教程，做demo，找网页练习。。。书读百遍，\n其义自现，代码敲多了，不会的查多了，也就慢慢对前端有了个初步的了解。可惜下班时间有限，作为一个设计狗，还\n得时不时加班，就更限制了学习的进度。鉴于此，既然有了选择，为何就不能在工作中提升自我呢？于是我就毅然决然\n地开始追寻新世界的大门！';

		var trans3 = '\n  \/*对了，这个简历是markdown语法，应该改成html才看着舒服。\n  *接下来变个魔术\n  *倒数3个数字\n  *3......\n  *2......\n  *1......\n  *OK,这就是为您准备的菜，祝享用愉快！ */'

		var str = introduce.concat(style1).concat(trans1).concat(lightheight).concat(trans2).concat(animateToRight1).concat(animateToRight2).concat(resumeBoard).concat(resume).concat(trans3);

		//常规声明区
		var styleTag = document.getElementById('styleTag');
		var sourceBoard = document.getElementById('sourceBoard');
		var n = 0;

		//主体控制区
		var controller = setInterval(put, 20);
		
		//输出代码
		function put() {

			n++;

			//分别向内容及样式输出
			if (n >= 0 && n <= 1225) {
				sourceBoard.innerHTML = str.substring(0, n);
				styleTag.innerHTML = str.substring(158, n);
			}

			//内容溢出下拉
			if (n >= 582) {
				$("#sourceBoard").animate({scrollTop: 2000}, 10);
			}

			//代码高亮
			if (n >= 537 && n <= 1225) {
				sourceBoard.innerHTML = Prism.highlight(str.substring(0, n), Prism.languages.css); 
			}

			//判断：如果浏览器为 IE，直接改变 pre 标签的坐标
			if (n === 616) {
				if (isIE()) {
					sourceBoard.style.left = '50%';
				}
			}

			//创建简历板
			if (n >= 830 && n <= 1225) {
				if (!document.getElementById('resumeBoard')) {
					var resumeBoard = document.createElement('pre');
					resumeBoard.setAttribute('id', 'resumeBoard');
					document.body.appendChild(resumeBoard);
				} 
			}
			
			/*简历板写完之后，需要在sourceBoard中写入魔术代码*/
			if (n >= 1599) {
				sourceBoard.innerHTML = Prism.highlight(str.substring(0, 1225), Prism.languages.css) + Prism.highlight(str.substring(1599, n), Prism.languages.css);
			}

			if(n > 1225 && n <= 1599){
			var resumeBoard = document.getElementById('resumeBoard');
			resumeBoard.innerHTML = str.substring(1225, n);
			}

			//利用 markdown.js 将简历板解析成 HTML 格式
			if (n >= 1690 && n <= 1717) {
				var resumeBoard = document.getElementById('resumeBoard');
				resumeBoard.innerHTML = marked(str.substring(1225, 1599));
				if (n >= 1717) {
				console.log(sourceBoard.innerHTML);
				clearInterval(controller);
				}
			}		
		}

		//判断是否为ie浏览器
		function isIE() {
			if (!!window.ActiveXObject || 'ActiveXObject' in window) {
				return true;
			} else {
				return false;
			}
		}

		//跳过动画
		$('button').on('click', function() {
			clearInterval(controller);
			var skipStr1 = introduce.concat(style1).concat(trans1).concat(lightheight).concat(trans2).concat(animateToRight1).concat(animateToRight2).concat(trans3);
			var skipStr2 = resume;
			var skipStr3 = style1.concat(lightheight).concat(animateToRight1).concat(animateToRight2);
			sourceBoard.innerHTML = Prism.highlight(skipStr1, Prism.languages.css);
			styleTag.innerHTML = skipStr3;
			if (!document.getElementById('resumeBoard')) {
				var resumeBoard = document.createElement('pre');
				resumeBoard.setAttribute('id', 'resumeBoard');
				document.body.appendChild(resumeBoard);
			}
			$('#resumeBoard').css({'width': '45%', 'height': '620px', 'color': '#fff', 'padding': '10px', 'background': '#272822', 'text-indent': '24px', 'line-height': '2em', 'position': 'absolute', 'left': '2%', 'top': '30px', 'border': '2px solid #F1F9F9', 'border-radius': '5px', 'overflow': 'auto', 'box-shadow': '5px 4px 6px rgba(255, 255, 255, .2',});
			resumeBoard.innerHTML = marked(skipStr2);
			$('button').hide(1000);
		});
	});
})();