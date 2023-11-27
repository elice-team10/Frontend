import { useState, useRef } from 'react';
import styled from 'styled-components';
import theme from '../../config/theme';
import AdminUser from './AdminUser';
import AdminFoundBoard from './AdminFoundBoard';
import AdminFoundComment from './AdminFoundComment';
import AdminLostBoard from './AdminLostBoard';
import AdminLostComment from './AdminLostComment';
import { axiosPrivate } from '../../api/axios';
import ModalBasic from '../UI/Modal';
import ToastAlert from '../UI/ToastAlert';

const AdminNavContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 1200px;
  @media (max-width: 1200px) {
    width: 768px;
  }
  height: 30px;
`;

const AdminMenuBox = styled.div`
  display: flex;
`;

const AdminMenu = styled.div`
  width: 150px;
  text-align: center;
  font-size: ${theme.fontSizes.subtitle};
  @media (max-width: 1200px) {
    font-size: ${theme.fontSizes.large};
  }
  color: ${(props) =>
    props.$active ? theme.colors.text : theme.colors.textLightgray};
  letter-spacing: 3px;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  cursor: pointer;
`;

const Button = styled.button`
  padding: 12px 16px;
  margin-right: 40px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.textWhite};
  border: none;
  border-radius: 12px;
  font-size: ${theme.fontSizes.medium};
  @media (max-width: 1200px) {
    font-size: ${theme.fontSizes.small};
  }
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    filter: brightness(1.15);
  }
`;

const AdminSubNavContainer = styled.div`
  display: flex;
  width: 1200px;
  height: 40px;
  gap: 1.5rem;
`;

const AdminSubNavBox = styled.div`
  display: ${(props) => (props.$show ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$width};
  height: 40px;
  gap: 1.5rem;
  @media (max-width: 1200px) {
    width: ${(props) =>
      props.$activeMenu === '찾아요'
        ? '880px'
        : props.$activeMenu === '주웠어요'
          ? '1170px'
          : '0px'};
`;

const AdminSubMenu = styled.div`
  width: 76px;
  @media (max-width: 1200px) {
    width: 60px;
  }
  height: 20px;
  @media (max-width: 1200px) {
    height: 18px;
  }
  text-align: center;
  font-size: ${theme.fontSizes.small};
  letter-spacing: 4px;
  color: ${(props) =>
    props.$active ? theme.colors.text : theme.colors.textLightgray};
  border: ${(props) => (props.$active ? '1.5px' : '0.5px')} solid
    ${(props) =>
      props.$active ? theme.colors.text : theme.colors.textLightgray};
  border-radius: 8px;
  font-weight: ${(props) => (props.$active ? 'bold' : 'normal')};
  cursor: pointer;
`;

const AdminFormContainer = styled.div`
  height: 631px;
  width: 1200px;
  background-color: #eee;
  @media (max-width: 1200px) {
    width: 768px;
  }
  border-radius: 4px;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);
  margin-bottom: 100px;
`;

const AdminTemplate = () => {
  const [activeMenu, setActiveMenu] = useState('회원정보');
  const [activeSubMenu, setActiveSubMenu] = useState('게시물');
  const [selectedIds, setSelectedIds] = useState([]);
  const adminUserRef = useRef();
  const adminLostPostRef = useRef();
  const adminFoundPostRef = useRef();
  const adminLostCommentRef = useRef();
  const adminFoundCommentRef = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showInfoToast, setShowInfoToast] = useState(false);

  const handleSelection = (ids) => {
    setSelectedIds(ids);
  };

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      onShowModal();
    } else {
      setShowInfoToast(true);
      setTimeout(() => setShowInfoToast(false),   0);
    }
  };

  const onShowModal = () => {
    setModalOpen(true);
  };

  const onCloseModal = () => {
    setModalOpen(false); // 모달 닫기
  };

  const getFunction = () => {
    if (activeMenu === '회원정보') {
      return deleteUser();
    }
    if (activeMenu === '찾아요') {
      return activeSubMenu === '게시물' ? deletePost() : deleteComment();
    }
    if (activeMenu === '주웠어요') {
      return activeSubMenu === '게시물' ? deletePost() : deleteComment();
    }
  };

  const deleteUser = async () => {
    try {
      await Promise.all(
        selectedIds.map((ids) => axiosPrivate().delete(`/user/${ids}`)),
      );
      adminUserRef.current.getUser();
      setShowSuccessToast(true);
    } catch (error) {
      console.error('Error deleting users: ', error);
    }
  };

  const deletePost = async () => {
    try {
      await Promise.all(
        selectedIds.map((ids) => axiosPrivate().delete(`/post/${ids}`)),
      );
      if (activeMenu === '찾아요' && activeSubMenu === '게시물') {
        adminLostPostRef.current.fetchData();
        setShowSuccessToast(true);
      }
      if (activeMenu === '주웠어요' && activeSubMenu === '게시물') {
        adminFoundPostRef.current.fetchData();
        setShowSuccessToast(true);
      }
    } catch (error) {
      console.error('Error deleting posts: ', error);
    }
  };

  const deleteComment = async () => {
    try {
      await Promise.all(
        selectedIds.map((ids) => axiosPrivate().delete(`/Comment/${ids}`)),
      );
      if (activeMenu === '찾아요' && activeSubMenu === '댓글') {
        adminLostCommentRef.current.fetchData();
        setShowSuccessToast(true);
      }
      if (activeMenu === '주웠어요' && activeSubMenu === '댓글') {
        adminFoundCommentRef.current.fetchData();
        setShowSuccessToast(true);
      }
    } catch (error) {
      console.error('Error deleting posts: ', error);
    }
  };

  let table;

  if (activeMenu === '회원정보') {
    table = (
      <AdminUser onSelectionChange={handleSelection} ref={adminUserRef} />
    );
  }
  if (activeMenu === '찾아요' && activeSubMenu === '게시물') {
    table = (
      <AdminLostBoard
        onSelectionChange={handleSelection}
        ref={adminLostPostRef}
      />
    );
  }
  if (activeMenu === '찾아요' && activeSubMenu === '댓글') {
    table = (
      <AdminLostComment
        AdminLostBoard
        onSelectionChange={handleSelection}
        ref={adminLostCommentRef}
      />
    );
  }
  if (activeMenu === '주웠어요' && activeSubMenu === '게시물') {
    table = (
      <AdminFoundBoard
        AdminLostBoard
        onSelectionChange={handleSelection}
        ref={adminFoundPostRef}
      />
    );
  }
  if (activeMenu === '주웠어요' && activeSubMenu === '댓글') {
    table = (
      <AdminFoundComment
        AdminLostBoard
        onSelectionChange={handleSelection}
        ref={adminFoundCommentRef}
      />
    );
  }

  return (
    <>
      {modalOpen && (
        <ModalBasic
          title={
            activeMenu === '회원정보'
              ? '관리자 권한으로 탈퇴'
              : '관리자 권한으로 삭제'
          }
          content={
            activeMenu === '회원정보'
              ? '정말 탈퇴시키겠습니까?'
              : '정말 삭제하시겠습니까?'
          }
          btnText={activeMenu === '회원정보' ? '선택한 회원 탈퇴' : '삭제'}
          onCloseModal={onCloseModal}
          getFunction={getFunction}
        />
      )}
      {showSuccessToast && (
        <ToastAlert icon="success" title="삭제 완료 되었습니다!" />
      )}
      {showInfoToast && (
        <ToastAlert icon="info" title="삭제할 항목을 선택해주세요." />
      )}
      <AdminNavContainer>
        <AdminMenuBox>
          <AdminMenu
            $active={activeMenu === '회원정보'}
            onClick={() => {
              setActiveMenu('회원정보');
              setActiveSubMenu('게시물');
            }}
          >
            회원정보
          </AdminMenu>
          <AdminMenu
            $active={activeMenu === '찾아요'}
            onClick={() => {
              setActiveMenu('찾아요');
              setActiveSubMenu('게시물');
            }}
          >
            찾아요
          </AdminMenu>
          <AdminMenu
            $active={activeMenu === '주웠어요'}
            onClick={() => {
              setActiveMenu('주웠어요');
              setActiveSubMenu('게시물');
            }}
          >
            주웠어요
          </AdminMenu>
        </AdminMenuBox>
        <Button onClick={handleDelete}>
          {activeMenu === '회원정보'
            ? '관리자 권한으로 탈퇴'
            : '관리자 권한으로 삭제'}
        </Button>
      </AdminNavContainer>
      <AdminSubNavContainer>
        <AdminSubNavBox
          $show={activeMenu === '찾아요' || activeMenu === '주웠어요'}
          $activeMenu={activeMenu}
          $width={
            activeMenu === '찾아요'
              ? '450px'
              : activeMenu === '주웠어요'
                ? '750px'
                : '0px'
          }
        >
          <AdminSubMenu
            $active={activeSubMenu === '게시물'}
            onClick={() => setActiveSubMenu('게시물')}
          >
            게시물
          </AdminSubMenu>
          <AdminSubMenu
            $active={activeSubMenu === '댓글'}
            onClick={() => setActiveSubMenu('댓글')}
          >
            댓글
          </AdminSubMenu>
        </AdminSubNavBox>
      </AdminSubNavContainer>
      <AdminFormContainer>{table}</AdminFormContainer>
    </>
  );
};

export default AdminTemplate;
