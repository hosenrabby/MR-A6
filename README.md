# JavaScript Fundamentals Q&A

---

## 🏗️ Core Concepts

### 1. What is the difference between `null` and `undefined`?
While both represent the absence of a value, they are used differently:

* **`undefined`**: The default value of a variable that has been declared but not yet assigned a value. It essentially means "value not found."
* **`null`**: An assignment value that represents the **intentional** absence of any object value. It must be explicitly assigned.

| Feature | `undefined` | `null` |
| :--- | :--- | :--- |
| **Type** | `undefined` | `object` |
| **Origin** | System-defined | Programmer-defined |

---

### 2. `map()` vs. `forEach()`
Both are used to iterate over arrays, but they serve different purposes:

* **`map()`**: Transforms an array by applying a function to each element and **returns a new array**. It is non-mutating.
* **`forEach()`**: Executes a provided function once for each array element. It **returns `undefined`** and is used for side effects (e.g., logging or updating a database).

---

### 3. Loose Equality (`==`) vs. Strict Equality (`===`)
The difference lies in how types are handled:

* **`==` (Loose)**: Performs **Type Coercion**, meaning it tries to convert the values to a common type before comparing. 
    * `5 == "5"` results in `true`.
* **`===` (Strict)**: Compares both **value and type**. No conversion happens.
    * `5 === "5"` results in `false`.

---

### 4. Significance of `async/await` in API Fetching
`async/await` is a modern way to handle asynchronous operations, making them look and behave like synchronous code.

* **Readability**: Eliminates "Promise Chaining" (`.then()`) and "Callback Hell."
* **Error Handling**: Allows you to use standard `try/catch` blocks for cleaner debugging.
* **Efficiency**: The `await` keyword pauses function execution until the data is fetched, ensuring variables are populated before they are used.

---

### 5. JavaScript Scope
Scope determines where variables are accessible within your code:

* **Global Scope**: Variables declared outside any function. Accessible from anywhere in the script.
* **Function Scope**: Variables declared inside a function (using `var`, `let`, or `const`) are only accessible within that function.
* **Block Scope**: Variables declared with `let` or `const` inside a block `{ }` (like `if` or `for`) are restricted to that specific block.

---

## 🚀 How to Use
This repository is for educational purposes. You can:
1. Clone the repo: `git clone https://github.com/your-username/your-repo-name.git`
2. Use these snippets as a reference for your own projects or interview prep.

## 📝 License
This project is open-source and available under the MIT License.