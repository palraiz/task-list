//  Капелька глобальных переменных

let tasks = {'todo':[], delete:[]};
let text = '';
let iterator = 0;
let outTask = document.getElementById('taskReady');

/*
    Распечатывание нового списка на странице
 */

function printText(){

    text = '';
    // после устранения дыры, если такова была, распечатываем список
    for (let i = 0; i < tasks['todo'].length; i++) {
        var k=i+1;
        if (tasks['todo'][i].checked === false) //  Если задача не была почечена, то добавление в отображаемый список обычную задачу
            text += '<li idTask="'+i+'"> <span class = "taskText">' + k+ '. ' + tasks['todo'][i].title + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        if (tasks['todo'][i].checked === true) // Если задача была почечена, то добавление в отображаемый список зачеркнутую задачу
            text += '<li idTask="'+i+'"> <span class = "taskText checked">' + k+ '. ' + tasks['todo'][i].title + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }

    outTask.innerHTML = text;
}

/*
        Подгрузка с хранилища
 */

//  Если данных сохранненных нет, то заполняем по умолчанию и печатаем.
//  В ином случае достаем то что есть и тоже печатаем.
if (localStorage.getItem("Key") == null) {
    tasks = {'todo':[], 'delete':[]};
    printText();
}
else {
    tasks = JSON.parse(localStorage.getItem("Key"));
    printText();
}

/*
        Сохранение данных в хранилище
 */

$("#taskSave").click(function() {
    localStorage.setItem ("Key", JSON.stringify(tasks));
});

/*
    Очистка всего списка
 */

$("#taskClear").click(function() {
    tasks = {'todo':[], 'delete':[]};
    printText();
});

/*
        Добавление задачи по нажатию ввода
 */

$(document).keyup(function(e) {
    //  Добавляем в конец списка задач содержимое строки ввода
    //  Если была удалена какая-то задача, то занимается первая пустая ячейка
    if (e.key === "Enter" || e.keyCode === 13) {
        if ((tasks.todo.length - 1) == null) {
            let index = checkTask();
            tasks.todo[index] = ({
                title: $("input").val(),
                checked: false,
                delete: false
            });
        } else
        tasks.todo.push({
            title: $("input").val(),
            checked: false,
            delete: false
        });

        $("input").val('');
        printText();
    }
});

/*
    Удаление задачи по нажатию корзины
 */

$("body").on('click','.taskTrash',function() {
    let index = $(this).parent().attr('idTask');
    tasks.delete.push(tasks.todo[index]);
    console.log(tasks.todo);
    tasks.todo.splice(index, 1);
    console.log(tasks.todo);


    printText();
});

/*
    Зачеркивание задачи по нажатию на нее
 */

$("body").on('click','.taskText',function() {
//  Помечаем задачу как сделанную
    if(tasks.todo[$(this).parent().attr('idTask')].checked)
        tasks.todo[$(this).parent().attr('idTask')].checked = false;
    else
    tasks.todo[$(this).parent().attr('idTask')].checked = true;

    printText();
});

$("#taskDelete").click(function() {
//  Помечаем задачу как сделанную
    console.log(tasks.delete);
    let buffer = '<center>' + "Видалені задачі" + '<center>';

    if (iterator === 0) {
        for (let i = 0; i < tasks.delete.length; i++)
            buffer += '<li idTask="'+i+'"> <span class = "taskText">' + tasks['delete'][i].title + '</span> <span class = "taskTrashDel"> <i class = "fas fa-trash-alt"> </i> </span> </li>';

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

$("body").on('click','.taskTrashDel',function() {
    let index = $(this).parent().attr('idTask');
    console.log(tasks.delete);
    tasks.delete.splice(index, 1);
    console.log(tasks.delete);
    let buffer = '<center>' + "Видалені задачі" + '<center>';
    for (let i = 0; i < tasks.delete.length; i++)
        buffer += '<li idTask="'+i+'"> <span class = "taskText">' + tasks['delete'][i].title  + '</span> <span class = "taskTrashDel"> <i class = "fas fa-trash-alt"> </i> </span> </li>';

    outTask.innerHTML = buffer;

});