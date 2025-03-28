import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { revenueByWeek, revenueByMonth, revenueByYear } from '../../service/RevenueService';

const ChartOne: React.FC = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [filter, setFilter] = useState<'year' | 'week' | 'month'>('month');
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data;
      if (filter === "week") {
        data = await revenueByWeek();
        data.data.sort((a: any, b: any) => a.week - b.week); // Sắp xếp tuần tăng dần
        setCategories(data.data.map((d: any) => `Tuần ${d.week}`));
        setSeries([{ name: "Total Revenue", data: data.data.map((d: any) => d.revenue) }]);
      } else if (filter === "month") {
        data = await revenueByMonth();
        data.data.sort((a: any, b: any) => a.month - b.month); // Sắp xếp tháng tăng dần
        setCategories(data.data.map((d: any) => `Tháng ${d.month}`));
        setSeries([{ name: "Total Revenue", data: data.data.map((d: any) => d.totalRevenue) }]);
      } else {
        data = await revenueByYear();
        data.data.sort((a: any, b: any) => a.year - b.year); // Sắp xếp năm tăng dần
        setCategories(data.data.map((d: any) => `Năm ${d.year}`));
        setSeries([{ name: "Total Revenue", data: data.data.map((d: any) => d.revenue) }]);
      }
      setLoading(false);
    };

    fetchData();
  }, [filter]);


  const options: ApexOptions = {
    chart: { type: 'bar', height: '100%', width: '100%', fontFamily: 'Satoshi, sans-serif' },
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } },
    dataLabels: { enabled: false },
    stroke: { show: true, width: 2, colors: ['transparent'] },
    xaxis: { categories },
    yaxis: { title: { text: 'Doanh thu (VNĐ)' } },
    fill: { opacity: 1 },
    tooltip: { y: { formatter: (val) => `${val.toLocaleString()} VNĐ` } },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <h2 className="text-lg font-semibold">Thống kê doanh thu</h2>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            {['year', 'week', 'month'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as 'year' | 'week' | 'month')}
                className={`rounded py-1 px-3 text-xs font-medium ${filter === type ? 'bg-blue-600 text-white shadow-md' : 'text-black hover:bg-gray-200'
                  }`}
              >
                {type === 'year' ? 'Year' : type === 'week' ? 'Week' : 'Month'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {loading ? (
          <p className="text-center py-5 font-semibold">Đang tải dữ liệu...</p>
        ) : (
          <div id="chartOne" className="w-full">
            <ReactApexChart options={options} series={series} type="bar" width="100%" height={350} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartOne;