

var ajax=(doSth)=>{
    var apiData=[{newsid:"101",newstitle:"测试标题1"},
        {newsid:"102",newstitle:"测试标题2"},
        {newsid:"103",newstitle:"测试标题3"}];
    setTimeout(()=>{
       doSth(apiData)
    },1000)
};


var news={
   _cache:{
       list:[],
       detail:{}
   },
    get cache_list(){
        return this._cache["list"];
    },
    set cache_list(value)
    {
        this._cache["list"]=value;
    },
    loadCache(action)//加载缓存
    {
      if(this.cache_list.length==0)
      {
          ajax((apiData)=>{
              this.cache_list=apiData;//设置 新闻列表 缓存
              action();//手动
          })
      }
    },
   getList(){  //获取新闻列表
          return [
              {newsid:"101",newstitle:"测试标题1"},
              {newsid:"102",newstitle:"测试标题2"},
              {newsid:"103",newstitle:"测试标题3"}
          ];
      },
    getOne(newsid,callback) //获取单条新闻
    {
        this.loadCache(()=>{
            var index=-1;
            var getRet= this.cache_list.map((item,i)=>{
                if(item.newsid==newsid)
                {
                    index=i;
                    return item;
                }
            });
            if(index>=0) //如果有索引，则直接返回具体的某一项
            {
                callback(getRet[index]);//手动执行 回调函数
            }
           /* else
                return null;*/
        });

    }

};

news.getOne(109,(item)=>{
   alert(item.newstitle);
})
/*

alert(news.getOne(103).newstitle)
alert(news.getOne(101).newstitle)*/
