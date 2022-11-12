const { FORMERR } = require('dns');
const {readFileSync, promises: fsPromises} = require('fs');
function syncReadFile(filename) {
  const contents = readFileSync(filename, 'utf-8');
  const arr = contents.split(/\r?\n/);
  return arr;
}
let data=syncReadFile('./sales-data.txt');

let date=[];
let SKU=[];
let Unit_price=[];
let Quantity=[];
let Total_price=[];
for(let i=1;i<data.length;i++){
    let x=data[i].split(",")
    date.push(x[0]);
    SKU.push(x[1]);
    Unit_price.push(parseInt(x[2]));
    Quantity.push(parseInt(x[3]));
    Total_price.push(parseInt(x[4]))
}
//Total sales of the store.
let sum=0;
for(let i=0;i<Total_price.length;i++){
    sum+=Total_price[i]
}
console.log("1. Total sales of the store: ₹ "+ sum );
//Month wise sales totals.
let map1=new Map();
let month=[];
for(let i=0;i<date.length;i++){
    let y=date[i].split("-");
    month.push(parseInt(y[1]))
}
for(let i=0;i<month.length;i++){
    if(map1.has(month[i])){
        let value=map1.get(month[i])+Total_price[i];
        map1.set(month[i],value)
    }else{
        map1.set(month[i],Total_price[i])
    }
}
let mon= ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let data_month=[];
let sales=[];
for(let [k,v] of map1){
    sales.push(v)
    data_month.push(k)
}
//Most popular item (most quantity sold) in each month.
//Items generating most revenue in each month.
//For the most popular item, find the min, max and average number of orders each month.
function Mostpopular(index,monthcount,date,SKU,Quantity,Total_price,sales){
    console.log(`${mon[index]} Data:`)
    console.log(`2.1 Monthly wise sale for ${mon[index]} is : ₹ ${sales[index]}`)
    let mon_array=[];
    let item=[];
    let quants=[];
    let price=[];
    for(let i=0;i<date.length;i++){
        let moncount=date[i].split("-");
        if(moncount[1]==monthcount){
            item.push(SKU[i])
            quants.push(Quantity[i])
            price.push(Total_price[i])
        }
    }
    let map2=new Map()
    for(let i=0;i<item.length;i++){
        if(map2.has(item[i])){
            let value=map2.get(item[i]);
            map2.set(item[i],value+quants[i])
        }else{
            map2.set(item[i],quants[i])
        }
    }

    let quants_arr=[]
    for(let [k,v] of map2){
        quants_arr.push(v)
    }
    let max=Math.max(...quants_arr);
    let ans=[];
    for(let [k,v] of map2){
        if(v===max){
            ans.push(k)
        }
    }
    console.log(`2.2 Most popular item sold for the month of ${mon[index]} : ${ans[0]}`)

    let map3=new Map();

    for(let i=0;i<item.length;i++){
        if(map3.has(item[i])){
            let value=map3.get(item[i])
            map3.set(item[i],value+price[i])
        }else{
            map3.set(item[i],price[i])
        }
    }
    let max_price=[];
    for(let [k,v] of map3){
        max_price.push(v)
    }
    let max1=Math.max(...max_price);
    let ans1=[];
    for(let [k,v] of map3){
        if(v===max1){
            ans1.push(k)
        }
    }
    console.log(`2.3 ${ans1[0]} is generating most revenue in ${mon[index]} of : ₹ ${max1}`)

    let order=[];
    for(let i=0;i<item.length;i++){
        if(item[i]===ans[0]){
            order.push(quants[i])
        }
    }
    let sum=0
    for(let i=0;i<order.length;i++){
        sum+=order[i]
    }
    let avg=(sum/order.length).toFixed(2);
    let max2=Math.max(...order);
    let min=Math.max(...order);
    console.log(`2.4 For the most popular item(${ans[0]}) of ${mon[index]} ,the data are Min=${min}, Max=${max2} and Average=${avg}`)
}


for(let i=0;i<data_month.length;i++){
    Mostpopular(i,data_month[i],date,SKU,Quantity,Total_price,sales);
}