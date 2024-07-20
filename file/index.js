let header      =   document.querySelector("header");
let about       =   document.querySelector(".about");
let product     =   document.querySelector(".product");
let services    =   document.querySelector(".services");
let contact     =   document.querySelector(".contact");
let icons       =   document.querySelectorAll(".icon li");
let back        =   document.querySelector(".back");
let paper_details = document.querySelector(".paper_details")
let links       =   document.querySelectorAll(".links li");
let menu        =   document.querySelector(".links");
let products    =   document.querySelectorAll(".container .box");
let btn_confi   =   document.querySelector(".config");
let btn_submit  =   document.querySelector(".submit");
let user_name   =   document.querySelector(".user");
let email       =   document.querySelector(".email");
let phone       =   document.querySelector(".phone");
let address     =   document.querySelector(".address");
let footer      =   document.querySelector("footer");
let screen      =   document.createElement("div");
screen.className = "screen";
/* ============================= Form Data od User ===================== */
class form{
    constructor(order , price , data_of_user){
        this.order = order;
        this.price = price;
        this.data = data_of_user;
    }
}
/* ===================================================================== */
/* ============================= Scrolling ============================= */
window.onscroll = function(){
    if(window.scrollY >= about.offsetTop - 60){
        header.style.backgroundColor = '#000';
    }
    else if(window.scrollY <= about.offsetTop - 60){
        header.style.backgroundColor = '#00000000'
    }
    /* ============================== Adding Class Active ============================= */
    if(window.scrollY <= about.offsetTop - 60){
        links.forEach((e) => e.classList.remove("active"));
        links[0].classList.add("active");
    }
    else if(window.scrollY >= about.offsetTop - 60 && window.scrollY < product.offsetTop - 70){
        links.forEach((e) => e.classList.remove("active"));
        links[1].classList.add("active")
    }
    else if(window.scrollY >= product.offsetTop - 70 && window.scrollY < services.offsetTop){
        links.forEach((e) => e.classList.remove("active"));
        links[2].classList.add("active");
        products.forEach((e) => e.style.opacity='1')
    }
    else if(window.scrollY >= services.offsetTop - 70 && window.scrollY < contact.offsetTop - 100){
        links.forEach((e) => e.classList.remove("active"));
        links[3].classList.add("active");
    }
    else{
        links.forEach((e) => e.classList.remove("active"));
        links[4].classList.add("active");
    }
}
/* ===================================================================== */

/* ============================= icons header ========================== */

document.addEventListener('click' , function(e){
    console.log(e.target)
    if(e.target.getAttribute("class") === "menu"){
        menu.classList.toggle("open_menu");
        if(menu.getAttribute("class") == "links open_menu"){
            menu.style.cssText = "animation: animation_menu 1s ease-out 0s 1 forwards;"
        }
        else{
            menu.style.cssText = "animation: none";
            menu.classList.remove("open_menu");
        }
    }
    else{
        menu.style.cssText = "animation:none";
        menu.classList.remove("open_menu");
    }
})
/* ===================================================================== */

/* ===================== selection the Product ========================= */
    let orders = [];
    let paper_Order = [];
    
products.forEach(function(ele,index,array){
    let obj = {};
    ele.children[1].children[2].children[0].addEventListener('click' , function(){
        obj.product = ele.children[1].children[0].innerHTML;
        obj.price = ele.children[1].children[1].children[1].innerHTML;
        obj.time = new Date().getSeconds();
        orders.push(obj)
    })
})
btn_confi.onclick = function(){
    if(orders.length !== 0){
        return_price_order(orders);
    }
}

/* ===================================================================== */
function return_price_order(order){ 
    let sum_of_price = 0;
    order.forEach(function(e){
        sum_of_price += Number(e.price.substring(0,e.price.length - 1));
    })
    return sum_of_price;
}
back.addEventListener('click' , function(){
    paper_details.classList.toggle("open");
    if(paper_details.getAttribute("class") === "paper_details open")
    {
        paper_details.style.cssText = 'transform:scaleY(1)'
    }
    else{
        paper_details.style.cssText = 'transform:scaleY(0)'
    }
})
/* ===================================================================== */
btn_submit.onclick = function(){
    if(orders.length !== 0 && user_name.value !== '' && email.value !== '' && phone.value !== '' && address.value !== ''){
        back.style.display = 'block';
        let data_user = return_data_user(user_name.value , email.value ,  phone.value , address.value);
        let price_order = return_price_order(orders)
        let form_user = new form(orders , price_order , data_user);
        create_Element(form_user.data , form_user.order , form_user.price);
        create_span(paper_details.children.length)
        user_name.value = email.value = phone.value = address.value = '';
        orders = [];
    }
}





/* ================================================================== */
/* ======================== FUNCTIONS OPERATIONS ==================== */
/* ================================================================== */
function return_data_user(name , email , phone , address){
    let data = {
        name : name,
        email : email,
        phone : phone, 
        address : address
    }
    return data;
}
/* ================================================================= */

function create_Element(data , order , price){
    let table = document.createElement('table')
    /* ================ data of user ==================== */
    for(let i in data){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(i));
        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(data[i]))
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.style.color = "black"
        table.appendChild(tr);
    }
    /* ================================================= */
    /* =================== data of oreder ============== */
    for(let i of order){
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        td1.appendChild(document.createTextNode(i.product))
        td2.appendChild(document.createTextNode(i.price))
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.style.color = 'brown'
        table.appendChild(tr)
    }
    /* ================================================= */
    /* =================== storage Data in table ======= */
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    let td2 = document.createElement("td");
    td1.appendChild(document.createTextNode("sum"));
    td2.appendChild(document.createTextNode(`${price}$`));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.style.color = '#00fd00';
    table.appendChild(tr);
    /* ================================================= */
    let div = document.createElement("div");
    div.className = "header_order";
    div.appendChild(table);
    paper_Order.push(div); 
    
    let list = document.createElement("li");
    console.log(list)
    list.appendChild(document.createTextNode(data.name));
    list.style.cssText="display:block ; border:1px solid #ccc ; color:#000";
    let time_operate = new Date().getSeconds();
    list.setAttribute("time_list" , time_operate);
    div.setAttribute("time_table" , time_operate);
    paper_details.appendChild(list);
    paper_details.style.cssText = 'transform:scaleY(0)'
    list.addEventListener('click' , function(){
        display_paper_order_on_screen(return_paper_order(this));
    })
}
/* ========================================================================= */
/* ========================================================================= */
function return_paper_order(index_of_order){
    let sellect;
    paper_Order.forEach(function(e,i,a){
        if(e.getAttribute("time_table") === index_of_order.getAttribute("time_list")){
            sellect = e;
        }
    })
    return sellect;
}

function display_paper_order_on_screen(paper){
    screen.textContent = '';
    screen.appendChild(paper);
    document.body.appendChild(screen);
}
document.onclick = function(e){
    e.target.getAttribute("class") !== null ? screen.textContent = '' : console.log("no")
}

function create_span(number){
    let span = document.createElement("span");
    span.style.cssText = "display:inline-block;\
                        width:13px ; height:13px ; border-radius:50% ;\
                        background-color:red ; line-height:13px;\
                        text-align: center ; position: absolute;\
                        top:10px ; left:20px ; font-size:10px; pointer-event: none";
    span.appendChild(document.createTextNode(number))
    back.appendChild(span);
}