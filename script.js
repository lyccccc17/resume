var data = {
    number: 0,
    numberList: [0, 0, 0],
    objList: [{num: 0}, {num:0}, {num:0}],
    obj:{
        num: 0
    }
}



var vm = new Vue({
    el: "#app",
    data: data,
    methods: {
        // numberListAdd(index) {
        //     this.numberList[index] +=1;
        // },
        numberListAdd(index) {
            this.$set(this.numberList, index, this.numberList[index]+1);
            //因為 number[index]只是一個值，並非 observer，畫面沒辦法及時更新/通知
            //所以用 $set(欲更改的, 位置, 值) / $set(物件, 屬性, 值)
        },
        objListAdd(index) {
            this.objList[index].num +=1;
        }
    },
    watch: {
        number(newValue, oldValue){
            console.log("number:", newValue, oldValue);
        },
        // obj(newValue, oldValue){
        //     console.log("obj:", newValue, oldValue);
        // }
        ['obj.num'](newValue, oldValue){
            console.log("['obj.num']:", newValue, oldValue);
            //因為是更動 obj.num 所以要觀測 ['obj.num'] 才能看到前後的更動
        },
        obj: {
            handler(newValue, oldValue){
                console.log("obj:", newValue, oldValue);
            },
            deep: true
            //觀測 obj整個物件本身，因物件只有一個，所以只會觀測到物件最後的值
        },
        numberList(newValue, oldValue) {
            console.log("numberList:", newValue, oldValue);
            //因為 $set(this.numberList, ..) 是用 this.numberLise去打通知
            //所以不需使用 deep 即可觀測
        },
        objList: {
            handler(newValue, oldValue){
                console.log("objList:", newValue, oldValue);
            },
            deep: true
        }
    }
})