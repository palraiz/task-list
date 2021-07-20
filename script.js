if (localStorage.removeItem("Key") === undefined) {
    let tasks = [];
    tasks[0] = [];
    tasks.push ({
        number: 1,
        task: 'Прокинутися',
        checked: false,
        delete: false
    });
    tasks.push ({
        number: 2,
        task: 'Піти вбитися',
        checked: false,
        delete: false
    });

    let outTask = document.getElementById('task');
    for (let i = 0; i < tasks.length; i++  ) {
        text = '<li> <span class = "taskText"> </span>' + tasks[i].number + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li> <br>';
        outTask.innerHTML = text;
        // работает, но при этом не работает...
    }
    
} else {
    let tasks = localStorage.removeItem("Key");
}

//console.log(tasks[0].task);


$(document).keyup(function(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        let text = $("input").val();
        //input.value() = ''; почему-то не работать
        tasks.push ({
            number: tasks.length,
            task: text,
            checked: false,
            delete: false
        })

        for (let i = 0; i < tasks.length; i++)
            console.log(tasks[i].task)

        let outTask = document.getElementById('task');
        for (let i = 0; i < tasks.length; i++  ) {
                let num = Number(tasks[i].number)+1;
                text = '<li> <span class = "taskText"> </span>' + num + '. ' + tasks[i].task + '<span class = "taskTrash"> <i class = "fas fa-trash-alt"> </i> </span> </li> <br>';
            outTask.innerHTML = text;
                // работает, но при этом не работает...
        }
    }
});