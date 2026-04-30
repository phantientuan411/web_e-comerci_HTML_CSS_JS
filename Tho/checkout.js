let checkout = JSON.parse(localStorage.getItem("cart"))
let orders = JSON.parse(localStorage.getItem("orders")) || [];
const checkoutitem = document.getElementById("item");

function checkouttotal()
{
    const boxsubtotal=document.getElementById("subtotal");
    const boxtotal=document.getElementById("total");
    const boxcoupon=document.getElementById("coupontotal");
    const couponrow=document.getElementById("couponrow");
    const couponhr=document.getElementById("couponhr");
    const coupon=document.getElementById("coupon-input").value.trim();
    const validcoupon=['CODEWEB10DIEM','WEBCOBAN'];
    let alltotal=0;
    checkout.forEach(item => 
    {
        alltotal+=item.price*item.quantity;
    });
    const subtotal=alltotal;
    let total=alltotal;
    if(validcoupon.includes(coupon.toUpperCase()))
    {
        total=alltotal*0.9;
        couponrow.style.display="flex";
        couponrow.style.justifyContent="space-between";
        couponhr.style.display="block";
        boxcoupon.innerHTML="10%";
    }
    boxsubtotal.innerHTML = `$${subtotal}`;
    boxtotal.innerHTML = `$${total}`;
}

function checkCoupon()
{
    const coupon=document.getElementById("coupon-input").value.trim();
    const messagetag=document.getElementById("coupon-message");
    const validcoupon=['CODEWEB10DIEM','WEBCOBAN'];
    if(coupon==="")
    {
        messagetag.innerHTML="Please enter the coupon code!";
        messagetag.className="message error";
    }
    else if(validcoupon.includes(coupon.toUpperCase()))
    {
        messagetag.innerHTML="Coupon code applied successfully!";
        messagetag.className="message success";
    }
    else
    {
        messagetag.innerHTML="Invalid coupon code!";
        messagetag.className="message error";
    }
    checkouttotal();
}

function getcheckout()
{
    checkoutitem.innerHTML="";
    checkout.forEach(item => 
    {
        const itemtotal=item.price*item.quantity;
        const checkouthtml=`
        <div class="checkout-item">
            <div class="product-info">
                <img src="${item.anh_main}" alt="${item.name}" class="product-img">
                <span class="product-name">${item.name}</span>
            </div>
            <div class="product-subtotal">
                $${itemtotal}
            </div>
        </div>
        `;
        checkoutitem.innerHTML+=checkouthtml;
    });
    checkouttotal();
}

function gotosuccess()
{
    const name=document.getElementById("name").value.trim();
    const address=document.getElementById("address").value.trim();
    const city=document.getElementById("city").value.trim();
    const phone=document.getElementById("phone").value;
    const email=document.getElementById("email").value;
    const msgname=document.getElementById("msgname");
    const msgaddress=document.getElementById("msgaddress");
    const msgcity=document.getElementById("msgcity");
    const msgphone=document.getElementById("msgphone");
    const msgemail=document.getElementById("msgemail");
    const regexphone=/^(0)[0-9]{9}$/;
    const regexemail=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let valid=true;
    if(name==="")
    {
        msgname.innerHTML="Please enter your name!";
        msgname.style.display="block";
        valid=false;
    }
    else
        msgname.style.display="none";
    if(address==="")
    {
        msgaddress.innerHTML="Please enter your address!";
        msgaddress.style.display="block";
        valid=false;
    }
    else
        msgaddress.style.display="none";
    if(city==="")
    {
        msgcity.innerHTML="Please enter your city!";
        msgcity.style.display="block";
        valid=false;
    }
    else
        msgcity.style.display="none";
    if(phone==="")
    {
        msgphone.innerHTML="Please enter your phone number!";
        msgphone.style.display="block";
        valid=false;
    }
    else if(!regexphone.test(phone))
    {
        msgphone.innerHTML="Invalid phone number!";
        msgphone.style.display="block";
        valid=false;
    }
    else
        msgphone.style.display="none";
    if(email==="")
    {
        msgemail.innerHTML="Please enter your email!";
        msgemail.style.display="block";
        valid=false;
    }
    else if(!regexemail.test(email))
    {
        msgemail.innerHTML="Invalid email!";
        msgemail.style.display="block";
        valid=false;
    }
    else
        msgemail.style.display="none";
    const method=document.getElementsByName("checkout");
    const msg=document.getElementById("msg");
    let selected=false;
    for(let i=0;i<method.length;i++)
        if(method[i].checked)
        {
            selected=true;
            break;
        }
    if(!selected)
    {
        msg.innerHTML="Please select a payment method!";
        msg.style.display="block";
    }
    else
        msg.style.display="none";
    if(valid && selected)
    {
        checkouttotal();
        const subtotal=document.getElementById("subtotal").innerHTML.replace('$', '');
        const total=document.getElementById("total").innerHTML.replace('$', '');
        const boxcoupon=document.getElementById("coupontotal").innerHTML;
        const order={
            items: checkout,
            subtotal: subtotal,
            total: total,
            discount: boxcoupon,
            customer: {
                name: name,
                address: address,
                city: city,
                phone: phone,
                email: email
            }             
        };
        localStorage.setItem("mypayment",JSON.stringify(order));
        orders.push(order);
        localStorage.setItem("orders",JSON.stringify(orders))
        localStorage.removeItem("cart");
        window.location.href="./success.html";
    }
}

getcheckout();