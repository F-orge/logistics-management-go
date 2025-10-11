import React from 'react';
import { orpcClient } from '@/orpc/client';

const CompaniesChart = ({
  data,
}: {
  data: Awaited<ReturnType<typeof orpcClient.crm.paginateCompany>>;
}) => {
  const [timeRange, setTimeRange] = React.useState<'30d' | '90d' | '1yr'>(
    '90d',
  );

  const filteredData = data.filter((item) => {
    const date = new Date(item.createdAt!);
    const referenceDate = new Date('2024-06-30');
    let daysToSubtract = 90;
    if (timeRange === '30d') {
      daysToSubtract = 30;
    } else if (timeRange === '90d') {
      daysToSubtract = 90;
    } else if (timeRange === '1yr') {
      daysToSubtract = 365;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return <div>CompaniesChart</div>;
};

export default CompaniesChart;
