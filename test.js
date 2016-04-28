

var t = function(){
    if(arguments)
    {
        for(var i=0; i< arguments.length;i++)
        {
            console.log(arguments[i]);
        }
    }
};


var arr=["aa","bb",11];

t.apply(null,arr);



