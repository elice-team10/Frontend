import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import theme from '../../config/theme';

/**
 * icon 종류
 * success, error, warning, info, question
 *  */
const ToastAlert = ({ icon, title }) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  useEffect(() => {
    Toast.fire({
      icon: icon,
      title: title,
      iconColor: theme.colors.primary,
      color: theme.colors.text,
    });
  }, []);

  return (
    <>
      {/* 여기에는 토스트 알림이 표시될 때의 추가적인 컴포넌트 내용이 올 수 있습니다. */}
    </>
  );
};

export default ToastAlert;
