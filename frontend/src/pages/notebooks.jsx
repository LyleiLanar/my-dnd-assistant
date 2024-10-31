import BasePage from './basePage';
import { useEffect, useState } from 'react';
import { getNotebooks } from '../utils/oneNoteAPI.js';

export default function Home(props) {
  const [notebooks, setNotebooks] = useState([]);
  const [isLoadingNotebookList, setIsLoadingNotebookList] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isLoadingNotebookList) return;
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 500);

    return () => clearInterval(dotsInterval);
  }, [isLoadingNotebookList]);

  useEffect(() => {
    async function fetchNotebooks() {
      try {
        const response = await getNotebooks();
        setNotebooks(response);
      } catch (error) {
        console.error('Error fetching notebooks:', error);
      } finally {
        setIsLoadingNotebookList(false);
      }
    }

    fetchNotebooks();
  }, []);

  function generateList() {
    if (notebooks.length !== 0) {
      return (
        <ul>
          {notebooks.map((notebook) => (
            <li key={notebook.id}>{notebook.displayName}</li>
          ))}
        </ul>
      );
    } else {
      return <p>No notebooks have found!</p>;
    }
  }

  return (
    <BasePage title="My notebooks" {...props}>
      {isLoadingNotebookList ? (
        <p>Fetching your notebooks{dots}</p>
      ) : (
        generateList()
      )}
    </BasePage>
  );
}
