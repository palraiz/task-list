

let outTask = document.getElementById('taskReady');
let tasks = {todo:[], delet:[]};

function printText(){
    let text = '';
    // после устранения дыры, если такова была, распечатываем список
    if (iterator === 0) {
    for (let i = 0; i < tasks.todo.length; i++) {
        if (tasks.todo[i].checked == false)
        //  Если задача не была почечена, то добавление в отображаемый список обычную задачу
            text += '<li idTask="'+i+'"> <span class = "taskText">' + i +'. ' + tasks['todo'][i].title +
                '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        if (tasks.todo[i].checked == true)
        // Если задача была почечена, то добавление в отображаемый список зачеркнутую задачу
            text += '<li idTask="'+i+'"> <span class = "taskText checked">' + i +'. ' + tasks.todo[i].title +
                '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }}
    if (iterator === 1) {
        text = '<center>' + "Видалені задачі" + '<center>';
        for (let i = 0; i < tasks.delet.length; i++)
            text += '<li idTask="'+i+'"> <span class = "deletText">' + tasks.delet[i].title +
                '</span> <span class = "taskTrashDel"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }

    outTask.innerHTML = text;
}
function PHPtoJS(res) {
    for (let i = 0; i < res[0].length; i++) {
        if (res[0][i].delet == 0) {
            tasks.todo.push({
                id: res[0][i].id,
                title: res[0][i].title,
                checked: res[0][i].checked,
                delet: res[0][i].delet
            });
        } else {
            tasks.delet.push({
                id: res[0][i].id,
                title: res[0][i].title,
                checked: res[0][i].checked,
                delet: res[0][i].delet
            });
        }
    }
    console.log(tasks);
    printText()
}

$.ajax({
    url: 'data.php?action=getAll',
    type: 'GET',
    success: function(res) {
        res = JSON.parse(res);
        console.log("getAll OK");
        if(res[0]) PHPtoJS(res);
    },
    error: function() {console.log('getAll ERROR')}
})

//  Капелька глобальных переменных


let iterator = 0;
let id = 0;


/*
    printText Распечатывание нового списка на странице
    taskClear Удаление всего списка
    taskDelete Показать все удаленные задачи
 */


$("#taskClear").click(function() {

    tasks = {'todo':[], 'delet':[]};

    $.ajax({
        url: 'data.php?action=clearAll',
        type: 'GET',
        success: function() {console.log("clearAll OK")},
        error: function() {console.log('clearAll ERROR')}
    })

    id = 0;
    printText();
});

$("#taskDelete").click(function() {
//  Помечаем задачу как сделанную
    if (iterator === 0) {
        iterator = 1;
        printText();
        return;
    }
    if (iterator === 1) {
        iterator = 0;
        printText();
    }
});

/*
    keyup Добавление новой задачи
    taskTrash Удаление одной задачи
    taskTrashDel Окончательное удаление задачи
 */

$(document).keyup(function(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        id++;
        //  Добавляем в конец списка задач содержимое строки ввода
        tasks.todo.push({
            id: id,
            title: $("input").val(),
            checked: 0,
            delet: 0
        });

        $.ajax({
            url: 'data.php?action=addNewTask',
            type: 'POST',
            data: {data: $("input").val()},
            dataType: 'json',
            success: function (res) {console.log(res);},
            error: function () {console.log('ERROR');}
        })

        $("input").val('');
        printText();
    }
});

$("body").on('click','.taskTrash',function() {
    let index = $(this).parent().attr('idTask');
    $.ajax({
        url: 'data.php?action=deletTask',
        type: 'POST',
        data: {data: tasks.todo[index].id},
        dataType: 'json',
        success: function (res) {console.log(res);},
        error: function () {console.log('ERROR');}
    })

    tasks.delet.push(tasks.todo[index]);
    tasks.todo.splice(index, 1);
    printText();
});

$("body").on('click','.taskText',function() {
    let index = $(this).parent().attr('idTask');
//  Помечаем задачу как сделанную
    if(tasks.todo[index].checked)
        tasks.todo[index].checked = 0;
    else
        tasks.todo[index].checked = 1;

    $.ajax({
        url: 'data.php?action=checkedTask',
        type: 'POST',
        data: {data: tasks.todo[index].id},
        dataType: 'json',
        success: function (res) {console.log(res);},
        error: function () {console.log('ERROR');}
    })

    printText();
});

$("body").on('click','.deletText',function() {
    let index = $(this).parent().attr('idTask');
    $.ajax({
        url: 'data.php?action=deletTask',
        type: 'POST',
        data: {data: tasks.delet[index].id},
        dataType: 'json',
        success: function (res) {console.log(res);},
        error: function () {console.log('ERROR');}
    })

//  Помечаем задачу как восстановленную
    tasks.todo.push(tasks.delet[index]);
    tasks.delet[index].delet = 0;
    tasks.delet.splice(index, 1);

    printText();
});

$("body").on('click','.taskTrashDel',function() {
    let index = $(this).parent().attr('idTask');
    $.ajax({
        url: 'data.php?action=redelTask',
        type: 'POST',
        data: {data: tasks.delet[index].id},
        dataType: 'json',
        success: function (res) {console.log(res);},
        error: function () {console.log('ERROR');}
    })

    tasks.delet.splice(index, 1);
    printText();
});