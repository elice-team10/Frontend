import { useLocation, useNavigate, useParams } from 'react-router';
import CommunityWrite from './CommunityWrite';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvents, updateEvent, queryClient } from '../../api/http';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorBlock from '../UI/ErrorBlock';

function CommunityEdit() {
  const navigate = useNavigate();
  const params = useParams();
  const urlLocation = useLocation();
  const userId = urlLocation.state.userId;

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', 'edit', params.id],
    queryFn: () => fetchEvents(`/post/detail/${params.id}`),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
    // 수정된 UI 즉시 변경
    onMutate: async (data) => {
      const newEvent = data.eventData;

      await queryClient.cancelQueries({ queryKey: ['events', 'edit', 'update', userId, params.id] });
      const prevEvent = queryClient.getQueryData(['events', 'edit', 'update', userId, params.id]);

      queryClient.setQueryData(['events', userId, params.id], newEvent);

      return { prevEvent };
    },
    onError: (error, data, context) => {
      queryClient.setQueryData(['events', 'edit', 'update', userId, params.id], context.prevEvent);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['events', 'edit', 'update', userId, params.id]);
    },
  });

  const handleEditSubmit = (editData) => {
    // const userId = urlLocation.state.userId;
    console.log('editsubmit', userId.nickname);
    mutate({ postId: params.id, userId, eventData: editData });
    navigate('/community');
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
