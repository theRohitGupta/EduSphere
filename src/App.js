import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Error from "./pages/Error";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Settings from "./components/core/Dashboard/Settings";
import EnrolledCourses from "./components/core/Dashboard/StudentPages/EnrolledCourses";
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/InstructorPages/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/InstructorPages/EditCourse";
import Catalog from "./pages/Catalog";
import CoursePage from "./pages/CoursePage";
import Cart from "./pages/Cart";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/Dashboard/StudentPages/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorPages/InstructorDashboard";

function App() {
  const user = useSelector((state) => state.profile)
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
          <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
          <Route path="/forgot-password" element={<OpenRoute><ForgotPassword/></OpenRoute>}/>
          <Route path="/update-password/:id" element={<UpdatePassword/>}/>
          <Route path="/verify-email" element={<OpenRoute><VerifyEmail/></OpenRoute>}/>
          <Route path="/contact" element={<ContactUs/>}/>
          <Route path="/catalog/:catalogName" element={<Catalog/>}/>
          <Route path="/courses/:courseId" element={<CoursePage/>}/>
          <Route path="*" element={<Error/>}/>
          <Route element={<PrivateRoute><Dashboard/></PrivateRoute>}>
            <Route path="/dashboard/my-profile" element={<MyProfile/>}/>
            <Route path="/dashboard/settings" element={<Settings/>}/>
            {
              user?.user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <>
                  <Route path="/dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
                  <Route path="/dashboard/cart" element={<Cart/>}/>
                </>
                )
            }
            {
              user?.user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                <>
                  <Route path="/dashboard/add-course" element={<AddCourse/>}/>
                  <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
                  <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                  <Route path="/dashboard/instructor" element={<InstructorDashboard/>}/>
                </>
                )
            }
          </Route>
          <Route element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
            <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
