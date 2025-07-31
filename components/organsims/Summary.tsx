'use client';

export default function Summary() {
  return (
    <div className="bg-card-bg">
      <div className="text-sm text-title font-medium px-3 py-3 border-b border-border rounded-t">
        Summary
      </div>

      <div className="divide-y divide-text text-sm">
        <div className="px-4 py-2">
          <div className="text-title">Total sales</div>
          <div className="text-lg text-text font-semibold">
            $150,000.00 <span className="text-sm font-normal">USD</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-title">Total expenses</div>
          <div className="text-lg  text-text font-semibold">
            $12,500.00 <span className="text-sm font-normal">USD</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-title ">Gross profit</div>
          <div className="text-lg text-text font-semibold">
            $137,500.00 <span className="text-sm font-normal">USD</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-title">Total orders</div>
          <div className="text-lg text-text font-semibold">1,428</div>
        </div>
      </div>
    </div>
  );
}
