
//  Капелька глобальных переменных

let tasks = [];
let text = '';
let outTask = document.getElementById('taskReady');

/*
        Подгрузка с хранилища
 */

//  Если данных сохранненных нет, то заполняем по умолчанию и печатаем.
//  В ином случае достаем то что есть и тоже печатаем.
if (localStorage.removeItem("Key") === undefined) {
    tasks[0] = [1, 2];
    tasks.push ({
        number: 1,
        task: 'Прокинутися',
        checked: false,
        delete: false
    });
        text = '<li> <span class = "taskText"> </span>' + tasks[1].number + '. ' + tasks[1].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    outTask.innerHTML = text;
    text = '';
    localStorage.setItem('Key', tasks);
}
  else {
    tasks = localStorage.getItem("Key");
    for (let i = 1; i < tasks.length; i++  ) {
        text += '<li> <span class = "taskText"> </span>' + tasks[i].number + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }
    outTask.innerHTML = text;
    text = '';
}

/*
        Сохранение данных в хранилище
 */

$("#taskSave").click(function() {
    localStorage.setItem('Key', tasks);
});

/*
    Очистка всего списка
 */

$("#taskClear").click(function() {
    tasks = [];
    tasks [0] = [];
    localStorage.setItem('Key', tasks);
    outTask.innerHTML = tasks;
    text = '';
});

/*
        Добавление задачи по нажатию ввода
 */

$(document).keyup(function(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        //input.value() = ''; почему-то не работать
        tasks.push ({
            number: tasks.length,
            task: $("input").val(),
            checked: false,
            delete: false
        });

        for (let i = 0; i < tasks.length; i++) {
            console.log(tasks[i].number + '. ' + tasks[i].task);
        }

        for (let i = 1; i < tasks.length; i++) {
                text += '<li> <span class = "taskText"> </span>' + tasks[i].number + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        }
        outTask.innerHTML = text;
        text = '';
    }
});