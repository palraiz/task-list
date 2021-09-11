

$.ajax({
    url: 'data.php?action=getAll',
    type: 'GET',
    success: function() {console.log("getAll OK")},
    error: function() {console.log('getAll ERROR')}
})

//  Капелька глобальных переменных

let tasks = {todo:[], delet:[]};
let text = '';
let iterator = 0;
let id = 0;
let outTask = document.getElementById('taskReady');

/*
    printText Распечатывание нового списка на странице
    taskClear Удаление всего списка
    taskDelete Показать все удаленные задачи
 */

function printText(){

    text = '';
    // после устранения дыры, если такова была, распечатываем список
    for (let i = 0; i < tasks.todo.length; i++) {
        if (tasks.todo[i].checked === false)
            //  Если задача не была почечена, то добавление в отображаемый список обычную задачу
            text += '<li idTask="'+i+'"> <span class = "taskText">' + i +'. ' + tasks['todo'][i].title +
                '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        if (tasks.todo[i].checked === true)
            // Если задача была почечена, то добавление в отображаемый список зачеркнутую задачу
            text += '<li idTask="'+i+'"> <span class = "taskText checked">' + i +'. ' + tasks.todo[i].title +
                '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }

    outTask.innerHTML = text;
}

$("#taskClear").click(function() {

    tasks = {'todo':[], 'delete':[]};

    $.ajax({
        url: 'data.php?action=clearAll',
        type: 'GET',
        success: function() {console.log("clearAll OK")},
        error: function() {console.log('clearAll ERROR')}
    })
    printText();
});

$("#taskDelete").click(function() {
//  Помечаем задачу как сделанную
    console.log(tasks.delet);
    let buffer = '<center>' + "Видалені задачі" + '<center>';

    if (iterator === 0) {
        for (let i = 0; i < tasks.delet.length; i++)
            buffer += '<li idTask="'+i+'"> <span class = "taskText">' + tasks.delet[i].title +
                '</span> <span class = "taskTrashDel"> <i class = "fas fa-trash-alt"> </i> </span> </li>';

        outTask.innerHTML = buffer;
        iterator = 1;
        return;
    }
    if (iterator === 1) {
        printText();
        iterator = 0;
        buffer = '<center>' + "Видалені задачі" + '<center>';
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
            checked: false,
            delet: false
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
        tasks.todo[index].checked = false;
    else
        tasks.todo[index].checked = true;

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
    let buffer = '<center>' + "Видалені задачі" + '<center>';
    for (let i = 0; i < tasks.delet.length; i++)
        buffer += '<li idTask="'+i+'"> <span class = "taskText">' + tasks.delet[i].title  +
            '</span> <span class = "taskTrashDel"> <i class = "fas fa-trash-alt"> </i> </span> </li>';

    outTask.innerHTML = buffer;

});