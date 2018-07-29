//给指定元素添加更改属性
const $attr= (id,name,value) => {
    //获取所有的
    let tagList= document.getElementsByTagName('*');
    tagList = [...tagList];
    return tagList.filter((item)=>{
        return item.id===id&&item.getAttribute(name)===value
    })

}