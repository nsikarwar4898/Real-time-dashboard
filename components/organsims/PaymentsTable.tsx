'use client';

export default function PaymentsTable() {
  const payments = [
    {
      id: '1',
      status: 'Success',
      email: 'ken99@yahoo.com',
      amount: 316,
      totalNet: 316,
    },
    {
      id: '2',
      status: 'Success',
      email: 'ken99@yahoo.com',
      amount: 316,
      totalNet: 316,
    },
    {
      id: '3',
      status: 'Success',
      email: 'ken99@yahoo.com',
      amount: 316,
      totalNet: 316,
    },
    {
      id: '4',
      status: 'Success',
      email: 'ken99@yahoo.com',
      amount: 316,
      totalNet: 316,
    },
    {
      id: '5',
      status: 'Success',
      email: 'ken99@yahoo.com',
      amount: 316,
      totalNet: 316,
    },
    {
      id: '6',
      status: 'Success',
      email: 'ken99@yahoo.com',
      amount: 316,
      totalNet: 316,
    },
  ];

  return (
    <div className="bg-white rounded border border-gray-300">
      <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
        Payments history
      </div>

      <div className="p-4">
        <input
          type="text"
          placeholder="Filter..."
          className="mb-3 w-full p-2 border border-gray-300 rounded text-sm"
        />

        <table className="w-full text-sm border-collapse">
          <thead className="text-left bg-gray-50 border-b border-gray-300">
            <tr>
              <th className="p-2">
                <input type="checkbox" />
              </th>
              <th className="p-2">Status</th>
              <th className="p-2">Email</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Total net</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2">{payment.status}</td>
                <td className="p-2">{payment.email}</td>
                <td className="p-2">${payment.amount.toFixed(2)}</td>
                <td className="p-2">${payment.totalNet.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <div>0 of 3 row(s) selected.</div>
          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 border rounded opacity-50" disabled>
              &lt;
            </button>
            <button className="px-2 py-1 rounded bg-gray-200">1</button>
            <button className="px-2 py-1 border rounded opacity-50" disabled>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
