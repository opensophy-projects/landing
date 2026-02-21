import React from 'react';

interface ContactButtonsProps {
  isNegative: boolean;
}

export const ContactButtons: React.FC<ContactButtonsProps> = ({ isNegative }) => {
  const buttonClass = isNegative
    ? 'bg-[#0a0a0a]/60 border-white/20 text-white hover:bg-white/10'
    : 'bg-[#e8e7e3]/60 border-black/20 text-black hover:bg-black/10';

  return (
    <div className="flex flex-wrap gap-4">
      <a
        href="mailto:opensophy@gmail.com"
        className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${buttonClass}`}
      >
        Написать на Email
      </a>
      <a
        href="https://t.me/veilosophy"
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-6 py-3 backdrop-blur-2xl border rounded-lg transition-all duration-300 font-semibold hover:scale-105 ${buttonClass}`}
      >
        Написать в Telegram
      </a>
    </div>
  );
};
