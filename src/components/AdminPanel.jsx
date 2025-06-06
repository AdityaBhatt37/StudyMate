import AdminRoadmap from "./AdminRoadmap";
import AdminVideosAndCourses from "./AdminVideosAndCourses";
import QuizAdmin from "./QuizAdmin";

function AdminPanel() {
  return (
    <div className="admin-panel mt-25 ">
      <AdminVideosAndCourses />

      <div className="flex mt-10 items-center">
        <AdminRoadmap />
        <QuizAdmin />
      </div>
    </div>
  );
}

export default AdminPanel;
