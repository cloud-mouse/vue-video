(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0accf955"],{"37f9":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"index-view"},[a("div",{staticClass:"index-search"},[a("van-search",{attrs:{shape:"round",background:"#fff",placeholder:"搜索视频",disabled:""},on:{click:t.toSearch},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}})],1),a("div",{staticClass:"index-banner"},[a("van-swipe",{staticClass:"my-swipe",attrs:{width:"200px",autoplay:3e3,touchable:"","lazy-render":"","indicator-color":t.indicatorColor}},t._l(t.slider,(function(e,i){return a("van-swipe-item",{key:i},[a("a",{attrs:{href:e.link,target:"_blank"}},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:e.path,expression:"image.path"}],on:{click:function(a){return t.linkJump(e.link)}}})])])})),1)],1),a("div",{staticClass:"tabs-box"},[a("van-tabs",{attrs:{animated:"",swipeable:"",border:!1,color:"#335eea","title-active-color":"#335eea","title-inactive-color":"#333"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},t._l(t.indexData,(function(e){return a("van-tab",{key:e._id,attrs:{title:e.name}},[e.movieList&&e.movieList.length?a("div",{staticClass:"movie-content"},t._l(e.movieList,(function(e,i){return a("div",{key:i,staticClass:"block-list"},[e.list.length?[a("div",{staticClass:"title"},[t._v(t._s(e.name))]),a("div",{staticClass:"movie-list"},[t._l(e.list,(function(e){return a("div",{key:e._id,staticClass:"movie-item",on:{click:function(a){return t.toDetail(e._id)}}},[a("img",{attrs:{src:e.cover,alt:""}}),a("div",{staticClass:"mv-info"},[a("div",{staticClass:"mv-name"},[t._v(t._s(e.name||"..."))])])])})),e.list.length?t._e():a("div",{staticClass:"no-data"},[t._v(" 暂无内容 ")])],2)]:t._e()],2)})),0):a("div",{staticClass:"no-data"},[a("NoData",{attrs:{text:"该分类下暂无内容"}})],1)])})),1)],1)])},n=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"no-data",style:"font-size:"+t.fontSize+"px"},[a("svg-icon",{attrs:{"icon-class":t.icon}}),a("p",{staticStyle:{"font-size":"14px",color:"#999999"}},[t._v(t._s(t.text))])],1)},c=[],r=(a("a9e3"),a("c00a")),o={components:{SvgIcon:r["a"]},props:{icon:{type:String,default:""},fontSize:{type:Number,default:48},text:{type:String,default:"暂无数据"}}},l=o,u=(a("fdc0"),a("2877")),d=Object(u["a"])(l,s,c,!1,null,"3e473c06",null),f=d.exports,v=a("b775"),p={getIndex:function(t){return Object(v["a"])({url:"/web-api/getIndex",method:"get",params:t})}},h={components:{NoData:f},data:function(){return{value:"",active:"",slider:[],indexData:[],indicatorColor:"#fff"}},created:function(){this.getIndex()},methods:{getIndex:function(){var t=this;p.getIndex().then((function(e){t.indexData=e.data.list,t.slider=e.data.slider}))},toDetail:function(t){this.$router.push({path:"/movie/detail",query:{id:t}})},toSearch:function(){this.$router.push({path:"/search"})},linkJump:function(t){}}},b=h,m=(a("63d1"),a("aa25"),Object(u["a"])(b,i,n,!1,null,"05079710",null));e["default"]=m.exports},"63d1":function(t,e,a){"use strict";var i=a("c72a"),n=a.n(i);n.a},7156:function(t,e,a){var i=a("861d"),n=a("d2bb");t.exports=function(t,e,a){var s,c;return n&&"function"==typeof(s=e.constructor)&&s!==a&&i(c=s.prototype)&&c!==a.prototype&&n(t,c),t}},a9e3:function(t,e,a){"use strict";var i=a("83ab"),n=a("da84"),s=a("94ca"),c=a("6eeb"),r=a("5135"),o=a("c6b6"),l=a("7156"),u=a("c04e"),d=a("d039"),f=a("7c73"),v=a("241c").f,p=a("06cf").f,h=a("9bf2").f,b=a("58a8").trim,m="Number",_=n[m],g=_.prototype,x=o(f(g))==m,I=function(t){var e,a,i,n,s,c,r,o,l=u(t,!1);if("string"==typeof l&&l.length>2)if(l=b(l),e=l.charCodeAt(0),43===e||45===e){if(a=l.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(l.charCodeAt(1)){case 66:case 98:i=2,n=49;break;case 79:case 111:i=8,n=55;break;default:return+l}for(s=l.slice(2),c=s.length,r=0;r<c;r++)if(o=s.charCodeAt(r),o<48||o>n)return NaN;return parseInt(s,i)}return+l};if(s(m,!_(" 0o1")||!_("0b1")||_("+0x1"))){for(var N,k=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof k&&(x?d((function(){g.valueOf.call(a)})):o(a)!=m)?l(new _(I(e)),a,k):I(e)},y=i?v(_):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),C=0;y.length>C;C++)r(_,N=y[C])&&!r(k,N)&&h(k,N,p(_,N));k.prototype=g,g.constructor=k,c(n,m,k)}},aa25:function(t,e,a){"use strict";var i=a("cf47"),n=a.n(i);n.a},b43b:function(t,e,a){},c72a:function(t,e,a){},cf47:function(t,e,a){},fdc0:function(t,e,a){"use strict";var i=a("b43b"),n=a.n(i);n.a}}]);