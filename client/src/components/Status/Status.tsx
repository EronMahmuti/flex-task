import { Button, Flex } from 'antd';
import { useAppSelector } from '../../lib/hooks/useReduxHooks';
import { selectAllJobsites } from '../../redux/slices/jobSlice';

export default function Status() {
  const jobsites = useAppSelector(selectAllJobsites);

  const statusCounts = jobsites.reduce(
    (acc, job) => {
      switch (job.status) {
        case 'on road':
          acc.onRoad += 1;
          break;
        case 'completed':
          acc.completed += 1;
          break;
        case 'on hold':
          acc.onHold += 1;
          break;
      }
      return acc;
    },
    { onRoad: 0, completed: 0, onHold: 0 }
  );

  return (
    <Flex
      className="status-container"
      gap={8}
      wrap={false}
      justify="space-between"
    >
      <Button type="primary" className="status-button status-on-road">
        {statusCounts.onRoad} On Road
      </Button>
      <Button
        type="primary"
        className="status-button status-completed"
      >
        {statusCounts.completed} Completed
      </Button>
      <Button type="primary" className="status-button status-on-hold">
        {statusCounts.onHold} On Hold
      </Button>
    </Flex>
  );
}
