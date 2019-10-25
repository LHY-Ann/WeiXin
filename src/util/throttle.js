
let obj={
    time:''
}

function fn(tion,arg){
    clearTimeout(obj.time)
    obj.time=setTimeout(()=>{
        tion(arg)
    },1000)
}

export default fn