import diaryEntries from '../../data/diaries';
import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getEntries = (): DiaryEntry[] => {
  return diaryEntries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaryEntries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry: DiaryEntry = {
    id: Math.max(...diaryEntries.map(entry => entry.id)) + 1,
    ...entry,
  };

  diaryEntries.push(newEntry);
  return newEntry;
};

const findById = (id: number): DiaryEntry | undefined => {
  return diaryEntries.find(entry => entry.id === id);
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById,
};
