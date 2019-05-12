/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_css__WEBPACK_IMPORTED_MODULE_0__);\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar SnakeGame =\n/*#__PURE__*/\nfunction () {\n  function SnakeGame() {\n    _classCallCheck(this, SnakeGame);\n\n    this.gridSize = 10;\n    this.score = 0;\n    this.snake = new Snake();\n    this.food = new Food();\n    this.snakeTimer; // таймер\n\n    this.gameOver = false;\n  }\n\n  _createClass(SnakeGame, [{\n    key: \"renderGrid\",\n    value: function renderGrid() {\n      var field = document.getElementById(\"field\");\n\n      for (var i = 0; i < this.gridSize; i++) {\n        var newLine = document.createElement(\"div\");\n        newLine.classList.add(\"row\");\n        field.appendChild(newLine);\n\n        for (var k = 0; k < this.gridSize; k++) {\n          var newCell = document.createElement(\"div\");\n          newCell.classList.add(\"cell\");\n          newCell.setAttribute(\"data-coord\", i + \",\" + k);\n          newLine.appendChild(newCell);\n        }\n      }\n    }\n  }, {\n    key: \"addScore\",\n    value: function addScore() {\n      this.score += 1;\n      document.getElementById(\"score\").innerHTML = this.score;\n    }\n  }, {\n    key: \"startGame\",\n    value: function startGame() {\n      // сброс геймовера\n      this.gameOver = false;\n      clearTimeout(this.snakeTimer);\n      document.getElementById(\"game-over\").innerHTML = \"\"; // очистить счет\n\n      this.score = 0;\n      document.getElementById(\"score\").innerHTML = this.score; // отрендерить змею и еду\n\n      this.snake.setInitialParameters();\n      this.snake.render();\n      this.food.render(this); // обработчик событий стрелок\n\n      document.addEventListener(\"keydown\", function (event) {\n        this.snake.setDirection(event.keyCode);\n      }.bind(this)); // таймер\n\n      this.launchTimer();\n    }\n  }, {\n    key: \"launchTimer\",\n    value: function launchTimer() {\n      this.snakeTimer = setTimeout(function () {\n        this.snake.move(this);\n\n        if (!this.gameOver) {\n          this.launchTimer();\n        }\n      }.bind(this), this.snake.speed);\n    }\n  }, {\n    key: \"stopGame\",\n    value: function stopGame() {\n      this.gameOver = true;\n      clearTimeout(this.snakeTimer);\n      document.getElementById(\"game-over\").innerHTML = \"Game over\";\n    }\n  }]);\n\n  return SnakeGame;\n}();\n\nvar Snake =\n/*#__PURE__*/\nfunction () {\n  function Snake() {\n    _classCallCheck(this, Snake);\n\n    this.snakeBody = [];\n    this.direction = \"r\";\n    this.speed = 0;\n    this.allowedToChangeDirection = true;\n  }\n\n  _createClass(Snake, [{\n    key: \"setInitialParameters\",\n    value: function setInitialParameters() {\n      this.snakeBody = [[0, 2], [0, 1], [0, 0]];\n      this.direction = \"r\";\n      this.speed = 1000;\n    }\n  }, {\n    key: \"setDirection\",\n    value: function setDirection(keyCode) {\n      if (this.allowedToChangeDirection) {\n        switch (keyCode) {\n          case 38:\n            this.direction = this.direction == \"d\" ? \"d\" : \"u\";\n            break;\n\n          case 40:\n            this.direction = this.direction == \"u\" ? \"u\" : \"d\";\n            break;\n\n          case 39:\n            this.direction = this.direction == \"l\" ? \"l\" : \"r\";\n            break;\n\n          case 37:\n            this.direction = this.direction == \"r\" ? \"r\" : \"l\";\n            break;\n        }\n\n        this.allowedToChangeDirection = false;\n      }\n    }\n  }, {\n    key: \"move\",\n    value: function move(context) {\n      switch (this.direction) {\n        case \"r\":\n          this.updateSnakePosition(0, 1, context);\n          break;\n\n        case \"l\":\n          this.updateSnakePosition(0, -1, context);\n          break;\n\n        case \"u\":\n          this.updateSnakePosition(-1, 0, context);\n          break;\n\n        case \"d\":\n          this.updateSnakePosition(1, 0, context);\n          break;\n      }\n    }\n  }, {\n    key: \"addSpeed\",\n    value: function addSpeed() {\n      if (this.speed > 200) {\n        this.speed -= 200;\n      }\n    }\n  }, {\n    key: \"updateSnakePosition\",\n    value: function updateSnakePosition(x, y, context) {\n      var snakeHead = [this.snakeBody[0][0] + x, this.snakeBody[0][1] + y];\n      this.snakeBody.unshift(snakeHead); // если змейка достигла границ или саму себя\n\n      if (this.reachedBorders(context) || this.reachedItself()) {\n        context.stopGame(); // если змейка съела еду\n      } else if (this.reachedFood(context)) {\n        context.addScore();\n        this.addSpeed();\n        this.render();\n        context.food.render(context); // обычный шаг\n      } else {\n        this.snakeBody.pop();\n        this.render();\n      }\n\n      this.allowedToChangeDirection = true;\n    }\n  }, {\n    key: \"reachedBorders\",\n    value: function reachedBorders(context) {\n      return this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= context.gridSize || this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >= context.gridSize;\n    }\n  }, {\n    key: \"reachedItself\",\n    value: function reachedItself() {\n      var _this = this;\n\n      return this.snakeBody.slice(1).some(function (el) {\n        return el[0] == _this.snakeBody[0][0] && el[1] == _this.snakeBody[0][1];\n      });\n    }\n  }, {\n    key: \"reachedFood\",\n    value: function reachedFood(context) {\n      return this.snakeBody[0][0] == context.food.coords[0] && this.snakeBody[0][1] == context.food.coords[1];\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      document.querySelectorAll(\".cell\").forEach(function (cell) {\n        cell.classList.remove(\"snake\");\n      });\n      this.snakeBody.forEach(function (bodyPiece) {\n        var snakeCell = document.querySelector(\"[data-coord=\\\"\".concat(bodyPiece[0], \",\").concat(bodyPiece[1], \"\\\"]\"));\n        snakeCell.classList.add(\"snake\");\n      });\n    }\n  }]);\n\n  return Snake;\n}();\n\nvar Food =\n/*#__PURE__*/\nfunction () {\n  function Food() {\n    _classCallCheck(this, Food);\n\n    this.coords = [];\n  }\n\n  _createClass(Food, [{\n    key: \"defineCoords\",\n    value: function defineCoords(context) {\n      this.coords = [Math.floor(Math.random() * context.gridSize), Math.floor(Math.random() * context.gridSize)];\n\n      if (this.cellIsTaken(context)) {\n        this.defineCoords(context);\n      }\n    }\n  }, {\n    key: \"cellIsTaken\",\n    value: function cellIsTaken(context) {\n      var _this2 = this;\n\n      return context.snake.snakeBody.some(function (el) {\n        return el[0] == _this2.coords[0] && el[1] == _this2.coords[1];\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render(context) {\n      this.defineCoords(context);\n\n      if (document.querySelector(\".food\")) {\n        document.querySelector(\".food\").classList.remove(\"food\");\n      }\n\n      var foodCell = document.querySelector(\"[data-coord=\\\"\".concat(this.coords[0], \",\").concat(this.coords[1], \"\\\"]\"));\n      foodCell.classList.add(\"food\");\n    }\n  }]);\n\n  return Food;\n}();\n\nvar game = new SnakeGame();\ngame.renderGrid();\ndocument.getElementById(\"play\").addEventListener(\"click\", function () {\n  return game.startGame();\n});\n\n//# sourceURL=webpack:///./src/script.js?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/style.css?");

/***/ })

/******/ });