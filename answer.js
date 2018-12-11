// グローバル空間に変数や関数をセットしないために即時関数で閉じ込めている
(() => {
  // 入力したTodoタスクの一覧を保持する配列を定義する
  const todos = [];

  // HTMLのID値を使って以下のDOM要素を取得する
  //   - テキストボックス(input[type="text"])
  //   - 追加ボタン(button要素)
  //   - Todoリストを一覧表示するul要素
  const inputBox = document.getElementById('input-todo-box');
  const addButton = document.getElementById('add-button');
  const listContainer = document.getElementById('todo-list');

  //「追加」ボタンがクリックされたときの処理を実装する
  //   - テキストボックスに入力されたテキストをTodoリスト一覧に追加する
  //   - テキストボックスの中を空にする
  addButton.addEventListener('click', (event) => {
    const todo = inputBox.value;
    inputBox.value = '';

    if (todo) {
      todos.push(todo);
      showTodos();
    }
  });

  // 「todos」の中身を一覧表示する
  //    - ul要素にli要素を追加して、li要素内にtodoタスクの内容を表示する
  //    - li要素内に削除ボタンを配置して、削除ボタンをクリックしたら対応するタスクを削除する
  function showTodos() {
    // ul要素内を中身を一旦空っぽにして、現在のTodoリスト一覧を再度表示する
    while(listContainer.firstChild) {
      listContainer.removeChild( listContainer.firstChild );
    }

    // todosの情報を使ってTodoリストを作成
    todos.forEach((todo, index) => {
      const todoItem = document.createElement('li');
      const taskNumber = index + 1;

      // テキストをセットする
      todoItem.textContent = `${taskNumber} : ${todo}`;
      listContainer.appendChild(todoItem);

      // 新規作成したli要素に削除ボタンを付ける
      const deleteButton = document.createElement('button');
      deleteButton.textContent = '削除';
      deleteButton.addEventListener('click', (event) => {
        deleteTodo(index);
      });
      todoItem.appendChild(deleteButton);
    });
  }

  // Todo情報を表すli要素(showTodo関数で作成される要素)の中にある削除ボタンをクリックしたら実行される。
  //   - todosから対応するtodo情報を削除する
  //   - 引数はindexを受け取る(インデックス番号)
  //   - 削除後はshowTodosを実行して、Todoリストを整理する
  function deleteTodo(index) {
    todos.splice(index, 1);
    showTodos();
  }
})();