class Banner {
    constructor(container, interval, speed) {
        this.container = container;
        this.wrapper = container.querySelector('.wrapper');
        this.focus = container.querySelector('.focus');
        this.arrowLeft = container.querySelector('.arrowLeft');
        this.arrowRight = container.querySelector('.arrowRight');
        this.slideList = null;
        this.focusList = null;
        this.autoTimer = null;
        this.stepIndex = 0;
        this.interval = interval;
        this.speed = speed
        this.init();
    }

    queryData() {
       return  new Promise((resolve, reject) => {

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'json/banner.json');
            xhr.onreadystatechange = () => {
                if (xhr.status === 200 && xhr.readyState === 4) {
                    console.log(xhr.responseText)
                    let data = JSON.parse(xhr.responseText)
                    resolve(data);
                }
            }
            xhr.send(null)
        })
    }

    bindHtml(data) {
        let strSlide = ``;
        let strFocus = ``;
        data.forEach((item, index) => {
            let {img, desc} = item;
            strSlide += `<div class="slide"><img src="${img}" alt="${desc}"></div>`;
            strFocus +=`<li class="${index==0?'active':''}"></li>`;
        });
        this.wrapper.innerHTML=strSlide;
        this.focus.innerHTML=strFocus;
        this.slideList=this.wrapper.querySelectorAll('.slide');
        this.focusList=this.focus.querySelectorAll('li');
        this.wrapper.appendChild(this.slideList[0].cloneNode(true));
        this.slideList=this.wrapper.querySelectorAll('.slider');
        utils.css(this.wrapper,'width',strSlide.length*1000);
    }
    autoMove(){
        this.stepIndex++;
        console.log(this.slideList)
        if(this.stepIndex<(this.slideList.length-1)){
            utils.css(this.wrapper,'left',0);
            this.stepIndex=1;
        }
        animate(this.wrapper,{left:-this.stepIndex*1000},this.speed);
        this.changeFocus();
    }
    changeFocus(){
        let temIndex=this.stepIndex;
        if(temIndex===this.slideList.length-1){
            temIndex=0;
        }
        [].forEach.call(this.focusList,(item,index)=>{
            item.className=index ===temIndex?'active':'';
        })
    }
    handleContainer(){
        this.container.onmouseenter=()=>{
            clearInterval(this.autoTimer);
            this.arrowLeft.style.display=this.arrowRight.style.display='block';
        }
        this.container.onmouseleave=()=>{
           this.autoTimer=setInterval(this.autoMove,this.interval);
            this.arrowLeft.style.display=this.arrowRight.style.display='none';
        }
    }
    handleArrow(){
        this.arrowRight.onclick=this.autoMove;
        this.arrowLeft.onclick=()=>{
            this.stepIndex--;
            if(this.stepIndex==0){
                utils.css(this.wrapper,'left',-(this.slideList.length-1)*1000);
                this.stepIndex=this.slideList.length-2;
            }
            animate(this.wrapper,{
                left:-this.stepIndex*1000
            },speed);
        }
    }
    init(){
        let promise = this.queryData();
        let _this=this;
        promise.then((data)=>{
            this.bindHtml.call(_this,data)
        }).then(()=>{
            this.autoTimer=setInterval(()=>{
                this.autoMove.call(_this)
            },this.interval)
        }).then(()=>{
            this.handleContainer();
            this.handleArrow();
        })
    }
}