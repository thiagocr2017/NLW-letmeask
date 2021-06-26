import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { useHistory, useParams } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

type RoomParams = {
  id: string,
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })
    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }
  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
  return (
    <div>
      <header className=" p-6 border-b bg-white border-gray-200 z-50 block">
        <div className=" max-w-6xl my-0 mx-auto flex justify-between items-center">
          <img src={logoImg} alt="Letmeask" className=" max-h-11" />
          <div className="flex items-center gap-4">
            <RoomCode code={roomId} />
            <Button
              onClick={handleEndRoom}
              className="border-purple-500 text-purple-500 hover:border-purple-400 hover:bg-gray-200 border transition-colors duration-200 flex justify-center items-center cursor-pointer h-10 py-0 px-8 border-0 rounded-lg font-medium disabled:opacity-50 focus:outline-none">
              Encerrar Sala
            </Button>
          </div>
        </div>
      </header>
      <main className=" max-w-3xl my-0 mx-4 md:mx-auto relative">
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
        <div>
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button type="button" onClick={() => handleCheckQuestionAsAnswered(question.id)} className=" hover:text-green-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    <button type="button" onClick={() => handleHighlightQuestion(question.id)} className=" hover:text-purple-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                      </svg>
                    </button>
                  </>
                )}
                <button type="button" onClick={() => handleDeleteQuestion(question.id)} className=" hover:text-red-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}