import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom';
import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

type RoomParams = {
  id: string,
}
type FriebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}>
type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
}
export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  const roomId = params.id;
  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);
    roomRef.on('value', room => {
      // console.log(room.val());
      const databaseRoom = room.val();
      const friebaseQuestions: FriebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(friebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        };
      });
      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    });
  }, [roomId]);

  async function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }
    if (!user) {
      throw new Error('You must be logged in');
    }
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${roomId}/questions`).push(question);
    setNewQuestion('');
  }
  return (
    <div>
      <header className=" p-6 border-b border-gray-200">
        <div className=" max-w-6xl my-0 mx-auto flex justify-between items-center">
          <img src={logoImg} alt="Letmeask" className=" max-h-11" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className=" max-w-3xl my-0 mx-auto">
        <div className=" mt-8 mb-6 mx-0 flex items-center">
          <h1 className="text-gray-800 font-semibold font-poppins text-2xl">
            Sala {title}
          </h1>
          {questions.length > 0 &&
            <span className="ml-4 bg-pink-400 rounded-full py-2 px-4 text-white font-medium text-sm">
              {questions.length} pergunta(s)
            </span>
          }

        </div>
        <form onSubmit={handleSendNewQuestion}>
          <textarea
            placeholder="O que você quer perguntar?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
            className="h-32 min-h-full resize-y w-full border-0 p-4 rounded-lg bg-gray-50 shadow-md focus:outline-none"
          />
          <div className="flex justify-between items-center mt-4">
            {user ? (
              <div className="flex items-center">
                <img src={user.avatar} alt={user.name} className=" w-8 h-8 rounded-full" />
                <span className="ml-2 text-gray-600 font-medium text-sm">
                  {user.name}
                </span>
              </div>
            ) : (
              <span className="text-sm text-gray-400 font-medium">
                Para enviar uma pergunta,
                <button className="bg-transparent border-0 text-purple-500 underline text-sm font-medium cursor-pointer">
                  faça seu login
                </button>.
              </span>
            )}
            <Button
              type="submit"
              disabled={!user}
              className="bg-purple-500 text-white hover:bg-purple-400 transition-colors duration-200 flex justify-center items-center cursor-pointer h-12 py-0 px-8 mt-4 border-0 rounded-lg font-medium disabled:opacity-50 focus:outline-none">
              Enviar pergunta
            </Button>
          </div>
        </form>
        {JSON.stringify(questions)}
      </main>
    </div>
  );
}