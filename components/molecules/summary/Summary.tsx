'use client';

import { content } from '@/lib/utils/content';

export default function Summary() {
  return (
    <div className="bg-card-bg rounded">
      <div className="text-sm text-title font-medium p-1 px-4 flex items-center h-11 border-b border-border rounded-t">
        {content.summary.title}
      </div>

      <div className="divide-y divide-border text-sm mt-3">
        <div className="px-4 py-2">
          <div className="text-text">{content.summary.sales}</div>
          <div className="text-lg text-title font-semibold">
            {content.summary.salesNumber}{' '}
            <span className="text-sm font-normal">{content.summary.currency}</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-text">{content.summary.expenses}</div>
          <div className="text-lg text-title font-semibold">
            {content.summary.expensesNumber}
            <span className="text-sm font-normal">{content.summary.currency}</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-text">{content.summary.profit}</div>
          <div className="text-lg text-title font-semibold">
            {content.summary.profitNumber}{' '}
            <span className="text-sm font-normal">{content.summary.currency}</span>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="text-text">{content.summary.orders}</div>
          <div className="text-lg text-title font-semibold">{content.summary.orderNumber}</div>
        </div>
      </div>
    </div>
  );
}
