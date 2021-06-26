import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from "../components/Button";
import { database } from '../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }
    const roomRef = database.ref('rooms');
    const firebaseRom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })
    history.push(`/admin/rooms/${firebaseRom.key}`)
  }
  return (
    <div className="box-border h-1/3 md:h-screen md:flex block">
      <aside className="bg-gradient-to-tl from-pink-400 via-purple-600 to-purple-700 text-white py-8 md:py-32 px-20 flex flex-col md:w-7/12 justify-center">
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" className="max-w-xs" />
        <strong className="font-bold font-poppins text-3xl mt-4">Crie salas de Q&amp;A ao-vivo</strong>
        <p className="text-2xl mt-4 text-gray-100">Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main className="flex mt-6 md:mt-0 md:w-6/12 py-0 px-8 items-center justify-center">
        <div className="flex flex-col w-full max-w-xs items-stretch text-center">
          <img src={logoImg} alt="Letmeask" className="self-center" />
          <h2 className="text-black text-2xl mt-16 mx-0 mb-6 font-poppins">Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
              className="bg-white border border-gray-200 w-full h-12 rounded-lg py-0 px-4 focus:outline-none focus:ring-0"
            />
            <Button
              type="submit"
              className="w-full bg-purple-500 text-white hover:bg-purple-400 transition-colors duration-200 flex justify-center items-center cursor-pointer h-12 py-0 px-8 mt-4 border-0 rounded-lg font-medium disabled:opacity-50 focus:outline-none">
              Entre na sala
            </Button>
          </form>
          <p className="text-sm text-gray-600 mt-4">Quer entrar em uma sala existente?
            <Link to="/" className="text-pink-400 ml-1">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}