import { useAuth } from '../hooks/useAuth';
import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';
import { Button } from "../components/Button";
import { database } from '../services/firebase';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history.push('/rooms/new');
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }
    history.push(`rooms/${roomCode}`);
  }
  return (
    <div className="box-border h-screen flex">
      <aside className="bg-gradient-to-tl from-pink-400 via-purple-600 to-purple-700 text-white py-32 px-20 flex flex-col w-7/12 justify-center">
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" className="max-w-xs" />
        <strong className="font-bold font-poppins text-3xl mt-4">Crie salas de Q&amp;A ao-vivo</strong>
        <p className="text-2xl mt-4 text-gray-100">Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className="flex w-6/12 py-0 px-8 items-center justify-center">
        <div className="flex flex-col w-full max-w-xs items-stretch text-center">
          <img src={logoImg} alt="Letmeask" className="self-center" />
          <button onClick={handleCreateRoom} className="text-white bg-red-500 hover:bg-red-400 transition-colors duration-200 flex justify-center items-center cursor-pointer border-0 mt-16 h-12 rounded-lg font-medium focus:outline-none">
            <img src={googleIconImg} alt="Logo do Google" className="px-4" />
            Crie sua sala com o Google
          </button>
          <div className="text-center border-b-2 border-gray-300 leading-line-middle my-8 min-w-max">
            <span className="py-0 px-3 bg-gray-50 w-full text-gray-300">
              ou entre em uma sala
            </span>
          </div>
          <form onSubmit={handleJoinRoom} >
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
              className="bg-white border border-gray-200 w-full h-12 rounded-lg py-0 px-4 focus:outline-none focus:ring-0"
            />
            <Button
              type="submit"
              className="w-full bg-purple-500 text-white hover:bg-purple-400 transition-colors duration-200 flex justify-center items-center cursor-pointer h-12 py-0 px-8 mt-4 border-0 rounded-lg font-medium disabled:opacity-50 focus:outline-none">
              Entre na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}