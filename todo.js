(function () {
  // Создаем и возращаем заголовок приложения
  function createAppTitle(title) {
    // Помещаем в переменную appTitle DOM элемент h2
    let appTitle = document.createElement("h2");
    // Выводим в HTML title
    appTitle.innerHTML = title;
    // Возращаем DOM элемент который создали,вернуть его обязательно - потом когда  будем инициировать приложение мы будем вызывать функции и возращаемое значение appTitle мы будем помещать внутрь HTML
    return appTitle;
  }
  // создаем и возращаем форму для создания дела
  function createTodoItemForm() {
    // Помешаем в переменные DOM элементы
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    // Выдаем классы по
    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    //  добавляем на input placeholder
    input.placeholder = "Добавить задачу";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    // добавляем текст в кнопку
    button.textContent = "Добавить задачу";

    // в buttonWrapper мы вкладываем button
    buttonWrapper.append(button);
    // в form мы вкладываем input
    form.append(input);
    // в form мы вкладываем buttonWrapper в котором уже есть button
    form.append(buttonWrapper);
    // P.S метод append добавляет элемент в конец иначе говоря если уже есть элемент в списке то с помощью append новый элемент будет в конце но т.к элемент в списке 1 то тут это не важно

    // Возращаем результат НО мы не можем вернуть только форму нам нужно отдельно получить доступ к input и button внутри формы Т.К при нажатие на кнопку мы должны создать новый элемент в списке и забрать при этом значение из input если мы вернем их отсюда то не будем иметь к ним доступа
    return {
      form,
      input,
      button,
    };
  }
  // создаем и возращаем список элементов
  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  // создаем дело
  function createTodoItem(name) {
    let item = document.createElement("li");

    // Кнопки у айтема
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    // добавляем стили
    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    // задаем item'y текст с переменной name
    item.textContent = name;
    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Завершить задачу";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить задачу";

    // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // возращаем объекты. Приложению нужен доступ к самому элементу и кнопкам чтобы обрабатывать сибытия нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  // обработчик событий -> когда загружается DOM дерево то выполняется функция
  document.addEventListener("DOMContentLoaded", function () {
    // переменная контейнер в которую все выводится
    let container = document.getElementById("todoApp");

    // переменные в которые записаны функции
    let todoAppTitle = createAppTitle("Список дел");
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    // выводят внутрь контейнера с помощью append (в конец листа)
    // Выводит DOM Элемент
    container.append(todoAppTitle);
    // выводят только form самого todoItemForm (Выводит ОБЪЕКТ)
    container.append(todoItemForm.form);
    // Выводит DOM Элемент
    container.append(todoList);

    // Создается событие submit при отправки формы нажимая на кнопку добавить задачу
    todoItemForm.form.addEventListener("submit", function (e) {
      // Эта строка необходимо чтобы браузер не перезагружался при отправке формы(нажатие кнопки которая отправляет форму)
      e.preventDefault();

      // если в todoItemForm в input'e в value (текст в input который можно редачить) ничего нету,то форма не отправляется,чтобы пользователь не мог создать пустую задачу(возращается через return)
      if (!todoItemForm.input.value) {
        return;
      }

      // createTodoItem(в скобках можно сказать name,который ввыше в функции тут выводится информация из todoItemForm input value из текста инпута с todoItemForm)
      let todoItem = createTodoItem(todoItemForm.input.value);

      // обработчики события на кнопки
      // При нажатие на doneButton меняется класс у item
      todoItem.doneButton.addEventListener("click", function () {
        todoItem.item.classList.toggle("list-group-item-success");
      });
      // при нажатие на deleteButton выходит confirm с сообщением 'Удалить задачу' и если человек жмет да то item удаляется
      todoItem.deleteButton.addEventListener("click", function () {
        if (confirm("Удалить задачу?")) {
          todoItem.item.remove();
        }
      });

      // создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      // После того как произошло событие ( при нажатие на кнопку добавилась новая задача) то в todoItemForm.input.value (текст в названии задачи) обнуляется чтобы пользователь не стирал этот текст вручную
      todoItemForm.input.value = "";
    });
  });
})();
