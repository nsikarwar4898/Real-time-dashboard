'use client';

export default function Summary() {
  return (
    <div className="bg-white">
      <div className="text-sm text-gray-700 font-medium px-3 py-3 border-b border-gray-300 rounded-t">
        Summary
      </div>

      <div className="divide-y divide-gray-200 text-sm">
        <div className="px-4 py-2">
          <div className="text-gray-600">Total sales</div>
          <div className="text-lg font-semibold">
            $150,000.00 <span className="text-sm font-normal">USD</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-gray-600">Total expenses</div>
          <div className="text-lg font-semibold">
            $12,500.00 <span className="text-sm font-normal">USD</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-gray-600">Gross profit</div>
          <div className="text-lg font-semibold">
            $137,500.00 <span className="text-sm font-normal">USD</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-gray-600">Total orders</div>
          <div className="text-lg font-semibold">1,428</div>
        </div>
      </div>
    </div>
  );
}
