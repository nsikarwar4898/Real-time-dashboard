'use client';

import { Logo } from '@/components/icons';
import { HiSun } from 'react-icons/hi';
import { content } from '@/lib/utils/content';

type Props = {
  editMode: boolean;
  onToggleEditMode: () => void;
  onReset: () => void;
};

export default function Header({ editMode, onToggleEditMode, onReset }: Props) {
  return (
    <header className="flex items-center justify-between px-2 py-2 border-b border-border mb-1 bg-card-bg h-20">
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm border text-title border-border rounded "
        >
          {content.header.resetButton}
        </button>

        <label className="inline-flex items-center cursor-pointer border-border">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={editMode}
            onChange={onToggleEditMode}
          />
          <div className="w-11 h-6 text-text bg-toggle border-border rounded-full relative transition-colors duration-300">
            <div
              className="absolute left-1 top-1 w-4 h-4 bg-button  rounded-full transition-transform duration-300"
              style={{ transform: editMode ? 'translateX(20px)' : 'translateX(0)' }}
            />
          </div>
          <span className="ml-2 text-sm text-title">{content.header.editButton}</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-blue-800 font-semibold text-xl flex items-center gap-1">
          <Logo /> {content.header.title}
        </span>
      </div>

      <button className="p-2 hover:bg-background rounded">
        <HiSun className="w-5 h-5 text-title" />
      </button>
    </header>
  );
}
