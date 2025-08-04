import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthUserStore } from "./store/authUser";
import { Loader } from "lucide-react";
import WatchPage from "./pages/WatchPage";
import SearchPage from "./pages/SearchPage";
import HistoryPage from "./pages/HistoryPage";
import NotFountPage from "./pages/NotFountPage";

function App() {
  const { user, isAuthChecking, authCheck } = useAuthUserStore();
  console.log(user, "xcvbnm");
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isAuthChecking) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center h-full bg-black">
          <Loader className="animate-spin size-10 text-red-600" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/login"} />}
        />

        <Route
          path="/search"
          element={user ? <SearchPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/history"
          element={user ? <HistoryPage /> : <Navigate to={"/login"} />}
        />

        <Route path="/*" element={<NotFountPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
