import copyImg from '../assets/images/copy.svg';
type RoomCodeProps = {
  code: string;
};
export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <button
      onClick={copyRoomCodeToClipboard}
      className="h-10 rounded-lg overflow-hidden bg-white border border-purple-500 cursor-pointer flex">
      <div className="bg-purple-500 h-10 p-3 flex justify-center items-center">
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span className="block self-center w-full pt-0 pr-4 pb-0 pl-3 text-sm font-medium">
        Sala #{props.code}
      </span>
    </button>
  );
}