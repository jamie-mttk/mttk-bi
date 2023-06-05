import Sortable from "sortablejs";

export const vTableDragable = {
    mounted(el, binding) { 
        let options = binding.value;
       
        if(!options){
            options=dragOptionsDefault
        }
        for (let oi = 0; oi < options.length; oi++) {
            const o = options[oi]; 
            new Sortable(el.querySelector(o.selector), o.option);
        }
    },
};

 const  dragOptionsDefault = [
    // {
    //     selector: "thead tr", // add drag support for column
    //     option: { // sortablejs's option
    //         animation: 150,
    //         // onEnd: (evt) => {
    //         //     /* you can define a 'columns' ref 
    //         //     and use v-for render it in table's slot. 
    //         //     then you can change index of the item in 'column' here 
    //         //     to implement drag column to sort */
    //         //     console.log(evt.oldIndex, evt.newIndex);
    //         // },
    //     },
    // },
    {
        selector: "tbody", // add drag support for row
        option: { // sortablejs's option
            animation: 150,
            // onEnd: (evt) => {
            //     console.log(evt.oldIndex, evt.newIndex);
            // },
        },
    },
];