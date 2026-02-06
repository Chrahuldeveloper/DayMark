import Choose from '@/screens/Choose';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '@/screens/Profile';
import Wallpaper from '@/screens/Wallpaper';


export default function App() {
  return (
    <SafeAreaView>
      {/* <Choose/> */}
      {/* <Profile/> */}
      <Wallpaper/>
    </SafeAreaView>
  );
}
