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
    <div className="bg-card-bg rounded ">
      <div className="text-sm text-title font-medium px-4 py-1 flex items-center  border-b border-border rounded-t">
        Payments history
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between w-full py-2 rounded">
          <input
            type="text"
            placeholder="Filter..."
            className="border placeholder-title border-border text-sm px-3 py-1 rounded w-1/2 focus:outline-none focus:ring-2 focus:border-2"
          />

          <select className="border text-title border-border text-sm px-2 py-1 rounded bg-card-bg">
            <option>Columns</option>
            <option>Column 1</option>
            <option>Column 2</option>
            <option>Column 3</option>
          </select>
        </div>

        <table className="w-full text-sm border-collapse">
          <thead className="text-left text-title bg-card-bg border-b border-border">
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
              <tr key={payment.id} className="border-b border-border text-text">
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

        <div className="flex  items-center justify-between py-3 text-sm text-title">
          <span>0 of 5 row(s) selected.</span>

          <div className="flex items-center space-x-1">
            <button className="px-2 py-1 border border-border rounded ">
              &lt;
            </button>
            <button className="px-2 py-1 text-title">1</button>
            <button className="px-2 py-1 text-title">2</button>
            <button className="px-2 py-1 text-title">3</button>
            <span className="px-2 py-1 text-title">...</span>
            <button className="px-2 py-1 border border-border rounded">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
