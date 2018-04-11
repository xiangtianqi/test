/**
 * Created by Administrator on 2016/12/18.
 */

var God={
    version:"1.0",
    extends(name,obj)
    {
        this.init();
        if("data" in obj && "methods" in obj && typeof obj.data=="function" && typeof obj.methods=="object" )
        {
            var getData=obj.data();
            if(typeof  getData=="object")
            {
                Object.assign(obj.methods,getData,this);//把传入对象的Data 合并进入对象的methods
                this[name]=obj; //给GOD对象设置一个属性 （根据参数和参数值)
            }
            //监控 obj.methons里面的属性改变
            for(var prop in getData)
            {
                this.watch(prop,obj.methods,()=>{this.display(name)})
            }

        }
    },
    init() //初始化
    {
        //批量设置的方法
        Object.defineProperties(this,{
               "init":
                {
                    enumerable:false  //设置属性为不可枚举
                },
               "extends":
                {
                    enumerable:false//设置属性为不可枚举
                },
         }
        )

        var keys=Object.keys(this);  //这时 this返回的数组 将不会包含 init和extends
        this.$global={}; //创建一个新对象 叫做 $global
        keys.forEach((key)=>{
            this.$global[key]=this[key];
        });
        //Object.freeze(this.$global);//冻结对象
        this.watch("version",this.$global,this.render);
    },
    watch(keyName,obj,func)//课后作业  根据object监听 属性的变化，利用set特性来实现
    {
        var _key="_"+keyName;
        if( !(_key in obj))
        {
            obj[_key]=obj[keyName];//这是 私有变量初始值设置
        }
        Object.defineProperty(obj,keyName,{
            set:value=>
            {
                obj[_key]=value;
               // this.render();//重新渲染div里面的内容，模拟了监控
                func();

            },
            get()
            {
                return obj[_key];
            }
        })
    },
    render()
    {
        document.getElementById("test").innerHTML="当前版本是:"+this.$global.version;
    },
    display(objName)
    {
        var getTpl=this[objName].template;

        for(var prop in this[objName].methods)
        {
            getTpl=getTpl.replace("{{"+prop+"}}",this[objName].methods[prop]);

        }
        document.getElementById("test").innerHTML=getTpl;
    }

};


var news={
    template:"<a href='/news/{{id}}'>{{title}}</a>",
  data(){
      return {
          id:101,
          title:"今天天气很不错"
      }
  },
    methods:{
        show()
        {
          /*  alert(this.$global.version);
           this.$global.version="2.0";
            alert(this.$global.version);*/

            alert(this.title);
        },
        changeProp()
        {
            this.id=103;
            this.title="周星驰电影美人鱼";
        }

    }
};

 God.extends("news",news);
// God.news.methods.show()


