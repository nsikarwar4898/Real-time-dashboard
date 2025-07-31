'use client';

import { HiSun } from 'react-icons/hi';
import Logo from '../icons/Logo';

type Props = {
  editMode: boolean;
  onToggleEditMode: () => void;
  onReset: () => void;
};

export default function Header({ editMode, onToggleEditMode, onReset }: Props) {
  return (
    <header className="flex items-center justify-between px-2 py-2 border-b border-gray-300 mb-1 bg-white">
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
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
          <div className="w-11 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full relative transition-colors duration-300">
            <div
              className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300"
              style={{ transform: editMode ? 'translateX(20px)' : 'translateX(0)' }}
            />
          </div>
          <span className="ml-2 text-sm text-gray-700">Edit mode</span>
        </label>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-blue-800 font-semibold text-lg flex items-center gap-1">
          <Logo /> acme
        </span>
      </div>

      <button className="p-2 hover:bg-gray-100 rounded">
        <HiSun className="w-5 h-5 text-gray-600" />
      </button>
    </header>
  );
}
