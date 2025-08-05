'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { content } from '@/lib/utils/content';

type Transaction = {
  id: number;
  user: string;
  amount: string;
  date: string;
};

type PaymentProps = {
  dashboardData: Transaction[];
};
const PaymentsTableRow = dynamic(() => import('./PaymentsTableRow'), { ssr: false });
const columnOptions = [
  content.payments.column1,
  content.payments.column2,
  content.payments.column3,
];
const tableHeaders = [
  content.payments.status,
  content.payments.email,
  content.payments.amount,
  content.payments.totalNet,
];
export default function PaymentsTable({ dashboardData }: PaymentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(dashboardData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = dashboardData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-card-bg rounded">
      <div className="text-sm text-title font-medium px-4 py-1 h-11 flex items-center border-b border-border rounded-t">
        {content.payments.title}
      </div>

      <div className="px-4 flex flex-col items-center justify-between h-96 w-full">
        <div className="w-full">
          <div className="flex items-center justify-between w-full py-2 rounded">
            <input
              type="text"
              placeholder="Filter..."
              className="border placeholder-title border-border text-sm px-3 py-1 rounded w-1/2 focus:outline-none focus:ring-2 focus:border-2"
            />

            <select className="border text-title border-border text-sm px-2 py-1 rounded bg-card-bg">
              <option>{content.payments.columns}</option>
              {columnOptions.map((column, index) => (
                <option key={index}>{column}</option>
              ))}
            </select>
          </div>
          <div className="w-full rounded border border-border">
            <table className="w-full text-sm border-collapse">
              <thead className="text-left text-title bg-card-bg border-b border-border">
                <tr>
                  <th className="p-2">
                    <input type="checkbox" />
                  </th>
                  {tableHeaders.map((heading, index) => (
                    <th key={index} className="p-2">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {currentItems.map(payment => (
                  <PaymentsTableRow key={payment.id} payment={payment} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-end  justify-between py-3 text-sm text-title w-full">
          <span>
            {startIndex + 1} - {Math.min(startIndex + itemsPerPage, dashboardData.length)} of{' '}
            {dashboardData.length} row(s)
          </span>

          <div className="flex items-center space-x-1n ">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-2 py-1 border border-border rounded disabled:opacity-50"
            >
              &lt;
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-2 py-1 ${
                  currentPage === i + 1 ? 'bg-primary rounded' : 'text-title'
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-2 py-1 border border-border rounded disabled:opacity-50"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
