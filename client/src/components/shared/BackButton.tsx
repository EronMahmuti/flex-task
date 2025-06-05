import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function BackButton() {
  const navigate = useNavigate();

  return (
    <Button
      type="primary"
      onClick={() => navigate(-1)}
      className="back-button"
      icon={
        <span className="back-button-icon">
          <LeftOutlined />
        </span>
      }
      iconPosition="end"
    >
      Go Back
    </Button>
  );
}

export default BackButton;
