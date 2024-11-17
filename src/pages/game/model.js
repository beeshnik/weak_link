import {createEffect, createEvent, createStore, sample} from "effector";
import {eventScoreReset} from "./model/old";

/**
 * Время раунда
 * */
export let timeToQuestion = 30000

const ScoreList = [0, 2, 4, 8, 16, 32, 64, 128]

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
 * Игра окончена
 * */
const eventGameOver = createEvent()

/**
 * Количество баллов в банке
 * */
export const $storeBank = createStore(0)

/**
 * ID таймера
 * */
const $timerId = createStore(null)

/**
 * Текущее количество заработанных баллов
 * */
export const $storeScore = createStore(0)
    .on(eventUpgradeScore, (state) => state + 1)
    .reset(eventDowngradeScore)


/**
 * Получить вопрос
 * */
const getQuestionFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {

        console.log("Вопрос получен")

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

        answer === "yes" ? eventSuccessAnswer() : eventWrongAnswer()

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
 * Проверка на завершение игры
 * */
const checkWinFx = createEffect(async () => {
    const promise = new Promise((resolve, reject) => {
        if ($storeScore.getState() > 7) {
            eventInBank()
            eventGameOver()
        }
        resolve()
    });
    await promise;
})


const gameOverFx = createEffect(async () => {
    console.log("Win!")
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
 * Если ответ верный
 * */
sample({
    clock: eventSuccessAnswer,
    target: eventUpgradeScore
})

/**
 * Если ответ неверный
 * */
sample({
    clock: eventWrongAnswer,
    target: eventDowngradeScore
})

sample({
    clock: eventInBank,
    source: $storeScore,
    fn: validateScoreBeforeBank,
    target: $storeBank
})

/**
 * Если баллы добавились в банк
 * */
sample({
    clock: eventInBank,
    target: eventDowngradeScore
})

/**
 * Проверка на завершение игры
 * */
sample({
    clock: eventSuccessAnswer,
    target: checkWinFx
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

sample({
    clock: eventGameOver,
    target: gameOverFx
})

function validateScoreBeforeBank(value){
    if (value > 7){
        return $storeBank.getState() + ScoreList[7]
    }
    else{
        return $storeBank.getState() + ScoreList[value]
    }
}
