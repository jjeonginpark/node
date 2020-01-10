var members = ['park', 'kim', 'lee'];

// members.forEach((member) => {
//     console.log(member);
// })

var roles = {
    'programer' : 'park',
    'designer' : 'kim',
    'manager' : 'lee'
};

for(var name in roles){
    console.log('object=>',name, 'value=>', roles[name]);
}



