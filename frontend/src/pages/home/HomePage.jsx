import HomeScreen from "./HomeScreen";
import { useAuthUserStore } from "../../store/authUser.js";
import AuthScreen from "./AuthScreen";

function HomePage() {
  const { user } = useAuthUserStore();
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
}

export default HomePage;
