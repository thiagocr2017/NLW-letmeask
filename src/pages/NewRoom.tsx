// import { useAuth } from '../hooks/useAuth';
import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import { Button } from "../components/Button";
import { Link } from 'react-router-dom';
import { FormEvent } from 'react';

export function NewRoom() {
  // const { user } = useAuth();
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
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
          <h2 className="text-black text-2xl mt-16 mx-0 mb-6 font-poppins">Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input
              type="text"
              placeholder="Nome da sala"
              className="bg-white border border-gray-200 w-full h-12 rounded-lg py-0 px-4 focus:outline-none focus:ring-0"
            />
            <Button type="submit">
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