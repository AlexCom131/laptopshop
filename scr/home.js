function home(){
    let startArray = 
    [
        {producer: "ACER", procesor: "Intel Core i5", volume: 17.3,pzp:"SSD", ozp: 16, imeg: "ACER Nitro 16 60.jpg"},
        {producer: "ACER", procesor: "Intel Core i7", volume: 17.3,pzp:"HDD", ozp: 32, imeg: "ACER Nitro 30 60.jpg"},
        {producer: "ASUS", procesor: "AMD Ryzen 7", volume: 16.5,pzp:"SSD", ozp: 16, imeg: "ASUS.jpg"},
        {producer: "ACER", procesor: "Intel Core i3", volume: 14.3,pzp:"SSD", ozp: 32, imeg: "ACER Aspire 5 Pure Silver.jpg"},
        {producer: "HP", procesor: "Intel Core i5", volume: 16.5,pzp:"SSD", ozp: 16, imeg: "hp(1).jpg"},
        {producer: "Lenovo", procesor: "AMD Ryzen 5", volume: 16.5,pzp:"SSD", ozp: 32, imeg: "ideapadGameg.jpg"},
    ]
    
    for (let i=0; i<startArray.length; i++) {   
        let row = startArray[i]
        let rowSt = JSON.stringify(row)
        localStorage.setItem(i, rowSt)
    }
   
    refresh = () => location.reload();

    homebutt.addEventListener('click', refresh);
      
}
