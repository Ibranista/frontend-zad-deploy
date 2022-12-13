import React from "react";
import { Link } from "react-router-dom";
import LineChart from "../../charts/LineChart01";
import Icon from "../../images/icon-01.svg";
import EditMenu from "../EditMenu";
// Import utilities
import { tailwindConfig, hexToRGB } from "../../utils/Utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchSoldItems } from "../../features/pos/posSlice";
import { useEffect } from "react";
import calculationSlice from "../../features/calculations/calculationSlice";

function DashboardCard01(prices) {

  const dispatch = useDispatch();
  // destructure soldItems from useSelecter state.pos
  const { soldItems } = useSelector((state) => state.pos);
  useEffect(() => {
    dispatch(fetchSoldItems());
  }, [dispatch]);
  let labels1 = soldItems.map((item) => item.createdAt.slice(0, 10));
  // write lables1 as in mm-dd-yyyy add 0 infront of single digit numbers
  let labels2 = labels1.map((item) => {
    let date = new Date(item);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    return `${month}-${day}-${year}`;
  });
  // map through soldItems and return itemsSold and join the numbers with comma
  let itemsSold = soldItems.map((item) => item.itemsSold).join(",");
  const chartData = {
    labels: labels2?labels2:['12-01-2020', '01-01-2021', '02-01-2021',
    '03-01-2021', '04-01-2021', '05-01-2021',
    '06-01-2021', '07-01-2021', '08-01-2021',
    '09-01-2021', '10-01-2021', '11-01-2021',
    '12-01-2021', '01-01-2022', '02-01-2022',
    '03-01-2022', '04-01-2022', '05-01-2022',
    '06-01-2022', '07-01-2022', '08-01-2022',
    '09-01-2022', '10-01-2022', '11-01-2022',
    '12-01-2022', '01-01-2023'],

    datasets: [
      // Indigo line
      {
        data: [itemsSold==0?itemsSold:532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234,],
        fill: true,
        backgroundColor: `rgba(${hexToRGB(
          tailwindConfig().theme.colors.blue[500]
        )}, 0.08)`,
        borderColor: tailwindConfig().theme.colors.indigo[500],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
        clip: 20,
      },
      // Gray line
      {
        data: [
          532, 532, 532, 404, 404, 314, 314, 314, 314, 314, 234, 314, 234, 234,
          314, 314, 314, 388, 314, 202, 202, 202, 202, 314, 720, 642,
        ],
        borderColor: tailwindConfig().theme.colors.slate[300],
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.slate[300],
        clip: 20,
      },
    ],
  };
  // calculate sum of data inside datasets array
  const sum = chartData.datasets.reduce((acc, curr) => {
    return (
      acc +
      curr.data.reduce((acc, curr) => {
        return acc + curr;
      }, 0)
    );
  }, 0);
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white shadow-lg rounded-sm border border-slate-200">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu className="relative inline-flex">
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 1
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-slate-600 hover:text-slate-800 flex py-1 px-3"
                to="#0"
              >
                Option 2
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3"
                to="#0"
              >
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-lg font-semibold mb-2 text-orange-600">ZAD Bakery</h2>
        <div className="text-xs font-semibold text-slate-400 uppercase mb-1">
          Sales
        </div>
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2">$24,780</div>
          <div className="text-sm font-semibold text-white px-1.5 bg-green-500 rounded-full">
            +49%
          </div>
        </div>
      </div>
      {/* Chart built with Chart.js 3 */}
      <div className="grow">
        {/* Change the height attribute to adjust the chart height */}
        <LineChart data={chartData} width={389} height={128} />
      </div>
    </div>
  );
}

export default DashboardCard01;
