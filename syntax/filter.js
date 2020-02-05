let origin = [
    {id:1,verified:false,note:""},
    {id:2,verified:false,note:""},
    {id:3,verified:false,note:""},
    
];

let update = [
    {id:1,verified:true,note:""},
    {id:2,verified:false,note:"test"},
    {id:3,verified:false,note:""},
    {id:4,verified:false,note:""}
];

let filtered = update.filter((each1 , idx) =>{
    let each2 = origin.find(element => element.id === each1.id);
    if(!each2 || each1.verified !== each2.verified || each1.note !== each2.note){
        return true;
    }
});

console.log(filtered);
//console.log(filtered2);