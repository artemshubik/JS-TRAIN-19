// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

// Створюємо об'єкт Book

const bookPrototype = {
  title: "Загальна Книга",
  author: "Анонім",
  pages: 0,
  read: function () {
    console.log("Ви читаєте " + this.title + " від " + this.author);
  },
};

const Book = Object.create(bookPrototype);

console.log("Завдання: 1 ==============================");

// Виводимо в консоль Об'єкт: Book

// Виводимо в консоль прототип Об'єкту: Book

// Викликаємо функцію read об'єкту Book

console.log(bookPrototype);
console.log(Object.getPrototypeOf(Book) === bookPrototype);

// Виклик функції read об'єкту Book
Book.read();

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

const BookPrototype = {
  title: "Загальна Книга",
  author: "Анонім",
  pages: 0,
  read: function () {
    console.log("Ви читаєте " + this.title + " від " + this.author);
  },
};
// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

const Novel = Object.create(BookPrototype);

// Додаємо властивість genre
Novel.genre = "Новела";

console.log("Завдання: 2 ==============================");

// Виводимо в консоль Об'єкт: Novel

console.log(Novel);

// Виводимо в консоль прототип Об'єкту: Novel

console.log(Object.getPrototypeOf(Novel));

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

const book1Prototype = {
  title: "Загальна Книга",
  author: "Анонім",
  pages: 0,
  read: function () {
    console.log("Ви читаєте " + this.title + " від " + this.author);
  },
};

const Novel1 = Object.create(bookPrototype);
Novel.genre = "Новела";

// Створюємо об'єкт Biography

const Biography = Object.create(bookPrototype);
Biography.title = "Загальна Біографія";
Biography.author = "Біограф";
Biography.pages = 200;

// Змінемо прототип об'єкта Biography на Novel

Object.setPrototypeOf(Biography, Novel);

console.log("Завдання: 3 ==============================");
// Виводимо в консоль Об'єкт: Biography

console.log(Biography);

// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль

console.log(Object.getPrototypeOf(Biography) === Novel);

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

const BookPrototype2 = {
  title: "Загальна Книга",
  author: "Анонім",
  pages: 0,
  read: function () {
    console.log("Ви читаєте " + this.title + " від " + this.author);
  },
};

// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book

const ScienceBook = Object.create(BookPrototype);

// Додаємо властивість 'info' за допомогою Object.defineProperty

Object.defineProperty(ScienceBook, "info", {
  value: "написана в 1915 році",
  writable: false,
  configurable: false,
});

// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),

Object.defineProperty(ScienceBook, "setInfo", {
  set: function (value) {
    this.info = value;
  },
});

// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined

// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>

Object.defineProperty(ScienceBook, "getInfo", {
  get: function () {
    return "Про книгу " + this.title + ": " + this.info;
  },
});

// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

ScienceBook.title = "Фізика 101";
ScienceBook.author = "Альберт Ейнштейн";

console.log("Завдання: 4 ==============================");
// Виводимо в консоль властивість info

// Виводимо в консоль налаштування властивости info
console.log("Про книгу Физіка 101 :", ScienceBook.info);
console.log(
  "Налаштування властивості info:",
  Object.getOwnPropertyDescriptor(ScienceBook, "info")
);

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

//Створюємо Textbook та наслідуємо властивості з ScienceBook

const Textbook = Object.create(ScienceBook);

// Перевизначаємо метод read(), відповідно з дописом вище

Textbook.read = function () {
  console.log(
    'Ви читаєте підручник "' +
      this.title +
      '" від ' +
      this.author +
      ". " +
      this.info
  );
};

// Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |

Textbook.title = "Фізика у Вищій Школі";
Textbook.author = "Дж. Д. Джонс";

console.log("Завдання: 5 ==============================");
// Викликаємо функцію read об'єкту Textbook

Textbook.read();

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

// Створюємо об'єкт Media

const Media = {
  format: "Загальний Формат",
  length: 0,
  play: function () {
    console.log(
      `Зараз відтворюється медіа у форматі ${this.format} з тривалістю ${this.length} секунд`
    );
  },
};

/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */

// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media

const Song = Object.create(Media);

// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

Song.artist = "Загальний Виконавець";
Song.title = "Загальна Пісня";

console.log("Завдання: 6 ==============================");
// Викликаємо функцію play об'єкту Song

Song.play();
