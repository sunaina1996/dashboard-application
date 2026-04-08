import { Card, Heading, Button, Chart, Table } from '@sunaina-dev/ui-library';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface TableColumn<Row> {
  header: string;
  accessor: keyof Row;
  align?: 'left' | 'center' | 'right';
  render?: (value: Row[keyof Row], row: Row) => React.ReactNode;
}

interface Order {
  id: string;
  customer: string;
  amount: string;
  status: 'Paid' | 'Pending' | 'Failed';
}

export const Analytics = () => {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' },
    { label: 'Active Users', value: '2,350', change: '+180', trend: 'up' },
    { label: 'Sales', value: '12,234', change: '-19%', trend: 'down' },
    { label: 'Conversion Rate', value: '3.24%', change: '+4.5%', trend: 'up' },
  ];

  const revenueData: ChartDataPoint[] = [
    { label: 'Jan', value: 3200 },
    { label: 'Feb', value: 4100 },
    { label: 'Mar', value: 3800 },
    { label: 'Apr', value: 5200 },
    { label: 'May', value: 4900 },
    { label: 'Jun', value: 6100 },
    { label: 'Jul', value: 5800 },
  ];

  const categoryData: ChartDataPoint[] = [
    { label: 'Laptops', value: 12400, color: '#0ea5e9' },
    { label: 'Phones', value: 9800, color: '#8b5cf6' },
    { label: 'Audio', value: 5600, color: '#f59e0b' },
    { label: 'Tablets', value: 4200, color: '#10b981' },
  ];

  const recentOrders: Order[] = [
    { id: '#3210', customer: 'Rahul Sharma', amount: '$250.00', status: 'Paid' },
    { id: '#3209', customer: 'Priya Singh', amount: '$150.00', status: 'Pending' },
    { id: '#3208', customer: 'Amit Kumar', amount: '$350.00', status: 'Paid' },
    { id: '#3207', customer: 'Sneha Patel', amount: '$450.00', status: 'Failed' },
  ];

  const orderColumns: TableColumn<Order>[] = [
    { header: 'Order ID', accessor: 'id' },
    { header: 'Customer', accessor: 'customer' },
    { header: 'Amount', accessor: 'amount', align: 'right' },
    {
      header: 'Status',
      accessor: 'status',
      align: 'center',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Paid'? 'bg-green-100 text-green-700' :
          value === 'Pending'? 'bg-yellow-100 text-yellow-700' :
          'bg-red-100 text-red-700'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div className="space-y-6 px-6">
      <div className="flex justify-between items-center [&>div]:px-0">
        <Heading
          title="Analytics"
          subtitle="Here's what's happening with your business today"
          level={3}
        />
        <Button variant="primary">Download Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label}>
            <Card>
              <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                <span className={`text-sm font-medium ${
                  stat.trend === 'up'? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart data={revenueData} type="line" title="Revenue Overview" height={320} />
        <Chart data={categoryData} type="bar" title="Sales by Category" height={320} />
      </div>

      <div>
        <Card title="Recent Orders">
          <Table
            data={recentOrders}
            columns={orderColumns}
            rowKey={(row) => row.id}
            zebra
          />
        </Card>
      </div>
    </div>
  );
};