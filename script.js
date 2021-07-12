//selecting dom elements for manipulation
var input = document.querySelector("input[type = 'taskInput']");
var ul = document.querySelector("ul");
var container = document.querySelector("div");
var lists = document.querySelectorAll("li");
var spans = document.getElementsByTagName("span");
var pencil = document.querySelector("#pencil");
var saveBtn = document.querySelector(".taskSave");
var clearBtn = document.querySelector(".taskClear");
var tipsBtn = document.querySelector(".tipBtn");
var closeBtn = document.querySelector(".closeBtn");
var overlay = document.getElementById("overlay")


//function to delete task if delete span is clicked.
function deleteTask(){
    for(let span of spans){
        span.addEventListener ("click",function (){
            span.parentElement.remove();
            event.stopPropagation();
        });
    }
}

//function to load task if list is found in local storage.
function loadTask(){
    if(localStorage.getItem('List')){
        ul.innerHTML = localStorage.getItem('List');
        deleteTask();
    }
}

//event listener for input to add new task to the list.
input.addEventListener("keypress",function(keyPressed){
    if(keyPressed.which === 13){
        //creating lists and span when enter is clicked
        var li = document.createElement("li");
        var spanElement = document.createElement("span");
        var icon = document.createElement("i");

        var newTask = this.value;
        this.value = " " ;

        icon.classList.add('fas', 'fa-trash-alt');
        spanElement.append(icon);
        ul.appendChild(li).append(spanElement,newTask);

        deleteTask();

    }

});

// event listener to linethrough list if clicked
ul.addEventListener('click', function(ev) {
        if (ev.target.tagName === 'li') {
            ev.target.classList.toggle('checked');
        }
    },false
);

//hide input box,when pencil icon is clicked
pencil.addEventListener('click', function(){
    input.classList.toggle('display');
});



//save todolist state so user can access it later
saveBtn.addEventListener('click',function(){
    localStorage.setItem('List',ul.innerHTML );

});

//clear all task when clear button is clicked
clearBtn.addEventListener('click', function(){
    ul.innerHTML= "";
    localStorage.removeItem('List',ul.innerHTML );
});

//display overlay when tips btn is clicked
tipsBtn.addEventListener("click",function(){
    overlay.style.height = "100%";
});

//close overlay when close btn is clicked
closeBtn.addEventListener("click",function(e){
    e.preventDefault;
    overlay.style.height = "0";

})

//delete listList
deleteTask();

//load task
loadTask();