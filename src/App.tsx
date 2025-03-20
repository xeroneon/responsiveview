import "./App.css";
import ResponsiveIframe from "./components/iframe";
import ParticleBackground from "./components/particle-bg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <div className="w-screen h-screen relative">
      <Tabs
        defaultValue="phone"
        className="relative flex z-50 bg-transparent items-center p-4 min-h-screen"
      >
        <ParticleBackground />
        <TabsList>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="tablet">Tablet</TabsTrigger>
        </TabsList>
        <TabsContent value="phone">
          <ResponsiveIframe
            height={844}
            width={390}
            url="http://localhost:5174"
          />
        </TabsContent>
        <TabsContent value="tablet">
          <ResponsiveIframe
            height={820}
            width={1180}
            url="http://localhost:5174"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
