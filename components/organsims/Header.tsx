'use client';

import { FiSettings } from 'react-icons/fi';

type Props = {
  editMode: boolean;
  onToggleEditMode: () => void;
  onReset: () => void;
};

export default function Header({ editMode, onToggleEditMode, onReset }: Props) {
  return (
    <header className="flex items-center justify-between px-2 py-2 border-b border-border mb-1 bg-background">
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm border border-border rounded "
        >
          Reset to default
        </button>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={editMode}
            onChange={onToggleEditMode}
          />
          <div className="w-11 h-6 bg-background peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
            <div
              className="absolute left-1 top-1 w-4 h-4 bg-background rounded-full transition-transform duration-300"
              style={{ transform: editMode ? 'translateX(20px)' : 'translateX(0)' }}
            />
          </div>
          <span className="ml-2 text-sm text-text">Edit mode</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-blue-800 font-semibold text-lg flex items-center gap-1">
          <span className="bg-blue-800 w-4 h-4 rounded-sm inline-block" /> acme
        </span>
      </div>

      <button className="p-2 hover:bg-border rounded">
        <FiSettings className="w-5 h-5 text-text" />
      </button>
    </header>
  );
}
