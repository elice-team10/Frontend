import { useNavigate, useParams } from 'react-router';
import CommunityWrite from './CommunityWrite';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvents, updateEvent, queryClient } from '../../api/http';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorBlock from '../UI/ErrorBlock';

function CommunityEdit() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: () => fetchEvents(`/post/detail/${params.id}`),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // 수정된 UI 즉시 변경
    onMutate: async (data) => {
      const newEvent = data.eventData;

      await queryClient.cancelQueries({ queryKey: ['events', params.id] });
      const prevEvent = queryClient.getQueryData(['events', params.id]);
      
      queryClient.setQueryData(['events', params.id], newEvent);

      return { prevEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', params.id], context.prevEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', params.id]);
    }
  });

  const handleEditSubmit = (editData) => {
    mutate({ postId: params.id, eventData: editData });
    navigate(-2);
  };

  let content;

  if (isPending) {
    content = <CircularProgress sx={{ color: '#ff6700' }} />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="에러 발생"
        message={error.info?.message || '데이터를 가져오는데 실패했습니다.'}
      />
    );
  }

  if (data) {
    content = (
      <CommunityWrite inputData={data} onEditSubmit={handleEditSubmit} />
    );
  }

  return <>{content}</>;
}

export default CommunityEdit;
