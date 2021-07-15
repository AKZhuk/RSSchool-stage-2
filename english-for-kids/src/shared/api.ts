import { TWord, TCategory } from './interfaces';

export const baseUrl: RequestInfo = 'https://akzhuk-english-for-kids.herokuapp.com';
// http://127.0.0.1:3000
export const getWords = async (): Promise<TWord[]> => {
  try {
    const response = await fetch(`${baseUrl}/words/getall`);
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const createWord = async (data: FormData): Promise<void> => {
  try {
    (
      await fetch(`${baseUrl}/words/create`, {
        method: 'POST',
        body: data,
      })
    ).json();
  } catch (err) {
    throw new Error(`something went wrong(( Error: ${err}`);
  }
};

export const updateWord = async (data: FormData, id: string): Promise<void> => {
  try {
    (
      await fetch(`${baseUrl}/words/update/?${new URLSearchParams({ id })}`, {
        method: 'PUT',
        body: data,
      })
    ).json();
  } catch (err) {
    throw new Error(`something went wrong(( Error: ${err}`);
  }
};
/*
export const loadWord = async (id:string,words: ICard[]) => {
  console.log(words[0], JSON.stringify(words[0]));
  words.forEach(async (word) => {
    let data = {};
    data.categoryID = id;
    data.word = word.word;
    data.translation = word.translation;
    data.audioSRC = 'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521117/english-for-kids/' + word.audioSrc;
    data.imageSRC = 'https://res.cloudinary.com/dshgus1qp/image/upload/v1625521117/english-for-kids/' + word.image;
    (
      await fetch(`${baseUrl}/words/add`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
  });
};
*/

export const deleteWord = async (id: string): Promise<void> => {
  try {
    (
      await fetch(`${baseUrl}/words/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
  } catch (err) {
    throw new Error(`something went wrong(( Error: ${err}`);
  }
};

export const getCategories = async (): Promise<TCategory[]> => {
  try {
    const response = await fetch(`${baseUrl}/categories/getall`);
    return await response.json();
  } catch (error) {
    return [];
  }
};

export const createCategory = async (name: string): Promise<void> => {
  try {
    (
      await fetch(`${baseUrl}/categories/add`, {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
  } catch (err) {
    throw new Error(`something went wrong(( Error: ${err}`);
  }
};

export const updateCategory = async (
  id: string,
  name: string,
): Promise<void> => {
  try {
    (
      await fetch(`${baseUrl}/categories/update`, {
        method: 'PUT',
        body: JSON.stringify({ _id: id, name }),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
  } catch (err) {
    throw new Error(`something went wrong(( Error: ${err}`);
  }
};

export const deleteCategory = async (id: string): Promise<void> => {
  try {
    (
      await fetch(`${baseUrl}/categories/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ _id: id }),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
  } catch (err) {
    throw new Error(`something went wrong(( Error: ${err}`);
  }
};
/*
export const loadCategory = async (categories: TCategory[]) => {
  categories.forEach(async (cat) => {
      await fetch(`${baseUrl}/categories/add`, {
        method: 'POST',
        body: JSON.stringify(cat),
        headers: {
          'Content-Type': 'application/JSON',
        },
      })
    ).json();
  });
};
*/
