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
    <div className="bg-white rounded ">
      <div className="text-sm text-gray-700 font-medium px-4 py-2 border-b border-gray-300 rounded-t">
        Payments history
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between w-full py-2 rounded">
          <input
            type="text"
            placeholder="Filter..."
            className="border border-gray-300 text-sm px-3 py-1 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border border-gray-300 text-sm px-2 py-1 rounded bg-white">
            <option>Columns</option>
            <option>Column 1</option>
            <option>Column 2</option>
            <option>Column 3</option>
          </select>
        </div>

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

        <div className="flex items-center justify-between py-3 text-sm text-gray-700">
          <span>0 of 5 row(s) selected.</span>

          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
              &lt;
            </button>
            <button className="px-2 py-1 text-gray-900">1</button>
            <button className="px-2 py-1 text-gray-900">2</button>
            <button className="px-2 py-1 text-gray-900">3</button>
            <span className="px-2 py-1 text-gray-500">...</span>
            <button className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
