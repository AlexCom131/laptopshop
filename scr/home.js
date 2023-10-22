function home(){
    let startArray = 
    [

    ]
    
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(i, rowSt)
    }
   
    refresh = () => location.reload();

    homebutt.addEventListener('click', refresh);
      
}
