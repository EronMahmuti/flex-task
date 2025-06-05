import { Flex } from 'antd';
import JobTable from './JobTable';
import JobTableHeader from './JobTableHeader';
import { useJobSearch } from '../../lib/hooks/useJobSearch';

function JobListing() {
  const { data, searchText, setSearchText, totalJobs } =
    useJobSearch();

  return (
    <Flex
      className="job-listing-container"
      wrap={false}
      justify="space-between"
      vertical
    >
      <JobTableHeader
        searchText={searchText}
        onSearchChange={setSearchText}
        totalJobs={totalJobs}
      />
      <JobTable data={data} />
    </Flex>
  );
}

export default JobListing;
