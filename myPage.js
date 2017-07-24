

	/*
	*这里对这个js文件进行说明一下：分页功能
	0、需要传入初始参数 （1、json格式的数据集合_list ，2、每页显示的个数_n(初始值是1)，3、页码部分每行显示的页数_N（初始值是6，改时需要同时改HTML））
	1、要在页面部分加入HTML代码，如下
				<center>
					<ul class="pagination" id="ul0">
						
						<input type="hidden" name="thisPage" id="thisPage" value="1"/>
						<input type="hidden" name="totalPage" id="totalPage" value="1"/>
						
						<li id="lif">
						  <a href="javascript:void(0);" id="af" aria-label="Previous">
							<span aria-hidden="true">首页</span>
						  </a>
						</li>
						<li id="lip">
						  <a href="javascript:void(0);" id="ap" aria-label="Previous">
							<span aria-hidden="true">上一页</span>
						  </a>
						</li>
						
						<li id="li1"><a href="javascript:void(0);" id="a1" class="as">1</a></li>
						<li id="li2"><a href="javascript:void(0);" id="a2" class="as">2</a></li>
						<li id="li3"><a href="javascript:void(0);" id="a3" class="as">3</a></li>
						<li id="li4"><a href="javascript:void(0);" id="a4" class="as">4</a></li>
						<li id="li5"><a href="javascript:void(0);" id="a5" class="as">5</a></li>
						<li id="li6"><a href="javascript:void(0);" id="a6" class="as">6</a></li>
						
						<li id="lin">
						  <a href="javascript:void(0);" id="an" aria-label="Next">
							<span aria-hidden="true">下一页</span>
						  </a>
						</li>
						<li id="lil">
						  <a href="javascript:void(0);" id="al" aria-label="Next">
							<span aria-hidden="true">尾页</span>
						  </a>
						</li>
						
					</ul>
				</center>
			注意：页码内的id值不能变。
	3、引用这个文件之后，在使用之前，需要自己写拼装代码，即显示数据部分的refresh(_thisPage, _list, _n); 拼接的结果为htmlShow，将其显示在数据域即可
		例：
		//显示刷新博客内容
	function refreshBlogs(thisPage,blogList,n)
	{
		var thisPage = parseInt($("#thisPage").val());//当前页
		var begin = n * (thisPage - 1) + 1;//起始索引
		var htmlShow = "";//存放拼接的html
		for(var i = begin; i <= (begin + n - 1); i ++)
		{
			if(i > blogList.length) break;//超出总数的话退出
			
			//这里要注意，i的下标要减1，它是从0开始的
			//拼接html显示片段
			htmlShow += "<article> <div class='art-header'> <span class='label label-success'>"
			+ blogList[i-1].property 
			+ "</span> <a href='" 
			+ "BlogDetailAction?blog_id=" + blogList[i-1].id
			+ "'><h6 style='text-indent: 1.5em;'>" 
			+ blogList[i-1].title 
			+ "</h6> </a></div> <div class='art-content'> <p style='text-indent: 2em;'>"	
			+ blogList[i-1].summary + "......"
			+ "</p> </div><div class='text-right'> <span class='badge'>"
			+ new Date(blogList[i-1].time).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')//处理日期和时间中带T的问题
			+ "</span>	<a href='#'> read <span class='badge'>"
			+ blogList[i-1].read
			+ "</span></a> <a href='#'> comments <span class='badge'>"
			+ blogList[i-1].comment
			+ "</span></a>";
			
			//这里判断是否是用户自己的博文，决定显示不显示编辑和删除
			if(istatus == "1")
			{
				htmlShow += "<a href='"	
				+ "EditBlogAction?id=" + blogList[i-1].id	
				+ "'>编辑</a> <a href='"
				+ "DelBlogAction?id=" + blogList[i-1].id
				+ "'>删除</a>";
			}
			
			htmlShow += "</div> </article> <hr>";					
		}
		
		$("#htmlShow").html(htmlShow);
		
	}
	4、使用顺序：在js代码块里，写在read里面
		$(document).ready(function()
		{
			//获取list集合
			//........
			
			//调用list
			init(list, n, N);
			addListen();
			
			//自己写refresh(_thisPage, _list, _n);即显示数据部分的refresh

			
		
		});
	5、别忘自己在页面写个htmlShow。
	*
	*/
	//定义每行显示几页，N
	var N = 6;
	//定义每页显示几条数据，n
	var n = 1;
	//定义保存list的全局变量
	var list = [];
	//当前页数
	var thisPage = 1;
	//总页数
	var totalPage = 1;

		
	
	//初始化函数
	function init(_list, _n, _N)
	{
		//获取list集合，json类型,n , N
		list = _list;
		n = _n;
		N = _N;
		
		
		//显示页码表
		$("#ul0").show();		
		
		//判断是否为空		
		if(list == null || list.length == 0 )
	  	{
			$("#ul0").hide();
			return false;
	  	}
		
		
		//计算总页数，初始化页数，这里是每页显示n条数据
		totalPage = Math.ceil(list.length / n);
		thisPage = 1;
		
		//调用一下display()
		display();
	}


	//添加监听
	function addListen()
	{
		//alert("调用了addlisten");
		//给首页添加监听
		$("#lif").click(function()
		{
			//alert("lif");
			thisPage = 1;
			//调用一下display()
			display();
		});
		//给上一页添加监听
		$("#lip").click(function()
		{
			//alert("lip");
			if(thisPage > 1) thisPage -= 1;
			//调用一下display()
			display();
		});
		//批量给1-5按钮添加监听
		$(".as").click(function()
		{
			//alert(147);
			//alert(thisPage);
			thisPage = parseInt($(this).text());
			//alert(thisPage);
			//调用一下display()
			display();
		});					
		//给下一页添加监听
		$("#lin").click(function()
		{
			
			if(thisPage < totalPage) thisPage += 1;
			//alert(thisPage);
			//调用一下display()
			display();
		});
		//给尾页添加监听
		$("#lil").click(function()
		{
			thisPage = totalPage;
			//调用一下display()
			display();
		});
	}
	
	
	//1.计算并判断决定1-N按钮显示的结果  2.刷新博客内容refreshBlogs();
	function display()
  	{
		/**
		*1.计算并判断决定1-N按钮显示的结果
		*/
		//初始化隐藏所有按钮
  		for(var i = 1; i <= N; i ++)
  		{
  			var li = "#li" + i;
  			$(li).hide();
  			$(li).removeClass();
  		}
		
	  	//按页数与N比较进行分类
		if(totalPage <= N)
	  	{
			//当总页数少于N时，直接设置显示值
	  		for(var i = 1; i <= totalPage; i ++)
	  		{
	  			var li = "#li" + i;
	  			var a = "#a" + i;
	  			$(li).show();
	  			$(a).text(i);
	  		}
	  		$("#li" + thisPage).addClass("active");
	  	}
		else
		{
			//当总页数大于N时，且属于首行
			if(thisPage <= (Math.floor(N / 2) + 1))
			{
				for(var i = 1; i <= N; i ++)
		  		{
		  			var li = "#li" + i;
		  			var a = "#a" + i;
		  			$(li).show();
		  			$(a).text(i);
		  		}
				$("#li" + thisPage).addClass("active");
			}
			else if((totalPage - thisPage) < Math.ceil(N / 2))//当总页数大于N时，且当前页属于最后一行
			{
				for(var i = 1; i <= N; i ++)
		  		{
		  			var li = "#li" + i;
		  			var a = "#a" + i;
		  			$(li).show();
		  			$(a).text(totalPage - N + i);
		  		}
				$("#li" + (N -(totalPage - thisPage))).addClass("active");
			}
			else//当总页数大于N时，且当前页不是首行也不是末行（首行指1-N）
			{
				for(var i = 1; i <= N; i ++)
		  		{
		  			var li = "#li" + i;
		  			var a = "#a" + i;
		  			$(li).show();
		  			$(a).text(thisPage - (Math.floor(N / 2) + 1) + i);
		  		}
				$("#li" + (Math.floor(N / 2) + 1)).addClass("active");
			}
		}
		
		/**
		* 2.刷新list内容refresh();
		*/
		refresh(thisPage, list, n);
  	}