import logoImg from '../assets/images/logo.svg';
import { database } from '../services/firebase';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { FormEvent, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string,
}

export function Room() {
  const { user, signInWithGoogle } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  const history = useHistory();

  async function handleValidateRoom() {
    const roomRef = await database.ref(`/rooms/${roomId}`).get();
    if (roomRef.val().endedAt) {
      history.push(`/`);
      return;
    }
  }
  handleValidateRoom();

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
  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      // remover like
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove();
    } else {
      // add like
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  async function handleLoginWithGoogle() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push(`/rooms/${roomId}`);
  }

  return (
    <div>
      <header className="p-6 border-b border-gray-200 bg-white">
        <div className=" max-w-6xl my-0 mx-auto flex justify-between items-center">
          <img src={logoImg} alt="Letmeask" className=" max-h-11" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="max-w-3xl my-0 mx-4 md:mx-auto">
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
            className="h-32 min-h-full resize-y w-full border-0 p-4 rounded-lg bg-gray-50 shadow focus:outline-none"
          />
          <div className="flex justify-between items-center mt-4 mb-5">
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
                <button
                  onClick={handleLoginWithGoogle}
                  className="bg-transparent border-0 text-purple-500 underline text-sm font-medium cursor-pointer">
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
        <div>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted} >
                {!question.isAnswered && (
                  <button
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                    className={`border-0 bg-transparent cursor-pointer flex items-end gap-2 text-gray-500 focus:outline-none ${question.likeId ? 'liked' : ''}`}>
                    {question.likeId ? (
                      <div className="text-purple-500 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 hover:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {question.likeCount}
                      </div>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}