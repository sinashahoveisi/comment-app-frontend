import {Route, Routes, Navigate} from 'react-router-dom';
import Main from '@/pages/Main';
import Comments from '@/pages/Comments';
import AddComment from '@/pages/AddComment';

const MyRoutes = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        <Route path="/comments/:id" element={<AddComment />} />
        <Route path="/comments" element={<Comments />} />
        <Route path="*" element={<Navigate to="/comments" replace />} />
      </Route>
    </Routes>
  );
};

export default MyRoutes;
