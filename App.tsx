import Choose from '@/screens/Choose';
import './global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import Profile from '@/screens/Profile';


export default function App() {
  return (
    <SafeAreaView>
      {/* <Choose/> */}
      <Profile/>
    </SafeAreaView>
  );
}
