import { ButtonHTMLAttributes } from 'react';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export function Button(props: ButtonProps) {
  return (
    <button
      className={"bg-purple-500 text-white hover:bg-purple-400 transition-colors duration-200 flex justify-center items-center cursor-pointer h-12 py-0 px-8 mt-4 w-full border-0 rounded-lg font-medium disabled:opacity-50 focus:outline-none"}
      {...props}
    />
  );
}