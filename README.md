<h1 align="center">Dota Search Frontend</h1>
<p align="center">
  Made with <code>HTML</code>, <code>CSS</code>, <code>TypeScript</code>, <code>ReactJS</code>, <code>MaterialUI</code>
  <br>
  Bootstrapped with <code>Webpack</code>
</p>

<p align="center">
  <a href="../../commits"><img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Truenya/dota-search-front"></a>
  <img src="https://img.shields.io/github/repo-size/Truenya/dota-search-front" />
</p>

## ℹ️ Зачем нужен проект?

Игроки в Dota 2 часто ищут команды. Обычно они это делают в VK, чатах Discord, Telegram.

На это уходит много времени:

- Приходится читать каждое сообщение
- Нужно найти сообщение, которое подходит под твою роль
- Человеку может быть нужна команда, приходится искать сообщение от людей, которые набирают в команды

На поиск игроков зачастую уходит от 15 мин до 2 часов.

Данный проект решает эти проблемы:

- Помогает находить людей с нужным MMR
- Помогает найти команду или членов команды
- Помогает найти людей с подходящей ролью
- Экономит время на поиске, т.к. все в одном месте и не приходится просматривать кучу площадок

## 🔮 Планы развития

- Отрефакторить фронт. Переехать на MaterialUI, поправить отображение на мобилках, перевести web socket'ы на RTK Query
- Хостинг. Купить доменное имя, более производительное железо
- Добавить авторизацию
- Добавить чат между пользователями. Чтобы им проще было связаться друг с другом для совместной игры
- Сделать для других игр аналогичный сервис

## 🔗 Полезные ссылки

- [Список задач в Trello](https://trello.com/invite/b/2bPKVLwi/ATTI99f6ff589635729f9c754bbbaf2e51a1C19BA60C/dotasearch). Бэклог задач, над которыми участники сейчас работают

## 🗺 Архитектура проекта и стек технологий

Проект состоит из фронта, бэка и БД. Фронт общается с бэком через вебсокеты.

<table>
  <tr>
    <th>Сервис</th>
    <th>Технологический стек</th>
    <th>Комментарий</th>
  </tr>
  <tr>
    <th>Frontend</th>
    <td>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>TypeScript</li>
        <li>ReactJS</li>
        <li>MaterialUI</li>
        <li>Websocket</li>
      </ul>
    </td>
    <td></td>
  </tr>
  <tr>
    <th>Backend</th>
    <td>Go</td>
    <td>Использует кэшированную шардированную мапу</td>
  </tr>
  <tr>
    <th>Database</th>
    <td>
      PostgreSQL
    </td>
    <td></td>
  </tr>
</table>

### Общая логика работы

- Запускается веб-приложение
- В конструкторе на фронте инициализируется сокет
- Бэк пишет при подключении сразу все, что у него есть
- Фронт при приходе данных с веб-сокета рисует это все на фронт
- Бэк хранит все данные в кэше, т.е. в оперативной памяти
- Периодически бэк копирует данные из кэша в БД

## 👤 Команда

<table>
  <tr>
    <th>Участник</th>
    <th>Роль</th>
    <th>Описание</th>
  </tr>
  <tr></tr>
  <tr>
    <td><code>Александр Крылов</code></td>
    <td>
        <p><code>Product Owner</code></p>
        <p><code>Team Lead</code></p>
        <p><code>Backend Developer</code></p>
        <p><code>Frontend Developer</code></p>
    </td>
    <td>
      <ul>
        <li>Автор проекта</li>
        <li>Можно обращаться по любым вопросам</li>
        <li>Написал весь бэк и первоначальный фронт</li>
      </ul>
    </td>
  </tr>
  <tr></tr>
  <tr>
    <td><code>Виталий</code></td>
    <td>
      <p><code>Frontend Developer</code></p>
    </td>
    <td></td>
  </tr>
  <tr></tr>
  <tr>
    <td><code>Никита</code></td>
    <td>
      <p><code>Frontend Developer</code></p>
    </td>
    <td></td>
  </tr>
  <tr></tr>
  <tr>
    <td><code>Александр Горбунов</code></td>
    <td>
      <p><code>Frontend Developer</code></p>
    </td>
    <td></td>
  </tr>
</table>

## ❓ Ответы на вопросы

**Как собрать проект?**<br>
Запустите команды из терминала:

- `npm install` - Установит все пакеты
- `npm start` - Запустит сервис в development режиме, откроет его в новой вкладке в браузере

Убедитесь предварительно, что у вас установлен [NodeJS](https://nodejs.org/en)

**Почему на Webpack?**<br>
Сначала использовали `create-react-app`, но проект собирался очень долго. Перешел на Webpack с SWC, т.к. это популярные решения. В итоге, собираться стало в разы быстрее

**Почему MaterialUI?**<br>
Чтобы не заморачиваться со стилями. Все работает хорошо из коробки. До этого был Bootstrap, но MaterialUI кажется более надежным решением.

## 💡 Как сделать вклад в проект?

- Изучите задачи в Trello (см. выше в полезных ссылках)
- Сделайте fork от репозитория (Инструкция: https://docs.github.com/ru/get-started/quickstart/fork-a-repo)
- Внесите изменения, запушьте их в свой форк
- В основном репозитории создайте Pull request (Инструкция на английском: https://www.youtube.com/watch?v=a_FLqX3vGR4)
- Александр Крылов проревьюит код и если все ок, замерджит изменения
