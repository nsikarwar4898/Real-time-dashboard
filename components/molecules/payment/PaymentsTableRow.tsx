'use client';

import { faker } from '@faker-js/faker';
import { memo } from 'react';

type Transaction = {
  id: number;
  user: string;
  amount: string;
  date: string;
};

type PaymentsTableRowProps = {
  payment: Transaction;
};

function PaymentsTableRow({ payment }: PaymentsTableRowProps) {
  return (
    <tr className="border-b border-border text-text">
      <td className="p-2">
        <input type="checkbox" />
      </td>
      <td className="p-2">{faker.datatype.boolean() ? 'success' : 'failure'}</td>
      <td className="p-2">{payment.user}@yahoo.com</td>
      <td className="p-2">{payment.amount}</td>
      <td className="p-2">{payment.amount}</td>
    </tr>
  );
}

export default memo(PaymentsTableRow);
