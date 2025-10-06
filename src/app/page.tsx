import { World } from "../components/ui/globe";
import { sampleData } from "../data/sample-data";

export default function Home() {
  const globeConfig = {
    pointSize: 4,
    globeColor: "#062056",
    showAtmosphere: true,
    atmosphereColor: "#FFFFFF",
    atmosphereAltitude: 0.1,
    emissive: "#062056",
    emissiveIntensity: 0.1,
    shininess: 0.9,
    polygonColor: "rgba(255,255,255,0.7)",
    ambientLight: "#38bdf8",
    directionalLeftLight: "#ffffff",
    directionalTopLight: "#ffffff",
    pointLight: "#ffffff",
    arcTime: 1000,
    arcLength: 0.9,
    rings: 1,
    maxRings: 3,
    initialPosition: { lat: 0, lng: 0 },
    autoRotate: true,
    autoRotateSpeed: 0.5,
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="font-bold text-4xl">Welcome to Website Antoine Battle</h1>
        <div className="w-full h-[600px]">
          <World globeConfig={globeConfig} data={sampleData} />
        </div>
      </main>
      <footer className="row-start-3 text-sm text-gray-500">
        &copy; 2025 Antoine Battle. All rights reserved.
      </footer>
    </div>
  );
}
