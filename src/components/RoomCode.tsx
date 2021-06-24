import { matchPath } from "react-router";
import { useState } from 'react';
import copyImg from '../assets/images/copy.svg';
type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  const match = matchPath(`/rooms/${props.code}`, {
    path: '/rooms/:id',
    exact: true,
    strict: false
  });
  const [codeIsCopied, setCodeIsCopied] = useState(false); // Lucas Gabriel, obrigado pela implementacao do codigo para mudar o stado.
  function copyRoomCodeToClipboard() {
    console.log(process.env.REACT_APP_BASE_URL);
    const codeMatch = match;
    if (codeMatch != null) {
      navigator.clipboard.writeText(process.env.REACT_APP_BASE_URL + codeMatch.url);
      return setCodeIsCopied(true);
    }
    return setCodeIsCopied(false);
  }
  console.log();
  return (
    <button
      onClick={copyRoomCodeToClipboard}
      className="h-10 rounded-lg overflow-hidden bg-white border border-purple-500 cursor-pointer flex">
      <div className="bg-purple-500 p-3 flex justify-center items-center">
        <img src={copyImg} alt="Copy room code" />
      </div>
      { // Lucas Gabriel, obrigado pela implementacao do codigo para mudar o stado.
        codeIsCopied ? (
          <span className="text-purple-500 block self-center w-full pt-0 pr-4 pb-0 pl-3 text-sm font-medium">
            Link copiado!
          </span>
        ) : (
          <span className="block self-center w-full pt-0 pr-4 pb-0 pl-3 text-sm font-medium">
            Copiar link da Sala
          </span>
        )
      }
    </button>
  );
}