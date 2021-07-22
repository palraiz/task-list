
//  Капелька глобальных переменных

let tasks = [];
let text = '';
let outTask = document.getElementById('taskReady');

/*
        Подгрузка с хранилища
 */

//  Если данных сохранненных нет, то заполняем по умолчанию и печатаем.
//  В ином случае достаем то что есть и тоже печатаем.
if (localStorage.getItem("Key") === undefined) {
    tasks[0] = [];
    tasks.push ({
        number: 1,
        task: 'Прокинутися',
        checked: false,
        delete: false
    });
        text = '<li> <span class = "taskText"> </span>' + tasks[1].number + '. ' + tasks[1].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    outTask.innerHTML = text;
    text = '';

    localStorage.setItem ("Key", JSON.stringify(tasks[0]));
    localStorage.setItem ("Key", JSON.stringify(tasks[1]));
    localStorage.setItem ("Key", JSON.stringify(tasks));
    console.log(localStorage.getItem('Key'));
}
  else {
      if (tasks.length > 0) {
          tasks = JSON.parse(localStorage.getItem("Key"));
          for (let i = 1; i < tasks.length; i++) {
              text += '<li> <span class = "taskText"> </span>' + tasks[i].number + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
          }
          outTask.innerHTML = text;
          text = '';
      } else tasks[0] = [];
}

/*
        Сохранение данных в хранилище
 */

$("#taskSave").click(function() {
    for (let i = 0; i < tasks.length; i++)
        localStorage.setItem ("Key", JSON.stringify(tasks[i]));
    localStorage.setItem ("Key", JSON.stringify(tasks));
    console.log(localStorage.getItem('Key'));
});

/*
    Удаление задач
 */

//

/*
    Очистка всего списка
 */

$("#taskClear").click(function() {
    tasks[0] = [];
    tasks.push ({
        number: 1,
        task: 'Прокинутися',
        checked: false,
        delete: false
    });
    text = '<li> <span class = "taskText"> </span>' + tasks[1].number + '. ' + tasks[1].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    outTask.innerHTML = tasks[1].text;
    text = '';

    localStorage.setItem ("Key", JSON.stringify(tasks[0]));
    localStorage.setItem ("Key", JSON.stringify(tasks[1]));
    localStorage.setItem ("Key", JSON.stringify(tasks));
    console.log(localStorage.getItem('Key'));
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
            //if (tasks[i].checked === false)
                text += '<li> <span class = "taskText"> </span>' + tasks[i].number + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
            //else
                //text += '<li> <span class = "taskText"> </span>' + tasks[i].number + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        }
        outTask.innerHTML = text;
        text = '';
    }
});