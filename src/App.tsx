import { useState } from "react";
import "./App.css";
import ResponsiveIframe from "./components/iframe";
import ParticleBackground from "./components/particle-bg";
import { Input } from "./components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  const [url, setUrl] = useState<string | null>(null);
  return (
    <div className="w-screen h-screen relative">
      <Tabs
        defaultValue="phone"
        className="relative flex z-50 bg-transparent items-center p-4 min-h-screen"
      >
        <ParticleBackground />
        <Input
          onChange={(e) => setUrl(e.currentTarget.value)}
          type="text"
          placeholder="Url"
          className="absolute left-5 top-5 min-w-fit w-50"
        />
        <TabsList>
          <TabsTrigger value="phone">Phone</TabsTrigger>
          <TabsTrigger value="tablet">Tablet</TabsTrigger>
        </TabsList>
        <TabsContent value="phone">
          {url && <ResponsiveIframe height={844} width={390} url={url} />}
        </TabsContent>
        <TabsContent value="tablet">
          {url && <ResponsiveIframe height={820} width={1180} url={url} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default App;
