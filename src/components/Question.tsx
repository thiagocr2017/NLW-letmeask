import { ReactNode } from "react";

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}
export function Question({
  content,
  author,
  children,
  isAnswered = false,
  isHighlighted = false,
}: QuestionProps) {
  return (
    <div className={`bg-gray-50 rounded-lg shadow p-6 mt-2 ${isHighlighted && !isAnswered ? 'bg-purple-100 border border-purple-500' : ''} ${isAnswered && !isHighlighted ? 'bg-gray-300' : ''} ${isAnswered && isHighlighted ? 'bg-gray-300' : ''}`}>
      <p>{content}</p>
      <footer className="flex items-center justify-between">
        <div className="flex items-center">
          <img src={author.avatar} alt={author.name} className=" w-8 h-8 rounded-full" />
          <span className="ml-2 text-gray-500 text-sm">
            {author.name}
          </span>
        </div>
        <div className="flex gap-2">
          {children}
        </div>
      </footer>
    </div>
  );
}