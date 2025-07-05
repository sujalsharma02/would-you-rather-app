import { saveQuestionAnswer, saveQuestion } from '../utils/api';

import { addAnswerToUser, addQuestionToUser } from './users';

export const GET_QUESTIONS = 'GET_QUESTIONS';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const ADD_QUESTION = 'SAVE_QUESTION';

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addQuestionAnswer({ authedUser, qid, answer }) {
  return {
    type: ADD_QUESTION_ANSWER,
    authedUser,
    qid,
    answer,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
      .then((question) => {
        dispatch(addQuestion(question));
        dispatch(addQuestionToUser(question));
      });
  };
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addQuestionAnswer(info));
    dispatch(addAnswerToUser(info));

    return saveQuestionAnswer(info).catch((e) => {
      console.warn('Error in handleAddAnswer: ', e);
      // Implement optimistic update rollback if needed
    });
  };
}