import Authlayout from "./_auth/AuthLayout";
import SignIn from "./_auth/forms/SignIn";
import SignUp from "./_auth/forms/SignUp";
import RootLayout from "./_root/RootLayout";
import {
  Chats,
  CreatePost,
  EditPost,
  EditProfile,
  Explore,
  Home,
  LikedPosts,
  People,
  PostDetails,
  Profile,
  Save,
} from "./_root/pages";
import { Toaster } from "./components/ui/toaster";
import "./globals.css";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<Authlayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/all-users" element={<People />} />
          <Route path="/saved" element={<Save />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/liked-posts" element={<LikedPosts likedPosts={[]} />} />
          <Route path="/edit-profile/:id" element={<EditProfile />} />
          <Route path="/chats" element={<Chats />} />
        </Route>
      </Routes>
      <Toaster />
    </main>
  );
};

export default App;
