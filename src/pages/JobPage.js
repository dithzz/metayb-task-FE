import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllJobs } from '../redux/actions/jobActions';
import JobCard from '../components/JobCard';

const JobPage = () => {
    const dispatch = useDispatch()
    const [selectedCard, setSelectedCard] = useState(null);
    const token = useSelector((state) => state?.auth?.user?.tokens.access.token);
    const jobsData = useSelector((state) => state?.jobs?.jobsData);

    useEffect(() => {
      dispatch(getAllJobs(token));
    }, []);




    const handleCardClick = (id) => {
        setSelectedCard(id);
      };

  return (
    <div className="container mt-4">
     <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Choose Painting Jobs</h2>
      </div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {jobsData?.results?.map((painting) => (
          <div onClick={()=> handleCardClick(painting.id)} key={painting.id} className="col">
            <JobCard selectedCard={selectedCard} painting={painting} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPage;
