import "./App.css";
import { SideMenu } from "./components/sideMenu/SideMenu";
import { Canvas } from "./components/canvas/Canvas";
import { Header } from "./components/header/Header";
import { SettingsModal } from "./components/settingsModal/SettingsModal";

function App() {
  return (
    <>
      <Header></Header>
      <main>
        {/* aside menu */}
        <SideMenu></SideMenu>
        {/* canvas */}
        <Canvas></Canvas>
        {/* settings modal */}
        <SettingsModal></SettingsModal>
      </main>
    </>
  );
}

export default App;
