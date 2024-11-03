import {createEffect, createEvent, createStore, sample} from "effector";

/**
 * Максимум баллов в банке
 */
export const bankMax = getRandomInt()

/**
 * Время на вопрос
 * */
const timeToQuestion = 3000

let timerId

/**
 * Добавить баллы в банк
 * */
export const eventScorePlus = createEvent()
/**
 * Забрать баллы из банка
 * */
export const eventScoreReset = createEvent()
/**
 * Установить доступность кликабельности кнопок
 * */
const eventSetClickable = createEvent()
/**
 * Начать игру
 * */
export const eventStartGame = createEvent()
/**
 * Получен ответ на вопрос
 * */
export const eventGetAnswer = createEvent()
/**
 * Получить следующий вопрос
 * */
const eventNextQuestion = createEvent()
/**
 * Остановить таймер
 * */
const eventStopTimer = createEvent()
/**
 * Время вышло
 * */
const eventTimeOver = createEvent()

/**
 * Количество баллов в банке
 * */
export const $storeScoreBank = createStore(0)
    .on(eventScorePlus, (state, value) => state + value)
    .reset(eventScoreReset)
/**
 * Стоимость вопроса
 * */
export const $storeQuestionPrice = createStore(0)
    .on(eventNextQuestion, (state, value) => value)
/**
 * Состояние доступности кликабельности кнопок
 * */
export const $storeIsClickable = createStore(false)
    .on(eventSetClickable, (state, value) => value)

const $storeTimer = createStore(0)

/**
 * Получить вопрос
 * */
const getQuestionFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {
        getNewQuestion()
        resolve()
    });
    await promise;
})

/**
 * Запуск таймера на вопрос
 * */
const startTimerFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {
        timerId = setTimeout(() => {
            eventTimeOver()
            resolve()
        }, timeToQuestion)
    });
    await promise;
})
/**
 * Остановка таймера на вопрос
 * */
const stopTimerFx = createEffect( (timerId) => {
    clearTimeout(timerId)
})
/**
 * Проверка ответа на вопрос
 * */
const validateAnswerFx = createEffect( async (answer) => {
    const promise = new Promise((resolve, reject) => {
        eventStopTimer(timerId)
        eventSetClickable(false)
        answer === "yes" ? eventScorePlus($storeQuestionPrice.getState()) : eventScoreReset()
        resolve()
    });
    await promise;
})

/**
 * Обработка окончания времени
 * */
const timeOverFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {
        eventScoreReset()
        resolve()
    });
    await promise;
})

/**
 * Старт игры
 * */
sample({
    clock: eventStartGame,
    target: getQuestionFx,
})

/**
 * Вопрос получен => запуск таймера
 * */
sample({
    clock: getQuestionFx.done,
    target: startTimerFx,
})

/**
 * Ответ получен
 * */
sample({
    clock: eventGetAnswer,
    target: validateAnswerFx
})

sample({

})

/**
 * Остановка таймера
 * */
sample({
    clock: eventStopTimer,
    target: stopTimerFx
})

/**
 * Время на вопрос вышло
 * */
sample({
    clock: eventTimeOver,
    target: timeOverFx
})

/**
 * Ответ провалидирован => получение следующего вопроса
 * */
sample({
    clock: validateAnswerFx.done,
    target: getQuestionFx,
})

/**
 * Выход времени обработан => получение следующего вопроса
 * */
sample({
    clock: timeOverFx.done,
    target: getQuestionFx,
})

/**
 * Получить рандомное число в диапазоне от 2 до 2^7
 * */
function getRandomInt(){
    return Math.floor(Math.random() * (2^7 - 2 + 1) + 2);
}

function getNewQuestion() {
    eventNextQuestion(getRandomInt())
    eventSetClickable(true)
}

