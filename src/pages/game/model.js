import {createEffect, createEvent, createStore, sample} from "effector";

/**
 * Время раунда
 * */
export let timeToQuestion = 30000

/**
 * Установить баллы в банке
 * */
export const eventUpgradeScore = createEvent()

/**
 * Обнулить банк
 * */
export const eventDowngradeScore = createEvent()

/**
 * Установить баллы в банке
 * */
export const eventInBank = createEvent()

/**
 * Начать игру
 * */
export const eventStartGame = createEvent()

/**
 * Получен ответ на вопрос
 * */
export const eventGetAnswer = createEvent()

/**
 * Ответ верный
 * */
const eventSuccessAnswer = createEvent()

/**
 * Ответ неверный
 * */
const eventWrongAnswer = createEvent()

/**
 * Получить следующий вопрос
 * */
const eventNextQuestion = createEvent()

/**
 * Установить таймер
 * */
const eventStartTimer = createEvent()

/**
 * Остановить таймер
 * */
const eventStopTimer = createEvent()

/**
 * Время вышло
 * */
const eventTimeOver = createEvent()

/**
 * Установить ID таймера
 * */
const eventSetTimerId = createEvent()


/**
 * Количество баллов в банке
 * */
export const $storeBank = createStore(0)
    .on(eventInBank, (state, value) => state + value)

/**
 * ID таймера
 * */
const $timerId = createStore(null)

/**
 * Текущее количество заработанных баллов
 * */
export const $storeScore = createStore(2)
    .on(eventUpgradeScore, (state, value) => state + value)
    .reset(eventDowngradeScore)


/**
 * Получить вопрос
 * */
const getQuestionFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {

        console.log("Ответ получен")

        resolve()
    });
    await promise;
})

/**
 * Запуск таймера на вопрос
 * */
const startTimerFx = createEffect(async () => {
    setTimeout(() => {
        eventTimeOver()
    }, timeToQuestion)
})

/**
 * Время вышло
 * */
const timeOverFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {

        console.log("Время вышло")

        resolve()
    });
    await promise;
})

/**
 * Проверка ответа на вопрос
 * */
const validateAnswerFx = createEffect( async (answer) => {
    const promise = new Promise((resolve, reject) => {

        console.log("Ответ провалидирован")

        resolve()
    });
    await promise;
})

/**
 * Остановка таймера на вопрос
 * */
const stopTimerFx = createEffect( (timerId) => {
    if (timerId !== null) {
        clearTimeout(timerId)
    }
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
    target: eventStartTimer,
})

/**
 * Запуск игрового таймера
 * */
sample({
    clock: eventStartTimer,
    target: startTimerFx
})

/**
 * Ответ получен
 * */
sample({
    clock: eventGetAnswer,
    target: validateAnswerFx
})

/**
 * Ответ провалидирован => получение следующего вопроса
 * */
sample({
    clock: validateAnswerFx.done,
    target: getQuestionFx,
})

/**
 * Время вышло
 * */
sample({
    clock: eventTimeOver,
    target: timeOverFx
})

/**
 * Остановка таймера
 * */
sample({
    clock: eventStopTimer,
    source: $timerId,
    target: stopTimerFx
})
