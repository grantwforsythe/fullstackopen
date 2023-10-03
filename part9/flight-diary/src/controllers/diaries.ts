/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Request, Response, request } from 'express';
import diaryService from '../services/diaryService';
import { NewDiaryEntry } from '../types';

export const getDiaries = (_request: Request, response: Response) => {
  response.send(diaryService.getNonSensitiveEntries());
};

export const getDiaryById = (request: Request, response: Response) => {
  const diary = diaryService.findById(Number(request.params.id));

  if (diary) {
    response.send(diary);
  } else {
    response.send(404);
  }
};

export const addDiary = (_request: Request, response: Response) => {
  const { date, weather, visibility, comment }: NewDiaryEntry = request.body;
  const newEntry = diaryService.addDiary({ date, weather, visibility, comment });

  response.status(201).json(newEntry);
};
