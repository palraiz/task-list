function printText(tasks) {
    let outTask = document.getElementById('taskReady');
    let text = '';

    for (let i = 0; i < tasks.title.length; i++) {

         if (tasks.check[i] === false)
             // Если задача не была почечена, то добавление в отображаемый список обычную задачу
            text += '<li idTask = "' + i + '"> <span class = "taskText">' + i + '. ' + tasks.title[i]
                + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';

         if (tasks.check[i] === true)
             // Если задача была почечена, то добавление в отображаемый список зачеркнутую задачу
             text += '<li idTask = "' + i + '"> <span class = "taskText checked">' + i + '. ' + tasks.title[i]
                 + '</span> <span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li>';
    }

    outTask.innerHTML = text;
}

/*
             ********************************************************************************
 */

$(document).keyup(function(e) {
    //  Добавляем в конец списка задач содержимое строки ввода
    if (e.key === "Enter" || e.keyCode === 13) {
        let newtask = $("input").val();
        $.ajax({
            url: 'data.php',
            type: 'POST',
            data: {data:newtask},
            dataType: 'json',
            success: function(res){
                console.log(res);

                tasks = res;
                printText(tasks);
            },
            error: function(){
                console.log('ERROR');
            }
        })
        // возвращение из пхп обьект из двух массивов let print =
    }})

$("body").on('click','.taskText',function() {
//  Помечаем задачу как сделанную
    if(tasks.todo[$(this).parent().attr('idTask')].checked)
        tasks.todo[$(this).parent().attr('idTask')].checked = false;
    else
        tasks.todo[$(this).parent().attr('idTask')].checked = true;

    printText();
});