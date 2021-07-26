
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
        delet: false
    });
    text = '<li> <span class = "taskText">' + tasks[i].number + '. ' + tasks[i].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    outTask.innerHTML = text;
    text = '';

    localStorage.setItem ("Key", JSON.stringify(tasks[0]));
    localStorage.setItem ("Key", JSON.stringify(tasks[1]));
    localStorage.setItem ("Key", JSON.stringify(tasks));
    console.log(localStorage.getItem('Key'));
}
  else {
    tasks = JSON.parse(localStorage.getItem("Key"));
      if (tasks.length > 0) {
          for (let i = 1; i < tasks.length; i++) {
              text += '<li> <span class = "taskText">' + tasks[i].number + '. ' + tasks[i].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
          }
          outTask.innerHTML = text;
          text = '';
      } else {
          tasks[0] = [];
          text = '';
          outTask.innerHTML = text;
      }

}

/*
        Сохранение данных в хранилище
 */

$("#taskSave").click(function() {
    localStorage.setItem ("Key", JSON.stringify(tasks));
    console.log(localStorage.getItem('Key'));
});

/*
    Очистка всего списка
 */

$("#taskClear").click(function() {
    tasks = [];
    tasks[0] = [];
    tasks.push ({
        number: 1,
        task: 'Прокинутися',
        checked: false,
        delete: false
    });
    text = '<li> <span class = "taskText">' + tasks[1].number + '. ' + tasks[1].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    outTask.innerHTML = text;
    text = '';
});

/*
        Добавление задачи по нажатию ввода
 */

$(document).keyup(function(e) {
    //  Добавляем в конец списка задач содержимое строки ввода
    if (e.key === "Enter" || e.keyCode === 13) {
        //input.value() = ''; почему-то не работать
        tasks.push ({
            number: tasks.length,
            task: $("input").val(),
            checked: false,
            delet: false
        });

        for (let i = 0; i < tasks.length; i++) {
            console.log(tasks[i].number + '. ' + tasks[i].task);
        }

        //  Вывод на страницу обновленный список задач
        for (let i = 1; i < tasks.length; i++) {
            if (tasks[i].checked === false) //  Если задача не была почечена, то добавление в отображаемый список обычную задачу
                text += '<li> <span class = "taskText">' + tasks[i].number + '. ' + tasks[i].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
            else // Если задача не была почечена, то добавление в отображаемый список зачеркнутую задачу
                text += '<li> <span class = "taskText">' + tasks[i].number + '. ' + tasks[i].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        }
        outTask.innerHTML = text;
        text = '';
    }
});

/*
    Удаление задачи по нажатию корзины
 */

$(".taskTrash").click(function() {
    //  Считываем номер задачи
    console.log("delete");
    text = $(".taskTrash").parent().text();
    console.log(text);
    text = Number(text.split('.')[0]);
    console.log(text);

    //  Помечаем задачу как удаленную
    tasks[text].delet = true;
    console.log(tasks[text].delet);

    //  Проходимся по всему списку задач
    for (let i = 1; i < tasks.length; i++) {
        console.log(tasks[i].number + '. ' + tasks[i].task);
        //  Пока не наткнемся на удаленную задачу
        if (tasks[i].delet === true) {
            //  Перемещаем удаленную задачу в массив, что находится на нулевой ячейке листа задач
            tasks[0].push(tasks[i].task);
            console.log(tasks[0][0]);

            //  Перемещаем все задачи от i до tasks.length на позицию назад
            for (let j = i; j < tasks.length; j++)
                tasks[j] = tasks[j + 1];
        }

        //  Так как функция вызывается только после клику по корзине, то последний элемент списка можно смело удалять
        if (i === Number(tasks.length)-1)
            tasks.pop()
    }

    //  После перемещение удаленного элемента в "корзину", выводим все задачи
    for (let i = 1; i < tasks.length; i++) {
        if (tasks[i].checked === false)
            text += '<li> <span class = "taskText">' + tasks[i].number + '. ' + tasks[i].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
        else
            text += '<li> <span class = "checked">' + tasks[i].number + '. ' + tasks[i].task + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }
});

/*
    Зачеркивание задачи по нажатию на нее
 */

$(".taskText").click(function() {
    console.log("checked");
    $( "html" ).parents(".taskText");
});