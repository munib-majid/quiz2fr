$(function(){
    console.log("working");
    loadProducts();
    $(".products").on("click",".btn-danger", handleDelete);
    $(".products").on("click",".btn-warning", handleUpdate);
    $("#addbtn").on("click",addProduct);
    $("#updatesave").on("click",()=>{
    var id =  $("#updateid").val();
    var text = $("#updatename").val();
    var details = $("#updatedetails").val();
    $.ajax({
        url:"http://localhost:5000/product/"+id,
        data:{text,details},
        method:"PUT",
        sucess: ()=>{
            loadProducts();
        $("#updateModal").modal("hide");

        }

    });  
    })
});

function handleUpdate(){
    let productclicked =$(this);
    let parentdiv= productclicked.closest(".product");
    let id = parentdiv.attr("data-id");

    $.get("http://localhost:5000/product/"+id,(response) => {
        $("#updateid").val(response.data._id);
        $("#updatename").val(response.data.text);
        $("#updatedetails").val(response.data.details);
        $("#updateModal").modal("show");

    })

}

function handleDelete(){
    let productclicked =$(this);
    let parentdiv= productclicked.closest(".product");
    //this will get the parent div of the delete button on which it clicked with its class that is product
    let id = parentdiv.attr("data-id");
    //this is the attribute that we saved in our div from database 
    console.log(id);
    $.ajax({
        url:"http://localhost:5000/product/"+id,
        method:"DELETE",
        success: function() {
            loadProducts();
        } 
    });
}
function loadProducts() {
    $.ajax({
        url:"http://localhost:5000/product",
        method:"GET",
        error: function(response){
            let product =$(".products");
            product.html("<p>An Error has occurred.</p>");

        },
        success: function(response)
        {
             console.log(response);
            let product =$(".products");
            product.empty();
            for(var i=0; i<response.data.length; i++){
                var data=response.data[i];
                product.append(`<div class="product" data-id="${data._id}"><h3>${data.text}</h3><p><button class="btn btn-danger btn-sm m-2 float-right">DELETE</button><button data-toggle="modal" data-target="#updateModal" class="btn btn-warning btn-sm m-2 float-right">UPDATE</button>${data.details}</p></div>`);
                // product.append("<div><h3>"+data.text+"</h3><div>"+data.details+"</div></div>");
            }
        }
    })
}
function addProduct() {
    var text = $("#productname").val();
    var  details= $("#productdetails").val();
    $.ajax({
        url: "http://localhost:5000/product",
        method: "POST",
        data:{
            text,
            details
        },//this is a jason object
        // dataType: "json", 
        success: function(data) {
            console.log(data);
            loadProducts();

        }
    })
}