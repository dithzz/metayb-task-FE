// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../redux/actions/jobActions';
import { getAllEmployers } from '../redux/actions/authActions';
import DatePicker from 'react-datepicker'; // Import React Datepicker
import 'react-datepicker/dist/react-datepicker.css'; // Import Datepicker styles

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const token = useSelector((state) => state?.auth?.user?.tokens.access.token);
  const jobsData = useSelector((state) => state?.jobs?.jobsData);
  const employersData = useSelector((state) => state?.auth?.employersData);

  const handleStartDateChange = (date) => {
    setStartDate(date); 
  };

  const handleEndDateChange = (date) => {
    setEndDate(date); 
  };

  useEffect(() => {
    dispatch(getAllJobs(token));
    dispatch(getAllEmployers(token));
  }, [dispatch, token]);

  const filterDataByDateRange = (data) => {
    if (!startDate || !endDate) return data;
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt).getTime();
      return itemDate >= start && itemDate <= end;
    });
  };

  const filteredJobs = filterDataByDateRange(jobsData?.results || []);
  const filteredEmployers = filterDataByDateRange(employersData?.results.filter((d)=> d.role === 'user') || []);

  const pieData = {
    labels: filteredJobs.map((d) => d?.jobName),
    datasets: [
      {
        label: 'ETA (in Hours)',
        data: filteredJobs.map((d) => d?.eta),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: filteredEmployers.map((d) => `${d?.firstName} ${d?.lastName}`),
    datasets: [
      {
        label: 'Production Hours:',
        data: filteredEmployers.map((d) => parseInt(d?.timeSpent, 10) / 3600),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="container mt-4">
      <h2>Charts Page</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Time Taken to Complete Painting Jobs</h3>
          <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              placeholderText="Select start date"
              className="form-control"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              placeholderText="Select end date"
              className="form-control"
            />
          <Pie data={pieData} />
        </div>
        <div className="col-md-6">
          <h3>Employee production</h3>
          <Bar data={barData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
